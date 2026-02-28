import firebase from "firebase/compat/app";
import { collection, getFirestore, query, orderBy, limit, onSnapshot } from "firebase/firestore"
import { COMP_ID } from "../components/constants";
const apiKey = 'zu21V7xO4Yu9ny1QVq7HsrYIAEG0p015yi747MxvjUHw9Hk7de60VPxIRBA0gYRN';
const practiceMatches = [
    {match_number: 1},
    {match_number: 2},
    {match_number: 3},
    {match_number: 4},
    {match_number: 5},
    {match_number: 6},
    {match_number: 7},
    {match_number: 8},
    {match_number: 9},
];

export default function initialize() {
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

    if(COMP_ID === 'practice') {
        practiceMatches.forEach(match => {
            const option = document.createElement('option');
            option.value = match.match_number.toString();
            option.textContent = match.match_number.toString();
            matchNumSelect!.appendChild(option);
        })
    }else{
        fetch(`https://www.thebluealliance.com/api/v3/event/${COMP_ID}/matches`, {
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
    }

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
