import type { Match, Team } from '../types';

interface Props {
  matches: Match[];
  team1: Team;
  team2: Team;
}

export default function MatchList({ matches, team1, team2 }: Props) {
  return <div>Match List — {matches.length} matches between {team1.name} and {team2.name}</div>;
}