import firebase from "firebase/compat/app";
import { collection, getFirestore, query, orderBy, limit, onSnapshot } from "firebase/firestore"

const apiKey = 'zu21V7xO4Yu9ny1QVq7HsrYIAEG0p015yi747MxvjUHw9Hk7de60VPxIRBA0gYRN';
export default function initialize(eventKey: string) {
    console.log("h");

    const firebaseConfig = {
        apiKey: "AIzaSyBBdLNFW4cBj4yrt6CXLiAk4pJQ7hw218s",
        authDomain: "database-d991e.firebaseapp.com",
        projectId: "database-d991e",
        storageBucket: "database-d991e.firebasestorage.app",
        messagingSenderId: "495555471459",
        appId: "1:495555471459:web:0b978df69c23dce652f056"
    };

    const app = firebase.initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const matchNumSelect = document.getElementById('matchNum');

    fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches`, {
        headers: {
            'X-TBA-Auth-Key': apiKey
        }
    })
    .then(response => response.json())
    .then(matches => {
        console.log(matches);
        (matches as Array<Record<string, any>>)
            .filter(match => match.comp_level === 'qm') // Only add qualification matches
            .sort((a, b) => a.match_number - b.match_number) // Sort matches by match number
            .forEach(match => {
                const option = document.createElement('option');
                option.value = match.match_number;
                option.textContent = match.match_number;
                matchNumSelect!.appendChild(option);
            });
    })
    .catch(error => {
        console.error('Error fetching matches:', error);
    });


    const leaderboardRef = collection(db, "leaderboard_submissions");
    const q = query(leaderboardRef, orderBy("submissionCount", "desc"), limit(3));
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
