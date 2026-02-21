'use client';
import { useState } from "react";
import { BoolOptions, MultiOptions } from "../../components/formElements";
import { TeamPitData } from "../../utils/interfaces";

interface FormValues {
  [key: string]: string | number | boolean | undefined;
}

export default function PitScoutingForm({pitData}: {pitData: TeamPitData }) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string | number | boolean): void => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Submit form data to API
      console.log('Form submitted:', formValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  return(
      <form onSubmit={handleSubmit} className="p-4 grid grid-row place-content-center max-w-2xl mx-auto">

        {/* Chassis Dimensions */}
        <div className="my-4 border rounded-2xl border-gray-600 p-4 bg-gray-900">
          <h2 className="text-center text-2xl pb-4">Chassis Dimensions</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Width (inches)</label>
              <input type="number" name="width" onChange={(e) => handleInputChange('width', Number(e.target.value))} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Length (inches)</label>
              <input type="number" name="length" onChange={(e) => handleInputChange('length', Number(e.target.value))} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (inches)</label>
              <input type="number" name="height" onChange={(e) => handleInputChange('height', Number(e.target.value))} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Weight (lbs)</label>
              <input type="number" name="weight" onChange={(e) => handleInputChange('weight', Number(e.target.value))} className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
          </div>
        </div>

        {/* Intake System */}
        <div className="my-4 border rounded-2xl border-blue-600 p-4 bg-blue-950">
          <h2 className="text-center text-2xl pb-4">Intake System</h2>

          <MultiOptions title="Intake Type" name="intake_type" options={[
            {value: "roller", label: "Roller"},
            {value: "vacuum", label: "Vacuum"},
            {value: "conveyor", label: "Conveyor"},
            {value: "other", label: "Other"}
          ]} vertical={true} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Hopper Capacity</label>
            <input type="number" name="hopper_capacity" onChange={(e) => handleInputChange('hopper_capacity', Number(e.target.value))} className="w-full px-3 py-2 bg-blue-900 border border-blue-600 rounded" />
          </div>
        </div>

        {/* Shooter System */}
        <div className="my-4 border rounded-2xl border-green-600 p-4 bg-green-950">
          <h2 className="text-center text-2xl pb-4">Shooter System</h2>

          <MultiOptions title="Shooter Type" name="shooter_type" options={[
            {value: "single", label: "Single Shooter"},
            {value: "double", label: "Double Shooter"},
            {value: "flywheel", label: "Flywheel"},
            {value: "other", label: "Other"}
          ]} vertical={true} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Number of Shooters</label>
            <input type="number" name="shooter_count" onChange={(e) => handleInputChange('shooter_count', Number(e.target.value))} className="w-full px-3 py-2 bg-green-900 border border-green-600 rounded" />
          </div>

          <BoolOptions title="Auto Aim Capable" name="auto_aim" YFunc={() => handleInputChange('auto_aim', true)} NFunc={() => handleInputChange('auto_aim', false)} />

          <BoolOptions title="Can Move While Shooting" name="move_shoot" YFunc={() => handleInputChange('move_shoot', true)} NFunc={() => handleInputChange('move_shoot', false)} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Auto Score Count</label>
            <input type="number" name="auto_score_count" onChange={(e) => handleInputChange('auto_score_count', Number(e.target.value))} className="w-full px-3 py-2 bg-green-900 border border-green-600 rounded" />
          </div>
        </div>

        {/* Feed System */}
        <div className="my-4 border rounded-2xl border-yellow-600 p-4 bg-yellow-950">
          <h2 className="text-center text-2xl pb-4">Feed System</h2>

          <BoolOptions title="Can Receive from Outpost" name="outpost_receive" YFunc={() => handleInputChange('outpost_receive', true)} NFunc={() => handleInputChange('outpost_receive', false)} />

          <BoolOptions title="Can Feed to Outpost" name="outpost_feed" YFunc={() => handleInputChange('outpost_feed', true)} NFunc={() => handleInputChange('outpost_feed', false)} />
        </div>

        {/* Drive System */}
        <div className="my-4 border rounded-2xl border-purple-600 p-4 bg-purple-950">
          <h2 className="text-center text-2xl pb-4">Drive System</h2>

          <MultiOptions title="Drive Type" name="drive_type" options={[
            {value: "tank", label: "Tank Drive"},
            {value: "mecanum", label: "Mecanum"},
            {value: "swerve", label: "Swerve"},
            {value: "other", label: "Other"}
          ]} vertical={true} />

          <BoolOptions title="Can Navigate Bump" name="nav_bump" YFunc={() => handleInputChange('nav_bump', true)} NFunc={() => handleInputChange('nav_bump', false)} />

          <MultiOptions title="Trench Navigation" name="nav_trench" options={[
            {value: "yes", label: "Yes"},
            {value: "no", label: "No"},
            {value: "unknown", label: "Unknown"}
          ]} vertical={true} />
        </div>

        {/* End Game */}
        <div className="my-4 border rounded-2xl border-red-600 p-4 bg-red-950">
          <h2 className="text-center text-2xl pb-4">End Game</h2>

          <BoolOptions title="Can Climb in End Game" name="climb_endgame" YFunc={() => handleInputChange('climb_endgame', true)} NFunc={() => handleInputChange('climb_endgame', false)} />

          <BoolOptions title="Can Climb in Auto" name="climb_auto" YFunc={() => handleInputChange('climb_auto', true)} NFunc={() => handleInputChange('climb_auto', false)} />
        </div>

        {/* Build Quality */}
        <div className="my-4 border rounded-2xl border-orange-600 p-4 bg-orange-950">
          <h2 className="text-center text-2xl pb-4">Build Quality</h2>

          <MultiOptions title="Overall Quality" name="quality" options={[
            {value: "excellent", label: "Excellent"},
            {value: "good", label: "Good"},
            {value: "average", label: "Average"},
            {value: "poor", label: "Poor"}
          ]} vertical={true} />

          <MultiOptions title="Electrical Quality" name="electrical_quality" options={[
            {value: "excellent", label: "Excellent"},
            {value: "good", label: "Good"},
            {value: "average", label: "Average"},
            {value: "poor", label: "Poor"}
          ]} vertical={true} />

          <BoolOptions title="Electrical Ports Taped" name="electrical_ports_taped" YFunc={() => handleInputChange('electrical_ports_taped', true)} NFunc={() => handleInputChange('electrical_ports_taped', false)} />

          <BoolOptions title="Battery Protected" name="electrical_battery_protected" YFunc={() => handleInputChange('electrical_battery_protected', true)} NFunc={() => handleInputChange('electrical_battery_protected', false)} />

          <BoolOptions title="Loose Wiring" name="eletrical_loose_wiring" YFunc={() => handleInputChange('eletrical_loose_wiring', true)} NFunc={() => handleInputChange('eletrical_loose_wiring', false)} />
        </div>

        {/* Pit Condition & Notes */}
        <div className="my-4 border rounded-2xl border-cyan-600 p-4 bg-cyan-950">
          <h2 className="text-center text-2xl pb-4">Pit & Notes</h2>

          <MultiOptions title="Pit Condition" name="pit_condition" options={[
            {value: "clean", label: "Clean & Organized"},
            {value: "messy", label: "Messy"},
          ]} vertical={true} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea name="notes" onChange={(e) => handleInputChange('notes', e.target.value)} className="w-full h-40 px-3 py-2 bg-cyan-900 border border-cyan-600 rounded" />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="mt-8 mb-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold">
          {isSubmitting ? 'Submitting...' : 'Submit Scout'}
        </button>
      </form>
  );
}
