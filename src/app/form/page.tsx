"use client";
import {useEffect} from "react";
import initialize, {main} from "../scripts/form";
import * as c from "../components"
export default function page() {
    useEffect(() => {
        initialize();
        main();
    }, []);
    return (
        <>
            <div id="top-bar-container">
                <div id="top-bar">
                    <span id="matchNumInput" className="relative left-1">Match #</span>
                    <span id="team" className="fixed right-1">Team:</span>
                </div>
            </div>
            <div id="container">
                <div className="containerInner">
                    <h1 className="headerMain">5468 Scouting Form 2025</h1>
                    <div className="auto">
                        <h2 id="aTitle">Auto Phase</h2>
                        <c.fuelCounter />
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
                        <c.boolOptions title="Did robot leave starting position?" YFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "table";
                            });
                        }} NFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "none";
                            });
                        }} />
                        <c.boolOptions title="Did robot climb?" YFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "table";
                            });
                        }} NFunc={() => {
                            document.querySelectorAll(".auto .onField ~ .onField").forEach((element) => {
                                (element as HTMLElement).style.display = "none";
                            });
                        }} />
                        <c.boolOptions title="Did robot score?" YFunc={() => {
                            console.error("Not implemented");
                        }} NFunc={() => {
                            console.error("Not implemented");
                        }} />
                    </div>
                    
                    <div className="teleop">
                        <h2 id="teleTitle">Teleop</h2>
                        <c.fuelCounter />
                    </div>
                    
                    
                    <div className="endgame">
                        <h2 id="egTitle" className="onField">End Game</h2>
                        <c.fuelCounter />
                    <table className="tableNormal leftAlign onField">
                        <tbody>
                            <tr>
                                <th>
                                    <span className="header">Driver Skill</span>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="skill" id="skillVeryEffect" /> <label htmlFor="skillVeryEffect">Very Effective</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="skill" id="skillEffect" /> <label htmlFor="skillEffect">Effective</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="skill" id="skillAver" /> <label htmlFor="skillAver">Average</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="skill" id="skillNoEffect" /> <label htmlFor="skillNoEffect">Not Effective</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="skill" id="skillNoSure" /> <label htmlFor="skillNoSure">Not Sure</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="tableNormal onField">
                        <tbody>
                            <tr>
                                <th colSpan={4}>
                                    <span className="header">Played Defense</span>
                                </th>
                            </tr>
                            <tr>
                                <td colSpan={2} className="w-1/2">
                                    <input type="radio" name="defense" id="defenseY" /> <label htmlFor="defenseY">Yes</label>
                                </td>
                                <td colSpan={2}>
                                    <input type="radio" name="defense" id="defenseN" /> <label htmlFor="defenseN">No</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table id="defenseTable" className="tableNormal leftAlign" style={{display: "none"}}>
                        <tbody>
                            <tr>
                                <th>
                                    <span className="header">Defensive Skills</span>
                                </th>
                            </tr>

                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Blocked coral station" /> <label htmlFor="Blocked coral station">Blocked access to coral station</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Slowed good team" /> <label htmlFor="Slowed good team">Slowed high scoring team</label>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-wrap">
                                    <input type="checkbox" name="dSkill" id="Ineffective" /> <label htmlFor="Ineffective">Not effective at blocking station or slowing team down</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Broke down" /> <label htmlFor="Broke down">Broke down</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Avoided penalties" /> <label htmlFor="Avoided penalties">Avoided penalties</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Took penalties" /> <label htmlFor="Took penalties">Lots of penalties</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Stuck: Algae" /> <label htmlFor="Stuck: Algae">Stuck on algae</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dSkill" id="Stuck: Coral" /> <label htmlFor="Stuck: Coral">Stuck on coral</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="tableNormal onField">
                        <tbody>
                            <tr>
                                <th colSpan={3}>
                                    <span className="header">Speed</span>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="radio" name="speed" id="speedS" /> <label htmlFor="speedS">Slow</label>
                                </td>
                                <td>
                                    <input type="radio" name="speed" id="speed" /> <label htmlFor="speed">Medium</label>
                                </td>
                                <td>
                                    <input type="radio" name="speed" id="speedF" /> <label htmlFor="speedF">Fast</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="tableNormal leftAlign onField">
                        <tbody>
                            <tr>
                                <th>
                                    <span className="header">Robot Assessment</span>
                                </th>
                            </tr>

                            <tr>
                                <td>
                                    <input type="checkbox" name="assess" id="assessDie" /> <label htmlFor="assessDie">Died / Immobile</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="assess" id="assessTippy" /> <label htmlFor="assessTippy">Tippy (almost tipped over)</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="assess" id="assessTipped" /> <label htmlFor="assessTipped">Tipped over</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="assess" id="assessTrap" /> <label htmlFor="assessTrap">Had game pieces trapped in robot</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="assess" id="assessFlimsy" /> <label htmlFor="assessFlimsy">Looks flimsy</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="assess" id="assessSolid" /> <label htmlFor="assessSolid">Solidly built</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                                    <input type="radio" name="coopertition" id="coopY" /> <label htmlFor="coopY">Yes</label>
                                </td>
                                <td>
                                    <input type="radio" name="coopertition" id="coopN" /> <label htmlFor="coopN">No</label>
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
                        
                    <div className="centerWrap">
                        <div id="pleaseWaitMessage" style={{display: "none"}} className="text-blue-900 text-center">Please wait...</div>
                        <button id="submit" className="Jbutton">Submit</button>
                    </div>
                    </div>
            </div>
        </div>
        </>
    );
}