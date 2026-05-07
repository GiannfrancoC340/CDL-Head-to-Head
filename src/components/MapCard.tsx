import type { MapResult, Team } from '../types';

interface Props {
  map: MapResult;
  team1: Team;
  team2: Team;
  detailed?: boolean;
}

export default function MapCard({ map, team1, team2, detailed }: Props) {
  const team1Won = map.winner === 'team1';

  return (
    <div className={`map-card ${detailed ? 'detailed' : ''}`}>
      <div className="map-card-header">
        <span className="map-card-number">Map {map.mapNumber}</span>
        <span className="map-card-mode">{map.mode}</span>
        <span className="map-card-name">{map.mapName}</span>
      </div>

      <div className="map-card-scores">
        <div className={`map-card-team ${team1Won ? 'winner' : 'loser'}`}>
          <span
            className="map-card-abbr"
            style={{ color: team1.primaryColor }}
          >
            {team1.abbreviation}
          </span>
          <span className="map-card-score">{map.scoreTeam1}</span>
          {team1Won && <span className="map-card-w">W</span>}
        </div>

        <span className="map-card-vs">–</span>

        <div className={`map-card-team ${!team1Won ? 'winner' : 'loser'}`}>
          {!team1Won && <span className="map-card-w">W</span>}
          <span className="map-card-score">{map.scoreTeam2}</span>
          <span
            className="map-card-abbr"
            style={{ color: team2.primaryColor }}
          >
            {team2.abbreviation}
          </span>
        </div>
      </div>
    </div>
  );
}