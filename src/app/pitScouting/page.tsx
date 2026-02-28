import { COMP_ID, API_KEY } from "../components/constants";
import TeamChooserForm from "./teamChooserForm";

type Team = {
  team_number: number,
  nickname: string
};

export async function fetchEventData() {
    return await fetch(`https://www.thebluealliance.com/api/v3/event/${COMP_ID}/teams/simple`, {
        headers: {
            'X-TBA-Auth-Key': API_KEY
        }
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error fetching teams:', error);
    });
}

export default async function Page() {
  let eventTeams;

  if(COMP_ID === 'practice') {
    eventTeams = [
      {
        team_number: '5468-a',
        nickname: '5468-a'
      },
      {
        team_number: '5468-b',
        nickname: '5468-b'
      },
      {
        team_number: '5468-c',
        nickname: '5468-c'
      },
      {
        team_number: '5468-d',
        nickname: '5468-d'
      },
      {
        team_number: '5468-e',
        nickname: '5468-e'
      },
      {
        team_number: '5468-f',
        nickname: '5468-f'
      },
    ]
  } else {
    eventTeams = await fetchEventData()
    .then(response => {
      console.log(response)
      return response.sort((a: Team, b: Team) => a.team_number - b.team_number).map((team: Team) => {
        return {
          team_number: team.team_number,
          nickname: team.nickname
        }
      });
    });
  }

  return (
    <div className="p-4 grid grid-row place-content-center">
      <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
      <h2 className="text-center text-xl p-3">Select a Team</h2>

      <TeamChooserForm eventTeams={eventTeams} />
    </div>
  );
}
