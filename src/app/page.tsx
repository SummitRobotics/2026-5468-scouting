"use client";
import {useEffect, useState} from "react";
import { COMP_ID } from "@/app/components/constants";
import { initialize, getCachedEventMatches } from "@/app/scripts/main"
import { Match } from "@/app/utils/interfaces";
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import BugsnagPerformance from '@bugsnag/browser-performance'


export default function Page() {
    const [matchList, setMatchList] = useState<Match[]>([]);
    const [selectedMatchNumber, setSelectedMatchNumber] = useState<number>(1);

    useEffect(() => {
        async function fetchMatches() {
            const data = await getCachedEventMatches();

            setMatchList(data);
            if (data.length > 0) {
                setSelectedMatchNumber(data[0].match_number);
            }
        }
        fetchMatches();
        initialize();
    }, []);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        let foundError: string | null = null;
        if(!formData) {
            foundError = 'Something went wrong. Please try again.'
            setError(foundError);
            return;
        }
        const errors : { [key: string]: string }  = {
            scouterName: "Please enter your name",
            matchNum: "A match number must be selected",
            scoutingSeat: "Please enter your Scouting Seat"
        };

        formData.keys().forEach(key => {
            if(!formData.get(key) || formData.get(key) == '') {
                foundError = errors[key];
                setError(foundError);
                return;
            }
        });

        console.log(`error?: ${error}`)

        if(foundError) {
            return;
        }

        const seatCollection = (typeof formData.get('scoutingSeat') == 'string') ? formData.get('scoutingSeat')!.toString().split(':') : [];
        const alliance:string = seatCollection[0];
        const seatNum = Number(seatCollection[1]) - 1; // Arrays are zero-based
        const selectedMatch = matchList.find(match => match.match_number === selectedMatchNumber);
        const teamNumber = selectedMatch!.alliances[alliance].team_keys[seatNum].replace('frc', '');

        window.location.assign(`/matchScouting?team=${teamNumber}&match=${formData.get('matchNum')}&name=${encodeURIComponent(formData.get('scouterName')!.toString())}&seat=${formData.get("scoutingSeat")}`);
    }

    return (
        <div className="p-4 grid grid-row place-content-center">
            <h1 className="text-center text-3xl p-3">Select Match<br />and Scouting Seat</h1>
            <form action={handleSubmit} className="text-center">
                <input type="hidden" name="COMP_ID" value={COMP_ID} />
                <div className="flex place-items-center">
                    <label htmlFor="name" className="text-lg font-bold place-self-center">Name:</label>
                    <input type="text" id="name" name="scouterName" />
                </div>
                <div className="flex place-items-center">
                    <label htmlFor="matchNum" className="text-lg font-bold">Match #:</label>
                    <select id="matchNum" name="matchNum" required onChange={(e) => {setSelectedMatchNumber(Number(e.target.value));}}>
                        {matchList.map((match, idx) => (
                            <option key={`${match.match_number}-${idx}`} value={match.match_number}>
                                {match.match_number}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex place-items-center">
                    <label htmlFor="scoutingSeat" className="text-lg font-bold">Scouting Seat:</label>
                    <select id="scoutingSeat" name="scoutingSeat" required>
                        <option value="red:1">Red 1</option>
                        <option value="red:2">Red 2</option>
                        <option value="red:3">Red 3</option>
                        <option value="blue:1">Blue 1</option>
                        <option value="blue:2">Blue 2</option>
                        <option value="blue:3">Blue 3</option>
                    </select>
                </div>
                <div className="text-red-500 font-bold text-center">{error}</div>
                <button type="submit" className="">Go to Scouting Form</button>
            </form>

            <div>
                <h2 className="text-center text-xl p-3">Top 3 scouters!</h2>
                <ol id="leaderboardList" className="text-center">
                    <li>Loading...</li>
                </ol>
            </div>
        </div>
    );
}
