import { useNavigate } from 'react-router-dom';
import type { Match, Team } from '../types';

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

  const getTeamScore = (match: Match, team: Team) => {
    return match.team1Id === team.id ? match.scoreTeam1 : match.scoreTeam2;
  };

  const didTeamWin = (match: Match, team: Team) => {
    return (match.winner === 'team1' && match.team1Id === team.id) ||
           (match.winner === 'team2' && match.team2Id === team.id);
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
        const t1Won = didTeamWin(match, team1);
        const winner = t1Won ? team1 : team2;
        const t1Score = getTeamScore(match, team1);
        const t2Score = getTeamScore(match, team2);

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
              <span
                className="match-team-abbr"
                style={{ color: team1.primaryColor }}
              >
                {team1.abbreviation}
              </span>
              <span className={`match-scoreline ${t1Won ? 'win' : 'loss'}`}>
                {t1Score}
              </span>
              <span className="match-score-dash">–</span>
              <span className={`match-scoreline ${!t1Won ? 'win' : 'loss'}`}>
                {t2Score}
              </span>
              <span
                className="match-team-abbr"
                style={{ color: team2.primaryColor }}
              >
                {team2.abbreviation}
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