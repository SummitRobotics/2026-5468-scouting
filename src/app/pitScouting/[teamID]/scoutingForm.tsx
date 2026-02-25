'use client';
import { useActionState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from 'next/navigation';

import { BoolOptions, MultiOptions } from "../../components/formElements";
import { TeamPitData } from "../../utils/interfaces";
import { db } from "../../components/firebase";
import { coerceDataTypes } from "../../utils/dataUtils";

type PitDataState = {
  data?: TeamPitData;
};

async function postTeamData(teamID: number | string, _prevState: PitDataState, formData: FormData): Promise<PitDataState> {
  const submissionData = coerceDataTypes(Object.fromEntries(formData.entries()));
  const newState = await setDoc(doc(db, "teams", teamID.toString()), submissionData, { merge: true })
  .then((response) => {
    return {
      data: {
        teamID,
        ...submissionData
      } as TeamPitData,
      success: `Form submitted successfully: ${response}`
    };
  })
  .catch(error => {
      return {
        data: {
          teamID,
          ...submissionData
        } as TeamPitData,
        error: `Error submitting form: ${error}`
      };
  });

  redirect('/pitScouting');

  return newState;

}

export default function PitScoutingForm({pitData}: {pitData: TeamPitData }) {
  const postTeamDataByID = postTeamData.bind(null, pitData.teamID);
  const [state, postTeamDataAction, isPending] = useActionState<PitDataState, FormData>(postTeamDataByID, {
    data: pitData as TeamPitData
  });

  if(!state || !state.data) {
    return <h2 className="text-center text-2xl pb-4">Loading pit scouting form...</h2>;
  }

  return (
      <form action={postTeamDataAction} className="p-4 grid grid-row place-content-center max-w-2xl mx-auto">
        {/* Robot Dimensions */}
        <div className="my-4 border rounded-2xl border-gray-600 p-4 bg-gray-900">
          <h2 className="text-center text-2xl pb-4">Robot Dimensions</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Width (inches)</label>
              <input type="number" defaultValue={state.data?.width || undefined} name="width" className="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Length (inches)</label>
              <input type="number" defaultValue={state.data?.length || undefined} name="length" className="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (inches)</label>
              <input type="number" defaultValue={state.data?.height || undefined} name="height" className="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Weight (lbs)</label>
              <input type="number" defaultValue={state.data?.weight || undefined} name="weight" className="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
            </div>
          </div>
          <MultiOptions title="Drive Type" name="drive_type" options={[
            {value: "tank", selected: (!!state.data && state.data?.drive_type == "tank"), label: "Tank Drive"},
            {value: "swerve", selected: (!!state.data && state.data?.drive_type == "swerve"), label: "Swerve"},
          ]} />
        </div>

        {/* Intake System */}
        <div className="my-4 border rounded-2xl border-blue-600 p-4 bg-blue-950">
          <h2 className="text-center text-2xl pb-4">Intake System</h2>

          <MultiOptions title="Intake Type" name="intake_type" options={[
            {value: "over bumper", selected: (!!state.data && state.data?.intake_type == "over bumper"), label: "Over Bumper"},
            {value: "through bumper", selected: (!!state.data && state.data?.intake_type == "through bumper"), label: "Through Bumper"},
          ]} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Hopper Capacity</label>
              <input type="number" defaultValue={state.data?.hopper_capacity || undefined} name="hopper_capacity" className="px-3 py-2 bg-gray-800 border border-gray-600 rounded" />
          </div>
        </div>

        {/* Shooter System */}
        <div className="my-4 border rounded-2xl border-green-600 p-4 bg-green-950">
          <h2 className="text-center text-2xl pb-4">Shooting System</h2>

          <MultiOptions title="Shooter Type" name="shooter_type" options={[
            {value: "fixed", selected: (!!state.data && state.data?.shooter_type == "fixed"), label: "Fixed Shooter"},
            {value: "turret", selected: (!!state.data && state.data?.shooter_type == "turret"), label: "Turret"},
          ]} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Number of Shooters</label>
            <input type="number" name="shooter_count" defaultValue={state.data?.shooter_count || undefined} className="px-3 py-2 bg-green-900 border border-green-600 rounded" />
          </div>

          <BoolOptions title="Auto Aim Capable" name="auto_aim" defaultValue={state.data?.auto_aim || false} />

          <BoolOptions title="Can Move While Shooting" name="move_shoot" defaultValue={state.data?.move_shoot || false} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Auto Score Count</label>
            <input type="number" name="auto_score_count" defaultValue={state.data?.auto_score_count || undefined} className="px-3 py-2 bg-green-900 border border-green-600 rounded" />
          </div>
        </div>

        {/* On-Field Capabilities */}
        <div className="my-4 border rounded-2xl border-yellow-600 p-4 bg-yellow-950">
          <h2 className="text-center text-2xl pb-4">On-Field Capabilities</h2>

          <BoolOptions title="Can Receive from Outpost" name="outpost_receive" defaultValue={state.data?.outpost_receive || false} />
          <BoolOptions title="Can Feed to Outpost" name="outpost_feed" defaultValue={state.data?.outpost_feed || false} />
          <BoolOptions title="Can Navigate Bump" name="nav_bump" defaultValue={state.data?.nav_bump || false} />
          <BoolOptions title="Can Navigate Trench" name="nav_trench" defaultValue={state.data?.nav_trench || false} />

        </div>



        {/* Climbing */}
        <div className="my-4 border rounded-2xl border-red-600 p-4 bg-red-950">
          <h2 className="text-center text-2xl pb-4">Climbing Capabilities</h2>

          <BoolOptions title="Can Climb in End Game" name="climb_endgame" defaultValue={state.data?.climb_endgame || false} />
          <BoolOptions title="Can Climb in Auto" name="climb_auto" defaultValue={state.data?.climb_auto || false} />
        </div>

        {/* Build Quality */}
        <div className="my-4 border rounded-2xl border-orange-600 p-4 bg-orange-950">
          <h2 className="text-center text-2xl pb-4">Build Quality</h2>

          <MultiOptions title="Overall Quality" name="quality" options={[
            {value: "excellent", selected: (!!state.data && state.data?.quality == "excellent"), label: "Excellent"},
            {value: "good", selected: (!!state.data && state.data?.quality == "good"), label: "Good"},
            {value: "average", selected: (!!state.data && state.data?.quality == "average"), label: "Average"},
            {value: "poor", selected: (!!state.data && state.data?.quality == "poor"), label: "Poor"}
          ]} vertical={true} />

          <MultiOptions title="Electrical Quality" name="electrical_quality" options={[
            {value: "excellent", selected: (!!state.data && state.data?.electrical_quality == "excellent"), label: "Excellent"},
            {value: "good", selected: (!!state.data && state.data?.electrical_quality == "good"), label: "Good"},
            {value: "average", selected: (!!state.data && state.data?.electrical_quality == "average"), label: "Average"},
            {value: "poor", selected: (!!state.data && state.data?.electrical_quality == "poor"), label: "Poor"}
          ]} vertical={true} />

          <BoolOptions title="Electrical Ports Taped" name="electrical_ports_taped" defaultValue={state.data?.electrical_ports_taped || false} />

          <BoolOptions title="Battery Protected" name="electrical_battery_protected" defaultValue={state.data?.electrical_battery_protected || false} />

          <BoolOptions title="Loose Wiring" name="eletrical_loose_wiring" defaultValue={state.data?.eletrical_loose_wiring || false} />
        </div>

        {/* Pit Condition & Notes */}
        <div className="my-4 border rounded-2xl border-cyan-600 p-4 bg-cyan-950">
          <h2 className="text-center text-2xl pb-4">Pit & Notes</h2>

          <MultiOptions title="Pit Condition" name="pit_condition" options={[
            {value: "clean", selected: (!!state.data && state.data?.pit_condition == "clean"), label: "Clean & Organized"},
            {value: "messy", selected: (!!state.data && state.data?.pit_condition == "messy"), label: "Messy"},
          ]} vertical={true} />

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea name="notes" className="h-40 px-3 py-2 bg-cyan-900 border border-cyan-600 rounded" defaultValue={state.data?.notes || ""} />
          </div>
        </div>

        <input type="hidden" name="teamName" value={pitData.teamName} />

        <button type="submit" disabled={isPending} className="mt-8 mb-8 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded font-semibold">
          {isPending ? 'Submitting...' : 'Submit Scout'}
        </button>
      </form>
  );
}
