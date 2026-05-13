import type { Team } from '../types';
import { getLinkedTeamId } from '../data/matches';
import { getTeamById } from '../data/teams';

type SeasonFilter = 'all' | 2025 | 2026;

interface Props {
  team1: Team;
  team2: Team;
  team1Wins: number;
  team2Wins: number;
  totalMatches: number;
  seasonFilter: SeasonFilter;
}

// Returns the team that actually represents this franchise for the given season.
// e.g. ATL selected + BO7 filter → returns FZV
function effectiveTeam(team: Team, linked: Team | undefined, season: SeasonFilter): Team {
  if (!linked || season === 'all') return team;
  if (team.seasons.includes(season as 2025 | 2026)) return team;
  if (linked.seasons.includes(season as 2025 | 2026)) return linked;
  return team;
}

export default function H2HBar({ team1, team2, team1Wins, team2Wins, totalMatches, seasonFilter }: Props) {
  const team1Pct = totalMatches === 0 ? 50 : (team1Wins / totalMatches) * 100;
  const team2Pct = totalMatches === 0 ? 50 : (team2Wins / totalMatches) * 100;

  const linked1 = getTeamById(getLinkedTeamId(team1.id) ?? '');
  const linked2 = getTeamById(getLinkedTeamId(team2.id) ?? '');

  const eff1 = effectiveTeam(team1, linked1, seasonFilter);
  const eff2 = effectiveTeam(team2, linked2, seasonFilter);

  // For "all seasons" with a rebranded team, split the bar 50/50
  const bar1 = (seasonFilter === 'all' && linked1)
    ? `linear-gradient(to right, ${team1.primaryColor} 50%, ${linked1.primaryColor} 50%)`
    : eff1.primaryColor;

  const bar2 = (seasonFilter === 'all' && linked2)
    ? `linear-gradient(to right, ${team2.primaryColor} 50%, ${linked2.primaryColor} 50%)`
    : eff2.primaryColor;

  // Name: show "Old / New" for all seasons, otherwise show the effective team's name
  const name1 = (seasonFilter === 'all' && linked1) ? `${team1.name} / ${linked1.name}` : eff1.name;
  const name2 = (seasonFilter === 'all' && linked2) ? `${team2.name} / ${linked2.name}` : eff2.name;

  return (
    <div className="h2h-bar">

      {/* Team Names + Win Counts */}
      <div className="h2h-teams">
        <div className="h2h-team left">
          <img
            src={eff1.logoUrl}
            alt={eff1.name}
            className="h2h-logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="h2h-team-info">
            <span className="h2h-team-name">{name1}</span>
            <span className="h2h-wins" style={{ color: eff1.primaryColor }}>
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
            <span className="h2h-team-name">{name2}</span>
            <span className="h2h-wins" style={{ color: eff2.primaryColor }}>
              {team2Wins}
            </span>
            <span className="h2h-wins-label">wins</span>
          </div>
          <img
            src={eff2.logoUrl}
            alt={eff2.name}
            className="h2h-logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h2h-progress">
        <div
          className="h2h-progress-fill left"
          style={{ width: `${team1Pct}%`, background: bar1 }}
        />
        <div
          className="h2h-progress-fill right"
          style={{ width: `${team2Pct}%`, background: bar2 }}
        />
      </div>

      {/* Win percentages */}
      <div className="h2h-pct-row">
        <span style={{ color: eff1.primaryColor }}>
          {totalMatches === 0 ? '—' : `${Math.round(team1Pct)}%`}
        </span>
        <span style={{ color: eff2.primaryColor }}>
          {totalMatches === 0 ? '—' : `${Math.round(team2Pct)}%`}
        </span>
      </div>

    </div>
  );
}
