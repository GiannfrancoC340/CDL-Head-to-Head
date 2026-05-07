import type { Team } from '../types';

interface Props {
  team1: Team;
  team2: Team;
  team1Wins: number;
  team2Wins: number;
  totalMatches: number;
}

export default function H2HBar({ team1, team2, team1Wins, team2Wins, totalMatches }: Props) {
  const team1Pct = totalMatches === 0 ? 50 : (team1Wins / totalMatches) * 100;
  const team2Pct = totalMatches === 0 ? 50 : (team2Wins / totalMatches) * 100;

  return (
    <div className="h2h-bar">

      {/* Team Names + Win Counts */}
      <div className="h2h-teams">
        <div className="h2h-team left">
          <img
            src={team1.logoUrl}
            alt={team1.name}
            className="h2h-logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="h2h-team-info">
            <span className="h2h-team-name">{team1.name}</span>
            <span className="h2h-wins" style={{ color: team1.primaryColor }}>
              {team1Wins}
            </span>
            <span className="h2h-wins-label">wins</span>
          </div>
        </div>

        <div className="h2h-center">
          <span className="h2h-total">{totalMatches}</span>
          <span className="h2h-total-label">series played</span>
        </div>

        <div className="h2h-team right">
          <div className="h2h-team-info align-right">
            <span className="h2h-team-name">{team2.name}</span>
            <span className="h2h-wins" style={{ color: team2.primaryColor }}>
              {team2Wins}
            </span>
            <span className="h2h-wins-label">wins</span>
          </div>
          <img
            src={team2.logoUrl}
            alt={team2.name}
            className="h2h-logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h2h-progress">
        <div
          className="h2h-progress-fill left"
          style={{
            width: `${team1Pct}%`,
            backgroundColor: team1.primaryColor,
          }}
        />
        <div
          className="h2h-progress-fill right"
          style={{
            width: `${team2Pct}%`,
            backgroundColor: team2.primaryColor,
          }}
        />
      </div>

      {/* Win percentages */}
      <div className="h2h-pct-row">
        <span style={{ color: team1.primaryColor }}>
          {totalMatches === 0 ? '—' : `${Math.round(team1Pct)}%`}
        </span>
        <span style={{ color: team2.primaryColor }}>
          {totalMatches === 0 ? '—' : `${Math.round(team2Pct)}%`}
        </span>
      </div>

    </div>
  );
}