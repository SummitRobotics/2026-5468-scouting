"use client";
import {useEffect} from "react";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";

import initialize, {main} from "./form";
import * as c from "../components"

export default function page() {
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

            <div id="container">
                <div className="containerInner">
                    <h1 className="headerMain">Match Scouting</h1>
                    <div className="auto">
                        <h2 id="aTitle">Auto Phase</h2>
                        <c.boolOptions title="Robot on Field" name="on_field" YFunc={() => {
                            document.querySelectorAll(".onField").forEach((element) => {
                                (element as HTMLElement).style.display = "table";
                            });
                            document.getElementById("teleTitle")!.style.display = "block";
                        }} NFunc={() => {
                             document.querySelectorAll(".onField").forEach((element) => {
                                (element as HTMLElement).style.display = "none";
                            });
                            document.getElementById("teleTitle")!.style.display = "none";
                        }} />
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

                    <div className="teleop onField">
                        <h2 id="teleTitle">Teleop</h2>
                        <div className="relative">
                            <h3 className="text-center font-bold">Field Zone Reference</h3>
                            <Image src={fieldImg} alt="Field Diagram" className="fieldDiagram" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/>
                        </div>
                        <c.multiOptions title="Snowblow/Pass From:" options={[
                            {return: 2, name: "teleop_snowblow_alliance", option:"Alliance Zone to Alliance Zone"},
                            {return: 3, name: "teleop_snowblow_neutral2", option:"Neutral 2 to Home Zone"},
                            {return: 4, name: "teleop_snowblow_neutral1", option:"Neutral 1 to Home Zone"},
                            {return: 0, name: "teleop_snowblow_none", option:"Robot did not snowblow"}
                        ]} classes="leftAlign onField" vertical={true} multiSelect={true}/>
                        <c.fuelCounter />
                         <c.boolOptions name="teleop_out_of_bounds" title="Did robot shoot out of field?" />
                        <c.boolOptions name="teleop_move_shoot" title="Can robot shoot while moving?"  />
                        <c.boolOptions name="teleop_bump" title="Can robot navigate bump?"  />
                        <c.boolOptions name="teleop_trench" title="Can robot navigate trench?"  />
                    </div>

                    <div className="endgame">
                        <h2 id="egTitle" className="onField">End Game</h2>
                        <c.fuelCounter classes="onField" />
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
                        <c.boolOptions title="Played Defense" name="teleop_defense" classes="onField" YFunc={() => {
                            document.getElementById("defenseTable")!.style.display = "table";
                        }} NFunc={() => {
                            document.getElementById("defenseTable")!.style.display = "none";
                        }}/>
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
                        <table className="tableNormal">
                            <tbody>
                                <tr>
                                    <th>
                                        <span className="header">Notes</span>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea id="notes"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="tableNormal onField">
                            <tbody>
                                <tr>
                                    <td>
                                        <span className="header">Ranking Points:</span>
                                    </td>
                                    <td>
                                        <select defaultValue="0" name="rank_points" id="rankPoints">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="centerWrap mb-24">
                            <div id="pleaseWaitMessage" style={{display: "none"}} className="text-blue-900 text-center">Please wait...</div>
                            <button id="submit" className="Jbutton">Submit</button>
                        </div>
                    </div>
            </div>
        </div>
        </>
    );
}
