'use client';
import { useState } from "react";

type Team = {
  team_number: number,
  nickname: string
};

export default function TeamChooserForm({ eventTeams }: { eventTeams: Team[] }) {
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const [teamName, setTeamName] = useState<string>('');

  return(
    <form className="p-4 grid grid-row place-content-center" action={`/pitScouting/${teamNumber}`} method="get">
      <select name="team" className="border border-gray-300 rounded" onChange={(e) => {
        setTeamNumber(Number(e.target.value));
        setTeamName(eventTeams.find(team => team.team_number === Number(e.target.value))?.nickname || '');
      }} defaultValue={teamNumber}>
        <option key="none" value={0} disabled >Select a Team</option>
        {eventTeams.map(team => (
          <option key={team.team_number} value={team.team_number}>
            {team.team_number} - {team.nickname}
          </option>
        ))}
      </select>
      <input type="hidden" name="teamName" value={teamName} />
      <button type="submit" disabled={teamNumber === 0} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Scout Team</button>
    </form>
  );
}
