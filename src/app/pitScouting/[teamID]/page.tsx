import { getDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase";

import PitScoutingForm from "./scoutingForm";

interface TeamScoutingData {
  hopper_capacity?: number;
  notes?: string;
  teamID: number;
  error?: string;
}

async function fetchTeamData(teamID: string): Promise<TeamScoutingData | null> {
  try {
    const teamData = await getDoc(doc(db, 'teams', teamID));
    if(teamData.exists()) {
      return teamData.data() as TeamScoutingData;
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }

  return null; // Return null if there's an error or if the document doesn't exist
};

export default async function Page({ params }: {
  params: Promise<{ teamID: string }>
}) {
  const { teamID } = await params;
  const TeamData: TeamScoutingData = await fetchTeamData(teamID) || { error: "Team not found", teamID: parseInt(teamID) };

  if(TeamData.error) {
    return (
      <div className="p-4 grid grid-row place-content-center">
        <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
        <h2 className="text-center text-xl p-3">Team {teamID} not found</h2>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-row place-content-center">
      <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
      <h2 className="text-center text-xl p-3">Team {TeamData.teamID}</h2>
    </div>
  );
}
