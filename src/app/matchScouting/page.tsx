"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";

import initialize, {main} from "./form";
import * as c from "../components"

export default function page() {
    const [onField, setOnField] = useState(true);
    const [defense, setDefense] = useState(false);
    const searchParams = useSearchParams()
    const team = searchParams.get('team');
    const match = searchParams.get('match');
    const seat = searchParams.get('seat');
    const fieldImg = (seat?.includes('blue')) ? '/images/field_top_blue_home.png' : '/images/field_top_red_home.png';
    const teamColor = (seat?.includes('blue')) ? 'text-blue-500' : 'text-red-500';

    useEffect(() => {
        initialize();
        main();
    }, []);
    return (
        <>
            <div className={`z-0 sticky top-0 flex justify-center bg-white dark:bg-black p-4 shadow-md space-x-4 ${teamColor}`}>
                <div className="font-bold">Match #{match}</div>
                <div className="font-bold">Team #{team}</div>
            </div>

            <div className="p-4" id="container">
                <div className="containerInner">
                    <h1 className="text-center text-3xl p-3">Match Scouting</h1>

                    <c.boolOptions title="Robot on Field" name="on_field" YFunc={() => setOnField(true)} NFunc={() => setOnField(false)} />

                    <div className={`my-4 border rounded-2xl border-green-600 p-4 bg-green-950 auto ${onField ? '' : 'hidden'}`}>
                        <h2 id="aTitle" className="text-center text-2xl pb-4">Auto Phase</h2>
                        <c.boolOptions title="Left starting position" name="auto_moved" classes="onField" YFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "table";
                            });
                        }} NFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "none";
                            });
                        }} />
                        <c.multiOptions title="Starting Position" name="start_position" options={[
                            {return: "left", option:"Left"},
                            {return: "middle", option:"Middle"},
                            {return: "right", option:"Right"}
                        ]} classes="onField" />
                        <c.boolOptions title="Did robot climb?" name="auto_climb" classes="onField" />
                        <c.multiOptions title="Picked up fuel from:" options={[
                            {return: "depot", name: "auto_fuel_depot", option:"Depot"},
                            {return: "outpost", name: "auto_fuel_outpost", option:"Outpost"},
                            {return: "neutral", name: "auto_fuel_neutral", option:"Neutral Zone"},
                            {return: "none", name: "auto_fuel_none", option:"Did not pick up fuel"}
                        ]} classes="onField leftAlign" vertical={true} multiSelect={true} />
                        <c.fuelCounter name="auto_fuel_score" classes="onField" />
                        <c.multiOptions title="Climb Location" name="auto_climb_location" options={[
                            {return: "left", option:"Left"},
                            {return: "middle", option:"Middle"},
                            {return: "right", option:"Right"}
                        ]} classes="onField" />
                    </div>

                    <div className={`my-4 border rounded-2xl border-blue-600 p-4 bg-blue-950 teleop ${onField ? '' : 'hidden'}`}>
                        <h2 id="teleTitle" className="text-center text-2xl pb-4">Teleop</h2>
                        <div className="relative z-0">
                            <h3 className="text-center text-lg">Field Zone Reference</h3>
                            <Image src={fieldImg} alt="Field Diagram" className="fieldDiagram" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
                        </div>
                        <c.multiOptions title="Snowblow/Pass From:" options={[
                            {return: 2, name: "teleop_snowblow_alliance", option:"Alliance Zone to Alliance Zone"},
                            {return: 3, name: "teleop_snowblow_neutral2", option:"Neutral 2 to Home Zone"},
                            {return: 4, name: "teleop_snowblow_neutral1", option:"Neutral 1 to Home Zone"},
                            {return: 0, name: "teleop_snowblow_none", option:"Robot did not snowblow"}
                        ]} classes="leftAlign onField" vertical={true} multiSelect={true}/>
                        <c.fuelCounter name="teleop_fuel_score" />
                         <c.boolOptions name="teleop_out_of_bounds" title="Did robot shoot out of field?" />
                        <c.boolOptions name="teleop_move_shoot" title="Can robot shoot while moving?"  />
                        <c.boolOptions name="teleop_bump" title="Can robot navigate bump?"  />
                        <c.boolOptions name="teleop_trench" title="Can robot navigate trench?"  />
                    </div>

                    <div className={`my-4 border rounded-2xl border-red-600 p-4 bg-red-950 endgame ${onField ? '' : 'hidden'}`}>
                        <h2 id="egTitle" className="text-center text-2xl pb-4 onField">End Game</h2>
                        <c.fuelCounter classes="onField" name="endgame_fuel_score" />
                        <c.multiOptions title="Climb Location" name="endgame_climb_location" options={[
                            {return: "leftEndgame", option:"Left"},
                            {return: "middleEndgame", option:"Middle"},
                            {return: "rightEndgame", option:"Right"}
                        ]} classes="onField" />
                        <c.multiOptions title="Climb Level" name="endgame_climb_level"options={[
                            {return: 1, option:"Level 1"},
                            {return: 2, option:"Level 2"},
                            {return: 3, option:"Level 3"},
                            {return: 0, option:"No climb"},
                            {return: -1, option:"Failed climb"}
                        ]} classes="onField leftAlign" vertical={true} />
                        <c.multiOptions title="Driver Skill" name="teleop_driver_skill" options={[
                            {return: 4, option:"Very Effective"},
                            {return: 3, option:"Effective"},
                            {return: 2, option:"Average"},
                            {return: 1, option:"Not Effective"},
                            {return: 0, option:"Not Sure"}
                        ]} classes="leftAlign onField" vertical={true} />
                        <c.boolOptions title="Played Defense" name="teleop_defense" classes="onField" YFunc={() => setDefense(true)} NFunc={() => setDefense(false)}/>
                        <div className={`${defense ? '' : 'hidden'}`}>
                            <c.multiOptions title="Defensive Skills" options={[
                                {return: "Blocked coral station", option: "Blocked access to coral station"},
                                {return: "Slowed good team", option: "Slowed high scoring team"},
                                {return: "Ineffective", option: "Not effective at blocking station or slowing team down"},
                                {return: "Broke down", option: "Broke down"},
                                {return: "Avoided penalties", option: "Avoided penalties"},
                                {return: "Took penalties", option: "Lots of penalties"},
                                {return: "Stuck: Algae", option: "Stuck on algae"},
                                {return: "Stuck: Coral", option: "Stuck on coral"}
                            ]} id="defenseTable" classes="leftAlign onField" vertical={true} multiSelect={true} />
                        </div>
                        <c.multiOptions title="Speed" name="teleop_speed" options={[
                            {return: "slow", option:"Slow"},
                            {return: "medium", option:"Medium"},
                            {return: "fast", option:"Fast"}
                        ]} classes="onField" />
                        <c.multiOptions title="Robot Assessment" options={[
                            {return: "died", name: "assessment_died", option:"Died / Immobile"},
                            {return: "tipped", name: "assessment_tipped", option:"Tipped over"},
                            {return: "spilled", name: "assessment_spilled", option:"Spilled fuel on bump"},
                            {return: "stuck: fuel", name: "assessment_stuck_fuel", option:"Stuck on fuel"},
                            {return: "stuck: bump", name: "assessment_stuck_bump", option:"Stuck on bump"}
                        ]} classes="leftAlign onField" vertical={true} multiSelect={true} />
                    </div>
                </div>

                <div className="p4 justify-items-center">
                    <h2 className="text-center text-2xl">Post Match</h2>

                    <h3 className="text-lg p-4">Notes</h3>
                    <textarea className="w-full h-40 inset-shadow-white" id="notes"></textarea>

                    <h3 className="text-lg p-4">Ranking Points</h3>
                    <select className="flex justify-self-center p-4" defaultValue="0" name="rank_points" id="rankPoints">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <div className="justify-self-center mt-8 mb-32">
                    <div id="pleaseWaitMessage" style={{display: "none"}} className="text-blue-900 text-center">Please wait...</div>
                    <button id="submit" type="submit" className="px-4 py-2 bg-chaos text-black rounded-lg shadow-[0_0px_3px_rgba(255,255,255,0.50)]">Submit</button>
                </div>

            </div>
        </>
    );
}
