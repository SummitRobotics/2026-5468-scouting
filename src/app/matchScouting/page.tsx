"use client";
import { use, useState } from "react";
import { doc, setDoc, increment } from "firebase/firestore";
import Image from "next/image";
import { ScoutingData, FormValues } from "../utils/interfaces";
import { COMP_ID } from "../components/constants";
import { FuelCounter, BoolOptions, MultiOptions } from "../components/formElements";
import { db } from "../components/firebase";
import Modal from "../components/modal";

const defaultSubmitData:ScoutingData = {
    eventID: COMP_ID,
    teamID: 0,
    scout_name: '',
    on_field: true,
    start_position: '',
    'auto-moved': false,
    'auto-fuel_depot': false,
    'auto-fuel_outpost': false,
    'auto-fuel_neutral': false,
    'auto-climb': false,
    'auto-climb_location': '',
    'auto-fuel_score': 0,
    'teleop-fuel_score': 0,
    'teleop-snowblow_neutral1': false,
    'teleop-snowblow_neutral2': false,
    'teleop-snowblow_alliance': false,
    'teleop-out_of_bounds': false,
    'teleop-move_shoot': false,
    'teleop-bump': false,
    'teleop-trench': false,
    'teleop-driver_skill': 0,
    'teleop-defense': false,
    'teleop-speed': 0,
    'endgame-fuel_score': 0,
    'endgame-climb_level': 0,
    'endgame-climb_location': '',
    'assessment-died': false,
    'assessment-tipped': false,
    'assessment-fuel_spill': false,
    'assessment-stuck_fuel': false,
    'assessment-stuck_bump': false,
    rank_points: 0,
    notes: '',
};

function nestByPrefix(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
        const dashIndex = key.indexOf("-");
        if (dashIndex !== -1) {
            const prefix = key.substring(0, dashIndex);
            const strippedKey = key.substring(dashIndex + 1);

            if (!result[prefix]) result[prefix] = {};
            result[prefix][strippedKey] = value;
        } else {
            result[key] = value;
        }
    }

    return result;
}

function coerceFormValues(formValues: FormValues): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(formValues).map(([key, value]) => {
      if (typeof value !== 'string') return [key, value];

      if (value === 'true') return [key, true];
      if (value === 'false') return [key, false];

      if (value.trim() !== '' && !isNaN(Number(value))) return [key, Number(value)];

      return [key, value];
    })
  );
}

function getRandomMessage() {
    const messages = [
        { text: "Please wait...", probability: 50.9999 },
        { text: "Submitting...", probability: 25 },
        { text: "\"HYDROGEN PEROXIDE!!!\" - quote Henry Carl Graff 10/31/25 at 3:28 PM", probability: 20 },
        { text: "Submitting?", probability: 4.5 },
        { text: "The cake is a lie...", probability: 0.5 },
        { text: "this message is a .0001% chance!", probability: 0.0001 },
    ];
    const totalProbability = messages.reduce((sum, msg) => sum + msg.probability, 0);
    const random = Math.random() * totalProbability;
    let cumulative = 0;
    for (const message of messages) {
        cumulative += message.probability;
        if (random <= cumulative) {
            return message.text;
        }
    }
    return messages[0].text;
}

const AlertModal = ({ isOpen, onCancel, onConfirm, postData }: { isOpen: boolean; onCancel: () => void; onConfirm: () => void; postData?: FormValues }) => {
    return (
        <Modal isOpen={isOpen} onCancel={onCancel} onConfirm={onConfirm}>
            <p className="text-center text-lg">
                Are you sure you want to submit?
            </p>
            {postData && postData.rank_points === 0 && (
                <p className="text-center text-lg text-red-500">Ranking points are set to zero.</p>
            )}
            <div className="flex pt-4 justify-center space-x-4">
                <button className="confirm-btn mt-4 shadow-[0_0px_3px_rgba(255,255,255,0.50)]" onClick={onConfirm}>
                    Yes, submit
                </button>
                <button className="cancel-btn mt-4 shadow-[0_0px_3px_rgba(255,255,255,0.50)]" onClick={onCancel}>
                    No, go back
                </button>
            </div>
        </Modal>
    );
};

export default function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = use(searchParams);
    const [onField, setOnField] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [postData, setPostData] = useState<FormValues>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitMessage, setSubmitMessage] = useState<string>('Submit');

    const team = Number(params.team);
    const match = params.match;
    const seat = params.seat;
    const fieldImg = (seat?.includes('blue')) ? '/images/field_top_blue_home.png' : '/images/field_top_red_home.png';
    const teamColor = (seat?.includes('blue')) ? 'text-blue-500' : 'text-red-500';


    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        if (isSubmitting) { return; }

        const dataObject = nestByPrefix(coerceFormValues({
            ...defaultSubmitData,
            ...Object.fromEntries(formData.entries()),
        }));

        setPostData(dataObject);
        setModalOpen(true);
    }

    async function postFormData() {
        setIsSubmitting(true);
        setSubmitMessage(getRandomMessage());

        const scoutName = params.name ? params.name.toString() : '';

        try {
            // Submit match data
            await setDoc(doc(db, "matches", `${COMP_ID}-${match}-${team}`), {
                ...postData,
                teamID: team,
                scout_name: scoutName,
            });

            // Increment leaderboard for this scout
            if (scoutName) {
                await setDoc(
                    doc(db, "leaderboard_submissions", scoutName),
                    {
                        name: scoutName,
                        submissionCount: increment(1),
                    },
                    { merge: true }
                );
            }

            window.location.assign('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className={`z-10 sticky top-0 flex justify-center bg-white dark:bg-black p-4 shadow-md space-x-4 ${teamColor}`}>
                <div className="font-bold">Match #{match}</div>
                <div className="font-bold">Team #{team}</div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 z-0" id="container">
                <h1 className="text-center text-3xl p-3">Match Scouting</h1>
                <BoolOptions title="Robot on Field" name="on_field" defaultValue={true} YFunc={() => setOnField(true)} NFunc={() => setOnField(false)} />

                <div className={`my-4 border rounded-2xl border-green-600 p-4 bg-green-950 auto ${onField ? '' : 'hidden'}`}>
                    <h2 id="aTitle" className="text-center text-2xl pb-4">Auto Phase</h2>
                    <MultiOptions title="Starting Position" name="start_position" options={[
                        {value: "left", label:"Left"},
                        {value: "middle", label:"Middle"},
                        {value: "right", label:"Right"}
                    ]} classes="onField" />
                    <BoolOptions title="Left starting position" name="auto-moved" classes="onField" YFunc={() => {
                        document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                            (element as HTMLElement).style.display = "table";
                        });
                    }} NFunc={() => {
                        document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                            (element as HTMLElement).style.display = "none";
                        });
                    }} />
                    <MultiOptions title="Picked up fuel from:" options={[
                        {value: "depot", name: "auto-fuel_depot", label:"Depot"},
                        {value: "outpost", name: "auto-fuel_outpost", label:"Outpost"},
                        {value: "neutral", name: "auto-fuel_neutral", label:"Neutral Zone"},
                        {value: "none", name: "auto-fuel_none", label:"Did not pick up fuel"}
                    ]} classes="onField" vertical={true} multiSelect={true} />
                    <FuelCounter name="auto-fuel_score" />
                    <BoolOptions title="Did robot climb?" name="auto-climb" classes="onField" />
                    <MultiOptions title="Climb Location" name="auto-climb_location" options={[
                        {value: "left", label:"Left"},
                        {value: "middle", label:"Middle"},
                        {value: "right", label:"Right"}
                    ]} classes="onField" />
                </div>

                <div className={`my-4 border rounded-2xl border-blue-600 p-4 bg-blue-950 teleop ${onField ? '' : 'hidden'}`}>
                    <h2 id="teleTitle" className="text-center text-2xl pb-4">Teleop</h2>
                    <div className="relative z-0">
                        <h3 className="text-center text-lg">Field Zone Reference</h3>
                        <Image src={fieldImg} alt="Field Diagram" className="fieldDiagram" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
                    </div>
                    <MultiOptions title="Snowblow/Pass From:" options={[
                        {value: 2, name: "teleop-snowblow_alliance", label:"Alliance Zone to Alliance Zone"},
                        {value: 3, name: "teleop-snowblow_neutral2", label:"Neutral 2 to Home Zone"},
                        {value: 4, name: "teleop-snowblow_neutral1", label:"Neutral 1 to Home Zone"},
                        {value: 0, name: "teleop-snowblow_none", label:"Robot did not snowblow"}
                    ]} vertical={true} multiSelect={true}/>
                    <FuelCounter name="teleop-fuel_score" />
                    <BoolOptions name="teleop-out_of_bounds" title="Did robot shoot out of field?" />
                    <BoolOptions name="teleop-move_shoot" title="Did robot shoot while moving?"  />
                    <BoolOptions name="teleop-bump" title="Did robot navigate bump?"  />
                    <BoolOptions name="teleop-trench" title="Did robot navigate trench?"  />
                </div>

                <div className={`my-4 border rounded-2xl border-red-600 p-4 bg-red-950 endgame ${onField ? '' : 'hidden'}`}>
                    <h2 id="egTitle" className="text-center text-2xl pb-4 onField">End Game</h2>
                    <FuelCounter name="endgame-fuel_score" />
                    <MultiOptions title="Climb Location" name="endgame-climb_location" options={[
                        {value: "left", label:"Left"},
                        {value: "middle", label:"Middle"},
                        {value: "right", label:"Right"}
                    ]} classes="onField" />
                    <MultiOptions title="Climb Level" name="endgame-climb_level" options={[
                        {value: 1, name:"endgame-climb_level", label:"Level 1"},
                        {value: 2, name:"endgame-climb_level", label:"Level 2"},
                        {value: 3, name:"endgame-climb_level", label:"Level 3"},
                        {value: 0, name:"endgame-climb_level", label:"No climb"},
                        {value: -1, name:"endgame-climb_level", label:"Failed climb"}
                    ]} classes="onField " vertical={true} />
                </div>

                <h2 className="text-center text-2xl">Post Match</h2>

                <div className={`${onField ? '' : 'hidden'}`}>
                    <MultiOptions title="Driver Skill" name="teleop-driver_skill" options={[
                        {value: 4, label:"Very Effective"},
                        {value: 3, label:"Effective"},
                        {value: 2, label:"Average"},
                        {value: 1, label:"Not Effective"},
                        {value: 0, label:"Not Sure"}
                    ]} vertical={true} />

                    <MultiOptions title="Robot Speed" name="teleop-speed" options={[
                        {value: "slow", label:"Slow"},
                        {value: "medium", label:"Medium"},
                        {value: "fast", label:"Fast"}
                    ]} classes="onField" />

                    <MultiOptions title="Robot Assessment" options={[
                        {value: "died", name: "assessment-died", label:"Died / Immobile"},
                        {value: "tipped", name: "assessment-tipped", label:"Tipped over"},
                        {value: "spilled", name: "assessment-spilled", label:"Spilled fuel on bump"},
                        {value: "stuck: fuel", name: "assessment-stuck_fuel", label:"Stuck on fuel"},
                        {value: "stuck: bump", name: "assessment-stuck_bump", label:"Stuck on bump"}
                    ]} vertical={true} multiSelect={true} />

                </div>

                <div className="p4 justify-items-center">
                    <h3 className="text-lg p-4">Notes</h3>
                    <textarea className="w-full h-40 inset-shadow-white" id="notes" name="notes"></textarea>

                    <h3 className="text-lg p-4">Ranking Points</h3>
                    <select className="flex justify-self-center p-4" defaultValue="0" name="rank_points" id="rankPoints">
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                </div>

                <div className="justify-self-center mt-8 mb-32">
                    <button id="submit" type="submit" disabled={isSubmitting} className="px-4 py-2 bg-chaos text-black rounded-lg shadow-[0_0px_3px_rgba(255,255,255,0.50)]">
                        {submitMessage}
                    </button>
                </div>
            </form>

            <AlertModal isOpen={isModalOpen} postData={postData} onCancel={() => setModalOpen(false)} onConfirm={() => {
                setModalOpen(false);
                postFormData();
            }}/>
        </>
    );
}
