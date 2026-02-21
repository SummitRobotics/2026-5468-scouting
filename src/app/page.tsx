"use client";
import {useEffect, useState} from "react";
import initialize from "./scripts/main"

const apiKey = 'zu21V7xO4Yu9ny1QVq7HsrYIAEG0p015yi747MxvjUHw9Hk7de60VPxIRBA0gYRN';
const eventKey = '2026week0';

export default function Page() {
    useEffect(() => {
        initialize(eventKey);
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
        const alliance = seatCollection[0];
        const seatNum = seatCollection[1];


        fetch(`https://www.thebluealliance.com/api/v3/match/${formData.get('eventKey')}_qm${formData.get('matchNum')}`, {
            headers: {
                'X-TBA-Auth-Key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            const teamNumber = data.alliances[alliance].team_keys[seatNum].replace('frc', '');

            window.location.assign(`/matchScouting?team=${teamNumber}&match=${formData.get('matchNum')}&name=${encodeURIComponent(formData.get('scouterName')!.toString())}`);
        })
        .catch(error => {
            console.error('Error fetching match data:', error);
        });
    }

    return (
        <div className="p-4 grid grid-row place-content-center">
            <h1 className="text-center text-3xl p-3">Select Match<br />and Scouting Seat</h1>
            <form action={handleSubmit}>
                <input type="hidden" name="eventKey" value={eventKey} />
                <div className="flex place-items-center">
                    <label htmlFor="name" className="text-lg font-bold place-self-center">Name:</label>
                    <input type="text" id="name" name="scouterName" />
                </div>
                <div className="flex place-items-center">
                    <label htmlFor="matchNum" className="text-lg font-bold">Match #:</label>
                    <select id="matchNum" name="matchNum" required></select>
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
