import firebase from "firebase/compat/app";
import { db } from "@/app/components/firebase";
import { doc, getDoc, collection, getFirestore, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import { Match } from "@/app/utils/interfaces";
import { COMP_ID } from "../components/constants";


export async function getCachedEventMatches(): Promise<Match[]> {
  try {
    const eventsRef = doc(db, 'events', COMP_ID);
    const eventSnapshot = await getDoc(eventsRef);

    if (!eventSnapshot.exists()) {
      return [];
    }

    const eventData = eventSnapshot.data();
    const matchesRaw = eventData.matches;

    return matchesRaw.filter((match: Match) => match.comp_level === 'qm') // Only add qualification matches
        .sort((a: Match, b: Match) => a.match_number - b.match_number); // Sort matches by match number
  } catch(error) {
    console.error("Error fetching match data:", error);
    return [];
  }
}

interface Team {
    team_number: number;
    team_name: string;
}

export async function getCachedTeams(): Promise<Team[]> {
  try {
    const eventsRef = doc(db, 'events', COMP_ID);
    const eventSnapshot = await getDoc(eventsRef);

    if (!eventSnapshot.exists()) {
      return [];
    }

    const eventData = eventSnapshot.data();
    console.log(eventData.teams.map((team: Team) => `${team.team_number} - ${team.team_name}`))
    return eventData.teams;
  } catch(error) {
    console.error("Error fetching match data:", error);
    return [];
  }
}


export async function initialize() {
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_KEY,
        authDomain: "database-d991e.firebaseapp.com",
        projectId: "database-d991e",
        storageBucket: "database-d991e.firebasestorage.app",
        messagingSenderId: "495555471459",
        appId: "1:495555471459:web:0b978df69c23dce652f056"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const leaderboardRef = collection(db, "leaderboard_submissions");
    const q = query(leaderboardRef, orderBy("submissionCount", "desc"), limit(5));
    const leaderboardList = document.getElementById("leaderboardList");
    onSnapshot(q,(querySnapshot) => {
        leaderboardList!.innerHTML = '';
        if (querySnapshot.empty) {
            leaderboardList!.innerHTML = '<li>No submissions yet!</li>';
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const listItem = document.createElement('li');
            if (data.submissionCount == 1) {
                listItem.textContent = `${data.name}: ${data.submissionCount} match`;
            } else {
                listItem.textContent = `${data.name}: ${data.submissionCount} matches`;
            }
            leaderboardList!.appendChild(listItem);
        });
    }, (error) => {
        console.error("Error fetching leaderboard:", error);
        leaderboardList!.innerHTML = '<li>Error loading leaderboard.</li>';
    });
}
