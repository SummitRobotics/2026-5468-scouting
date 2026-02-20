'use client';
import { useState } from "react";

type Team = {
  team_number: number,
  nickname: string
};

export default function TeamChooserForm({ eventTeams }: { eventTeams: Team[] }) {
  const [teamNumber, setTeamNumber] = useState<number>(0);

  return(
    <form className="p-4 grid grid-row place-content-center" action={`/pitScouting/scouting`} method="get">
      <select name="team" className="border border-gray-300 rounded" onChange={(e) => setTeamNumber(Number(e.target.value))} defaultValue={teamNumber}>
        <option key="none" value={0} disabled >Select a Team</option>
        {eventTeams.map(team => (
          <option key={team.team_number} value={team.team_number}>
            {team.team_number} - {team.nickname}
          </option>
        ))}
      </select>
      <button type="submit" disabled={teamNumber === 0} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Scout Team</button>
    </form>
  );
}
