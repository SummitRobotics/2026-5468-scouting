import { collection, getDocs } from "firebase/firestore";
import { db } from "../../components/firebase";

import PitScoutingForm from "./scoutingForm";

interface TeamScoutingData {
  hopper_capacity: number;
  notes: string;
  teamID: number;
}

async function fetchEventData() {
  try {
    const q = collection(db, "teams");
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data() as TeamScoutingData);
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

export default async function Page() {
  const TeamData = await fetchEventData()
  .then(response => response[0]);
  console.log(TeamData);
  return (
    <div className="p-4 grid grid-row place-content-center">
      <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
      <h2 className="text-center text-xl p-3">Team {TeamData.teamID}</h2>
    </div>
  );
}
