"use client";
import {useEffect} from "react";
import { useSearchParams } from 'next/navigation'

import initialize, {main} from "./form";
import * as c from "../components"

export default function page() {
    const searchParams = useSearchParams()
    const team = searchParams.get('team');
    const match = searchParams.get('match');

    useEffect(() => {
        initialize();
        main();
    }, []);
    return (
        <>
            <div className="z-0 sticky top-0 flex justify-center bg-white dark:bg-black p-4 shadow-md space-x-4">
                <div className="">Match #{match}</div>
                <div className="">Team #{team}</div>
            </div>

            <div id="container">
                <div className="containerInner">
                    <h1 className="headerMain">Match Scouting</h1>
                    <div className="auto">
                        <h2 id="aTitle">Auto Phase</h2>
                        <c.boolOptions title="Robot on Field?" YFunc={() => {
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
                        <c.boolOptions title="Did robot leave starting position?" classes="onField" YFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "table";
                            });
                        }} NFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "none";
                            });
                        }} />
                        <c.multiOptions title="Starting Position" options={[
                            {return: "left", option:"Left"},
                            {return: "middle", option:"Middle"},
                            {return: "right", option:"Right"}
                        ]} classes="onField" />
                        <c.boolOptions title="Did robot climb?" classes="onField" />
                        <c.boolOptions title="Did robot visit depot?"  classes="onField" />
                        <c.boolOptions title="Did robot visit outpost?" classes="onField" />
                        <c.multiOptions title="Picked up fuel from:" options={[
                            {return: "depot", option:"Depot"},
                            {return: "outpost", option:"Outpost"},
                            {return: "neutral", option:"Neutral Zone"},
                            {return: "none", option:"Did not pick up fuel"}
                        ]} classes="onField leftAlign" vertical={true} multiSelect={true} />
                        <c.fuelCounter classes="onField" />
                        <c.multiOptions title="Climb Location" options={[
                            {return: "left", option:"Left"},
                            {return: "middle", option:"Middle"},
                            {return: "right", option:"Right"}
                        ]} classes="onField" />
                    </div>

                    <div className="teleop onField">
                        <h2 id="teleTitle">Teleop</h2>
                        <c.multiOptions title="Did robot snowblow from:" options={[
                            {return: 2, option:"Zone 2 to Zone 1"},
                            {return: 3, option:"Zone 3 to Zone 1"},
                            {return: 4, option:"Zone 4 to Zone 1"},
                            {return: 0, option:"Robot did not snowblow"}
                        ]} classes="leftAlign onField" vertical={true} />
                        <c.fuelCounter />
                         <c.boolOptions title="Did robot shoot out of field?" />
                        <c.boolOptions title="Can robot shoot while moving?"  />
                        <c.boolOptions title="Can robot navigate bump?"  />
                        <c.boolOptions title="Can robot navigate trench?"  />
                    </div>

                    <div className="endgame">
                        <h2 id="egTitle" className="onField">End Game</h2>
                        <c.fuelCounter classes="onField" />
                        <c.multiOptions title="Climb Location" options={[
                            {return: "leftEndgame", option:"Left"},
                            {return: "middleEndgame", option:"Middle"},
                            {return: "rightEndgame", option:"Right"}
                        ]} classes="onField" />
                        <c.multiOptions title="Climb Level" options={[
                            {return: 1, option:"Level 1"},
                            {return: 2, option:"Level 2"},
                            {return: 3, option:"Level 3"},
                            {return: 0, option:"No climb"},
                            {return: -1, option:"Failed climb"}
                        ]} classes="onField leftAlign" vertical={true} />
                        <c.multiOptions title="Driver Skill" options={[
                            {return: 4, option:"Very Effective"},
                            {return: 3, option:"Effective"},
                            {return: 2, option:"Average"},
                            {return: 1, option:"Not Effective"},
                            {return: 0, option:"Not Sure"}
                        ]} classes="leftAlign onField" vertical={true} />
                        <c.boolOptions title="Played Defense" classes="onField" YFunc={() => {
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
                        <c.multiOptions title="Speed" options={[
                            {return: "slow", option:"Slow"},
                            {return: "medium", option:"Medium"},
                            {return: "fast", option:"Fast"}
                        ]} classes="onField" />
                        <c.multiOptions title="Robot Assessment" options={[
                            {return: "died", option:"Died / Immobile"},
                            {return: "tipped", option:"Tipped over"},
                            {return: "spilled", option:"Spilled fuel on bump"},
                            {return: "stuck: fuel", option:"Stuck on fuel"},
                            {return: "stuck: bump", option:"Stuck on bump"}
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
                                        <select defaultValue="0" id="rankPoints">
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
