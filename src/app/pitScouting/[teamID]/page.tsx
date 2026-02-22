import { getDoc, doc } from "firebase/firestore";
import { db } from "../../components/firebase";
import { TeamPitData } from "../../utils/interfaces";
import PitScoutingForm from "./scoutingForm";
import { coerceDataTypes } from "../../utils/dataUtils";


async function fetchTeamData(teamID: string): Promise<TeamPitData | null> {
  try {
    const teamData = await getDoc(doc(db, 'teams', teamID));

    if(teamData.exists()) {
      return {
        teamID,
        ...coerceDataTypes(teamData.data())
      } as TeamPitData;
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
  const TeamData: TeamPitData = await fetchTeamData(teamID) || { teamID: parseInt(teamID) };

  return (
    <div className="p-4 grid grid-row place-content-center">
      <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
      <h2 className="text-center text-xl p-3">Team {TeamData.teamID}</h2>

      <PitScoutingForm pitData={ TeamData } />
    </div>
  );
}
