export const dynamic = 'force-dynamic';
export const revalidate = 0;
import TeamChooserForm from "./teamChooserForm";
import { getCachedTeams } from "@/app/scripts/main"

type Team = {
  team_number: number,
  team_name: string
};


export default async function Page() {
  const eventTeams = await getCachedTeams()
    .then(response => {
      return response.sort((a: Team, b: Team) => a.team_number - b.team_number).map((team: Team) => {
        return {
          team_number: team.team_number,
          nickname: team.team_name
        }
      });
    });

  return (
    <div className="p-4 grid grid-row place-content-center">
      <h1 className="text-center text-3xl p-3">Pit Scouting</h1>
      <h2 className="text-center text-xl p-3">Select a Team</h2>

      <TeamChooserForm eventTeams={eventTeams} />
    </div>
  );
}
