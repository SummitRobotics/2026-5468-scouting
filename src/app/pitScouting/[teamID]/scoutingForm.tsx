'use client';
import { useState } from "react";

type PitData = {
  teamID: number,
  notes: string,
  hopper_capacity: number
};

export default function PitScoutingForm({pitData}: {pitData: PitData }) {

  return(
    <>
      <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
      <h2 className="text-center text-xl p-3">Team {pitData.teamID}</h2>

      <form className="p-4 grid grid-row place-content-center" method="get">


        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Scout Team</button>
      </form>
    </>
  );
}
