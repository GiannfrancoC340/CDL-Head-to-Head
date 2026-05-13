import { useState } from 'react';
import type { Team } from '../types';
import { teams } from '../data/teams';
import { getMatchesByTeams, isSameFranchise, getLinkedTeamId } from '../data/matches';
import MatchList from '../components/MatchList';
import H2HBar from '../components/H2HBar';

type SeasonFilter = 'all' | 2025 | 2026;

export default function HomePage() {
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  const [selectingFor, setSelectingFor] = useState<1 | 2>(1);
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all');

  const filteredTeams = seasonFilter === 'all'
    ? teams
    : teams.filter((t) => t.seasons.includes(seasonFilter as 2025 | 2026));

  const matches = team1 && team2
    ? getMatchesByTeams(team1.id, team2.id).filter(
        (m) => seasonFilter === 'all' || m.season === seasonFilter
      )
    : [];

  const t1Ids = team1 ? [team1.id, getLinkedTeamId(team1.id)].filter(Boolean) as string[] : [];

  const team1Wins = matches.filter(
    (m) => (m.winner === 'team1' && t1Ids.includes(m.team1Id)) ||
            (m.winner === 'team2' && t1Ids.includes(m.team2Id))
  ).length;

  const team2Wins = matches.length - team1Wins;

  const sameFranchise = !!(team1 && team2 && isSameFranchise(team1.id, team2.id));

  const handleClear = () => {
    setTeam1(null);
    setTeam2(null);
    setSelectingFor(1);
  };

  const handleTeamClick = (team: Team) => {
    if (selectingFor === 1) {
      if (team.id === team2?.id) return;
      setTeam1(team);
      setSelectingFor(2);
    } else {
      if (team.id === team1?.id) return;
      setTeam2(team);
    }
  };

  return (
    <div className="home">

      {/* Season Filter */}
      <div className="season-filter">
        {(['all', 2025, 2026] as SeasonFilter[]).map((s) => (
          <button
            key={s}
            className={`filter-btn ${seasonFilter === s ? 'active' : ''}`}
            onClick={() => setSeasonFilter(s)}
          >
            {s === 'all' ? 'All Seasons' : s === 2025 ? 'BO6 2025' : 'BO7 2026'}
          </button>
        ))}
      </div>

      {/* Team Selector */}
      <div className="selector-header">
        <div
          className={`selector-slot ${selectingFor === 1 ? 'selecting' : ''} ${team1 ? 'filled' : ''}`}
          onClick={() => setSelectingFor(1)}
          style={{ borderColor: team1 ? team1.primaryColor : undefined }}
        >
          {team1 ? (
            <>
              <img
                src={team1.logoUrl}
                alt={team1.name}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span>{team1.name}</span>
            </>
          ) : (
            <span className="slot-placeholder">Select Team 1</span>
          )}
        </div>

        <div className="vs-badge">VS</div>

        <div
          className={`selector-slot ${selectingFor === 2 ? 'selecting' : ''} ${team2 ? 'filled' : ''}`}
          onClick={() => setSelectingFor(2)}
          style={{ borderColor: team2 ? team2.primaryColor : undefined }}
        >
          {team2 ? (
            <>
              <img
                src={team2.logoUrl}
                alt={team2.name}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span>{team2.name}</span>
            </>
          ) : (
            <span className="slot-placeholder">Select Team 2</span>
          )}
        </div>
      </div>

      {/* Clear button */}
      {(team1 || team2) && (
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      )}

      {/* Selecting indicator */}
      <p className="selecting-hint">
        {selectingFor === 1 ? 'Selecting Team 1 — pick from the grid below' : 'Selecting Team 2 — pick from the grid below'}
      </p>

      {/* Team Grid */}
      <div className="team-grid">
        {filteredTeams.map((team) => {
          const isSelected = team.id === team1?.id || team.id === team2?.id;
          const isDisabled =
            (selectingFor === 1 && team.id === team2?.id) ||
            (selectingFor === 2 && team.id === team1?.id);

          return (
            <button
              key={team.id}
              className={`team-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => handleTeamClick(team)}
              disabled={isDisabled}
              style={isSelected ? { borderColor: team.primaryColor, backgroundColor: `${team.primaryColor}22` } : {}}
            >
              <img
                src={team.logoUrl}
                alt={team.name}
                className="team-card-logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="team-card-abbr">{team.abbreviation}</span>
            </button>
          );
        })}
      </div>

      {/* H2H Results */}
      {team1 && team2 && (
        <div className="h2h-section">
          {sameFranchise ? (
            <div className="same-franchise-notice">
              {(() => {
                const bo6Team = team1.seasons.includes(2025) ? team1 : team2;
                const bo7Team = team1.seasons.includes(2025) ? team2 : team1;
                return <><span>{bo6Team.name}</span> rebranded to <span>{bo7Team.name}</span> — same franchise, different season.</>;
              })()}
            </div>
          ) : (
            <>
              <H2HBar
                team1={team1}
                team2={team2}
                team1Wins={team1Wins}
                team2Wins={team2Wins}
                totalMatches={matches.length}
                seasonFilter={seasonFilter}
              />
              <MatchList
                matches={matches}
                team1={team1}
                team2={team2}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}