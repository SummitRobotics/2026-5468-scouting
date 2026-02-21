import { getDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase";
import { TeamPitData } from "../../utils/interfaces";

import PitScoutingForm from "./scoutingForm";


async function fetchTeamData(teamID: string): Promise<TeamPitData | null> {
  try {
    const teamData = await getDoc(doc(db, 'teams', teamID));
    console.log("Fetched team data:", teamData);
    if(teamData.exists()) {
      return teamData.data() as TeamPitData;
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
  const TeamData: TeamPitData = await fetchTeamData(teamID) || { error: "Team not found", teamID: parseInt(teamID) };

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
      <h2 className="text-center text-xl p-3">
        {TeamData.error ? `Team ${teamID} not found` : `Team ${TeamData.teamID}`}
      </h2>

      <PitScoutingForm pitData={TeamData} />
    </div>
  );
}
