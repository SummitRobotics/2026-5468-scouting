"use client";
import {useEffect} from "react";
import Script from 'next/script'
import initialize from "./scripts/main"

export default function page() {
  useEffect(() => {
    initialize();
  }, []);
  return (
    <div id="container">
        <div className="containerInner centerWrap">
            <h1 className="headerMain">Select Match and Scouting Seat</h1>
            <form id="scoutingForm">
                <table className="tableNormal">
                  <tbody>
                    <tr>
                        <td>
                            <strong>Name</strong>
                        </td>
                        <td>
                            <input type="text" id="name" required />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Match #:</strong>
                        </td>
                        <td>
                            <input type="hidden" id="eventKey" value="2025wass" />
                            <select id="matchNum">

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Scouting Seat:</strong>
                        </td>
                        <td>
                            <select id="scoutingSeat">
                                <option value="red1">Red 1</option>
                                <option value="red2">Red 2</option>
                                <option value="red3">Red 3</option>
                                <option value="blue1">Blue 1</option>
                                <option value="blue2">Blue 2</option>
                                <option value="blue3">Blue 3</option>
                            </select>
                        </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <table className="tableNormal">
                  <tbody>
                    <tr>
                        <th>
                            <span className="header">Top 3 scouters!</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <ol id="leaderboardList">
                                <li>Loading...</li>
                            </ol>
                        </th>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="inline-block rounded-full py-2 px-4 text-black border-1 border-chaos-300 bg-chaos">Go to Scouting Form</button>
            </form>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <table className="tableNormal">
                  <tbody>
                    <tr>
                        <td>
                            <strong>Color Theme</strong>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select id="theme">
                                <option value="default">Default</option>
                                <option value="red" className="text-[lightcoral]">Red</option>
                                <option value="blue" className="text-[darkcyan]">Blue</option>
                                <option value="pink" className="text-[pink]">Pink</option>
                                <option value="purple" className="text-[mediumorchid]">Purple</option>
                                <option value="gold" className="text-[goldenrod]">Gold</option>
                            </select>
                        </td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
      </div>
  );
}
