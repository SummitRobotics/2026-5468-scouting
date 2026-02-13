import firebase from "firebase/compat/app";
import { addDoc, doc, getFirestore, setDoc, collection } from "firebase/firestore"

export default function initialize() {
    const urlParams = new URLSearchParams(window.location.search);
    const scoutName = urlParams.get('name');
    const scoutingSeat = urlParams.get('seat');
    const theme = urlParams.get('theme')

    if (scoutingSeat) {
        console.log(`Scouting Seat: ${scoutingSeat}`);
    }
}

export function main() {
    console.log('working, v1 - 1st 2026 Build');
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

    const submitButton = document.getElementById("submit");
    const pleaseWaitMessage = document.createElement("div");
    pleaseWaitMessage.style.display = "none";
    pleaseWaitMessage.style.color = "blue";
    pleaseWaitMessage.style.textAlign = "center";
    submitButton!.parentNode!.insertBefore(pleaseWaitMessage, submitButton);




    // Read URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const scoutName = urlParams.get('name');
    const matchNum = urlParams.get('match');
    const teamNumber = urlParams.get('team');
    const scoutingSeat = urlParams.get('seat');

    submitButton!.addEventListener("click", (event) => {
        event.preventDefault();

        const rankPoints = (document.getElementById("rankPoints")! as HTMLInputElement).value;
        console.log(`Rank Points: ${rankPoints}`);

        if (rankPoints === "0") {
            console.log("Rank Points are zero. Showing confirmation popup.");
            showConfirmationPopup(() => {

                handleFormSubmission();

            });
            return;
        }

        handleFormSubmission();

    });

    function handleFormSubmission() {

        (submitButton! as HTMLButtonElement).disabled = true;

        pleaseWaitMessage.textContent = getRandomMessage();
        pleaseWaitMessage.style.display = "block";
        console.log("Submit button clicked!");

        const driverSkill = document.querySelector('input[name="skill"]:checked');
        const defense = document.querySelector('input[name="defense"]:checked');
        const speed = document.querySelector('input[name="speed"]:checked');
        const robotOnField = document.querySelector('input[name="field"]:checked');
        const notes = (document.getElementById("notes")! as HTMLInputElement).value;
        const rankPoints = (document.getElementById("rankPoints")! as HTMLInputElement).value;

        // Generate current date and time
        const now = new Date();
        const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        const total = 0; // total point bs
        console.log(total);

        const assessments = [];
        document.querySelectorAll('input[name="assess"]:checked').forEach((checkbox) => {
            assessments.push(checkbox.id);
        });
        const defenseAssess = [];
        document.querySelectorAll('input[name="dSkill"]:checked').forEach((checkbox) => {
            defenseAssess.push(checkbox.id);
        });
        if (assessments.length === 0) {
            assessments.push("null");
        }
        if (defenseAssess.length === 0) {
            defenseAssess.push("null");
        }
        console.log(defenseAssess);

        incrementLeaderboard(scoutName!);

        const data = {
            eventID: "test",
            notes: "",
            on_field: true,
            rank_points:0,
            scout_name: "",
            start_position: "",
            teamID: 0,
            assesment: {
                died: false,
                fuel_spilled: false,
                stuck_bump: false,
                stuck_fuel: false,
                tipped: false
            },
            auto: {
                climb: false,
                climb_location: "",
                fuel_depot: false,
                fuel_neutral: false,
                fuel_outpost: false,
                fuelscore: 0,
                moved: false
            },
            teleop: {
                bump: false,
                defense: false,
                driver_skill: 0,
                fuelscore: 0,
                move_shoot: false,
                out_of_bounds: false,
                snowblow_alliance: false,
                snowblow_neutral1: false,
                snowblow_neutral2: false,
                speed: 1,
                trench: false
            },
            endgame: {
                climb_level: 0,
                climb_location: "",
                fuelscore: 0
            }
        };

        submit(data);
    }

    async function submit(data: {eventID: string; notes: string; on_field: boolean; rank_points: number; scout_name: string; start_position: string;teamID: number;assesment: { died: boolean; fuel_spilled: boolean; stuck_bump: boolean; stuck_fuel: boolean; tipped: boolean}; auto: { climb: boolean; climb_location: string; fuel_depot: boolean; fuel_neutral: boolean; fuel_outpost: boolean; fuelscore: number; moved: boolean }; teleop: { bump: boolean; defense: boolean; driver_skill: number; fuelscore: number; move_shoot: boolean; out_of_bounds: boolean; snowblow_alliance: boolean; snowblow_neutral1: boolean; snowblow_neutral2: boolean; speed: number; trench: boolean }; endgame: { climb_level: number; climb_location: string; fuelscore: number }}) {

        const sTitle = `${data.eventID}-${matchNum}-${teamNumber}`

        try{
            await setDoc(doc(db, "matches", sTitle), {
                data
            });
            console.log('Success:', data);
            window.location.assign(`/`);
        } catch(error){
            console.error('Error:', error);
            (submitButton! as HTMLButtonElement).disabled = false;
            pleaseWaitMessage.textContent = 'An error occurred. Please try again.';
            pleaseWaitMessage.style.color = 'red';
        }
    }

    function showConfirmationPopup(onConfirm: Function) {
        // Create the modal container
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";
        modal.className = "modal";

        // Create the modal content
        const modalContent = document.createElement("div");
        modalContent.style.backgroundColor = "rgb(24, 24, 24)";
        modalContent.style.padding = "20px";
        modalContent.style.borderRadius = "8px";
        modalContent.style.textAlign = "center";
        modalContent.style.boxShadow = "-8px 0px 8px rgba(24,24,24,0.2), 8px 0px 24px rgba(24,24,24,0.2), 0px 8px 8px rgba(24,24,24,0.2), 0px -8px 24px rgba(24,24,24,0.2)";
        modalContent.style.border = "2px solid #14c600";
        modalContent.className = "modalContent";

        // Add the message
        const message = document.createElement("p");
        message.textContent = "Ranking points are set to zero. Are you sure you want to submit?";
        message.style.color = "white";
        message.style.fontSize = "1.5em";
        message.style.marginBottom = "20px";
        modalContent.appendChild(message);


        const yesButton = document.createElement("button");
        yesButton.textContent = "Yes";
        yesButton.className = "Jbutton";
        yesButton.style.margin = "10px";
        yesButton.addEventListener("click", () => {
            modal.remove();
            onConfirm();
        });
        modalContent.appendChild(yesButton);


        const noButton = document.createElement("button");
        noButton.textContent = "No";
        noButton.className = "Jbutton";
        noButton.style.margin = "10px";
        noButton.addEventListener("click", () => {
            modal.remove(); // Remove the modal
            console.log("Submission canceled by the user.");
        });
        modalContent.appendChild(noButton);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);
    }

    function getRandomMessage() {
        const messages = [
            { text: "Please wait...", probability: 50.9999 },
            { text: "Submitting...", probability: 25 },
            { text: "\"HYDROGEN PEROXIDE!!!\" - quote Henry Carl Graff 10/31/25 at 3:28 PM", probability: 20 },
            { text: "Submitting?", probability: 4.5 },
            { text: "The cake is a lie...", probability: 0.5 },
            { text: "this message is a .0001% chance!", probability: 0.0001},
        ];
        const totalProbability = messages.reduce((sum, msg) => sum + msg.probability, 0);
        const random = Math.random() * totalProbability;
        let cumulative = 0;
        for (const message of messages) {
            cumulative += message.probability;
            if (random <= cumulative) {
                return message.text;
            }
        }
        return messages[0].text;
    }

    async function incrementLeaderboard(scoutName: string) {
        try {
            const nameDocRef = doc(db, "leaderboard_submissions", scoutName)

            await setDoc(nameDocRef,{
                name: scoutName,
                submissionCount: firebase.firestore.FieldValue.increment(1),
            }, { merge: true });

        } catch (error) {
            console.error("Error writing submission:", error);
        }
    }
}

