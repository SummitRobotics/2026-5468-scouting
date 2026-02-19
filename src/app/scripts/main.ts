import firebase from "firebase/compat/app";
import { collection, getFirestore, query, orderBy, limit, onSnapshot } from "firebase/firestore"

const apiKey = 'zu21V7xO4Yu9ny1QVq7HsrYIAEG0p015yi747MxvjUHw9Hk7de60VPxIRBA0gYRN';
export default function initialize(eventKey: string) {
    console.log("h");

    const firebaseConfig = {
        apiKey: "AIzaSyApl7KffIOEn1ZL20lFO5kSiuFfzhiZ_-Q",
        authDomain: "leaderboard-66713.firebaseapp.com",
        projectId: "leaderboard-66713",
        storageBucket: "leaderboard-66713.firebasestorage.app",
        messagingSenderId: "1050366017824",
        appId: "1:1050366017824:web:b206a00752fd289e97d745",
        measurementId: "G-N33Y47YXEQ"
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
