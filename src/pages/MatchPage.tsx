import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getMatchById } from '../data/matches';
import { getTeamById } from '../data/teams';
import MapCard from '../components/MapCard';

export default function MatchPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | number>('overview');

  const match = matchId ? getMatchById(matchId) : undefined;
  const team1 = match ? getTeamById(match.team1Id) : undefined;
  const team2 = match ? getTeamById(match.team2Id) : undefined;

  if (!match || !team1 || !team2) {
    return (
      <div className="match-not-found">
        <p>Match not found.</p>
        <button onClick={() => navigate('/')}>← Back</button>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Overview' },
    ...match.maps.map((m) => ({ key: m.mapNumber, label: `Map ${m.mapNumber}` })),
  ];

  return (
    <div className="match-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Match Header */}
      <div className="match-header">
        <div className="match-header-team left">
          <img
            src={team1.logoUrl}
            alt={team1.name}
            className="match-header-logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="match-header-team-info">
            <span className="match-header-team-name">{team1.name}</span>
            <span
              className="match-header-team-score"
              style={{ color: team1.primaryColor }}
            >
              {match.scoreTeam1}
            </span>
          </div>
        </div>

        <div className="match-header-center">
          <div className="match-header-scoreline">
            <span style={{ color: team1.primaryColor }}>{match.scoreTeam1}</span>
            <span className="match-header-dash">–</span>
            <span style={{ color: team2.primaryColor }}>{match.scoreTeam2}</span>
          </div>
          <span className="match-header-event">{match.event}</span>
          <span className="match-header-stage">{match.stage}</span>
          <span className={`match-game-tag ${match.game.toLowerCase()}`}>
            {match.game}
          </span>
          <span className="match-header-date">
            {new Date(match.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <div className="match-header-team right">
          <div className="match-header-team-info align-right">
            <span className="match-header-team-name">{team2.name}</span>
            <span
              className="match-header-team-score"
              style={{ color: team2.primaryColor }}
            >
              {match.scoreTeam2}
            </span>
          </div>
          <img
            src={team2.logoUrl}
            alt={team2.name}
            className="match-header-logo"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="match-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`match-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as 'overview' | number)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' ? (
        <div className="maps-grid">
          {match.maps.map((map) => (
            <MapCard
              key={map.mapNumber}
              map={map}
              team1={team1}
              team2={team2}
            />
          ))}
        </div>
      ) : (
        <div className="map-detail">
          {match.maps
            .filter((m) => m.mapNumber === activeTab)
            .map((map) => (
              <MapCard
                key={map.mapNumber}
                map={map}
                team1={team1}
                team2={team2}
                detailed
              />
            ))}
        </div>
      )}

    </div>
  );
}