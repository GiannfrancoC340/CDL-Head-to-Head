import { useNavigate } from 'react-router-dom';
import type { Match, Team } from '../types';
import { getLinkedTeamId } from '../data/matches';
import { teams } from '../data/teams';

interface Props {
  matches: Match[];
  team1: Team;
  team2: Team;
}

export default function MatchList({ matches, team1, team2 }: Props) {
  const navigate = useNavigate();

  if (matches.length === 0) {
    return (
      <div className="match-list-empty">
        <span>No matches found between these two teams</span>
      </div>
    );
  }

  const sorted = [...matches].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Include rebranded team IDs so cross-season matches resolve correctly
  const t1Ids = [team1.id, getLinkedTeamId(team1.id)].filter(Boolean) as string[];
  const t2Ids = [team2.id, getLinkedTeamId(team2.id)].filter(Boolean) as string[];

  const getTeamScore = (match: Match, teamIds: string[]) => {
    if (teamIds.includes(match.team1Id)) return match.scoreTeam1;
    if (teamIds.includes(match.team2Id)) return match.scoreTeam2;
    return 0;
  };

  const didTeamWin = (match: Match, teamIds: string[]) => {
    return (match.winner === 'team1' && teamIds.includes(match.team1Id)) ||
           (match.winner === 'team2' && teamIds.includes(match.team2Id));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="match-list">
      <h2 className="match-list-title">Match History</h2>
      {sorted.map((match) => {
        // Resolve the actual team objects that played in this specific match
        const t1Won = didTeamWin(match, t1Ids);
        const t1Score = getTeamScore(match, t1Ids);
        const t2Score = getTeamScore(match, t2Ids);

        // Use the team that actually played (e.g. FZV instead of ATL for BO7 matches)
        const actualLeft  = teams.find(t => t.id === (t1Ids.includes(match.team1Id) ? match.team1Id : match.team2Id)) ?? team1;
        const actualRight = teams.find(t => t.id === (t1Ids.includes(match.team1Id) ? match.team2Id : match.team1Id)) ?? team2;
        const winner = t1Won ? actualLeft : actualRight;

        return (
          <div
            key={match.id}
            className="match-row"
            onClick={() => navigate(`/match/${match.id}`)}
          >
            {/* Date */}
            <span className="match-date">{formatDate(match.date)}</span>

            {/* Event + Stage */}
            <div className="match-event">
              <span className="match-event-name">{match.event}</span>
              <span className="match-event-stage">{match.stage}</span>
            </div>

            {/* Game tag */}
            <span className={`match-game-tag ${match.game.toLowerCase()}`}>
              {match.game}
            </span>

            {/* Score */}
            <div className="match-score">
              <span className="match-team-abbr" style={{ color: actualLeft.primaryColor }}>
                {actualLeft.abbreviation}
              </span>
              <span className={`match-scoreline ${t1Won ? 'win' : 'loss'}`}>
                {t1Score}
              </span>
              <span className="match-score-dash">–</span>
              <span className={`match-scoreline ${!t1Won ? 'win' : 'loss'}`}>
                {t2Score}
              </span>
              <span className="match-team-abbr" style={{ color: actualRight.primaryColor }}>
                {actualRight.abbreviation}
              </span>
            </div>

            {/* Winner tag */}
            <div
              className="match-winner-tag"
              style={{
                color: winner.primaryColor,
                borderColor: `${winner.primaryColor}44`,
                backgroundColor: `${winner.primaryColor}11`,
              }}
            >
              {winner.abbreviation} WIN
            </div>

            {/* Arrow */}
            <span className="match-arrow">→</span>
          </div>
        );
      })}
    </div>
  );
}