"use client";
import {useEffect} from "react";
import Script from 'next/script'
import initialize from "./scripts/main"

export default function page() {
  useEffect(() => {
    initialize();
  }, []);
  return (
    <div className="p-4 grid grid-row place-content-center">
        <h1 className="text-center text-3xl p-3">Select Match<br />and Scouting Seat</h1>
        <form id="scoutingForm">
            <input type="hidden" id="eventKey" value="2025wass" />
            <div className="flex place-items-center">
                <label htmlFor="name" className="text-lg font-bold place-self-center">Name:</label>
                <input type="text" id="name" required />
            </div>
            <div className="flex place-items-center">
                <label htmlFor="matchNum" className="text-lg font-bold">Match #:</label>
                <select id="matchNum"></select>
            </div>
            <div className="flex place-items-center">
                <label htmlFor="scoutingSeat" className="text-lg font-bold">Scouting Seat:</label>
                <select id="scoutingSeat">
                    <option value="red1">Red 1</option>
                    <option value="red2">Red 2</option>
                    <option value="red3">Red 3</option>
                    <option value="blue1">Blue 1</option>
                    <option value="blue2">Blue 2</option>
                    <option value="blue3">Blue 3</option>
                </select>
            </div>
            <button type="submit" className="flex justify-self-center">Go to Scouting Form</button>

            <div>
                <h2 className="text-center text-xl p-3">Top 3 scouters!</h2>
                <ol id="leaderboardList" className="text-center">
                    <li>Loading...</li>
                </ol>
            </div>
        </form>
    </div>
  );
}
