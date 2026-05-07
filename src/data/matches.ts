import type { Match } from '../types';

export const matches: Match[] = [

  // --- BO6 2025 SEASON ---

  {
    id: 'bo6-major1-optic-atl',
    date: '2025-02-09',
    game: 'BO6',
    season: 2025,
    event: 'Major 1',
    stage: 'Winners Round 2',
    team1Id: 'opt',
    team2Id: 'atl',
    scoreTeam1: 3,
    scoreTeam2: 1,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 180, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 6, scoreTeam2: 4, winner: 'team1' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 2, scoreTeam2: 3, winner: 'team2' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 250, scoreTeam2: 190, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major1-lat-mia',
    date: '2025-02-08',
    game: 'BO6',
    season: 2025,
    event: 'Major 1',
    stage: 'Winners Round 1',
    team1Id: 'lat',
    team2Id: 'mia',
    scoreTeam1: 3,
    scoreTeam2: 0,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 130, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 6, scoreTeam2: 2, winner: 'team1' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 3, scoreTeam2: 1, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major1-atl-mia',
    date: '2025-02-09',
    game: 'BO6',
    season: 2025,
    event: 'Major 1',
    stage: 'Losers Round 2',
    team1Id: 'atl',
    team2Id: 'mia',
    scoreTeam1: 3,
    scoreTeam2: 2,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 250, scoreTeam2: 220, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 4, scoreTeam2: 6, winner: 'team2' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 2, scoreTeam2: 3, winner: 'team2' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 200, winner: 'team1' },
      { mapNumber: 5, mode: 'Search & Destroy', mapName: 'Rewind', scoreTeam1: 6, scoreTeam2: 4, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major1-optic-lat-wf',
    date: '2025-02-09',
    game: 'BO6',
    season: 2025,
    event: 'Major 1',
    stage: 'Winners Final',
    team1Id: 'opt',
    team2Id: 'lat',
    scoreTeam1: 3,
    scoreTeam2: 2,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 230, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 3, scoreTeam2: 6, winner: 'team2' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 3, scoreTeam2: 2, winner: 'team1' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 180, scoreTeam2: 250, winner: 'team2' },
      { mapNumber: 5, mode: 'Search & Destroy', mapName: 'Rewind', scoreTeam1: 6, scoreTeam2: 4, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major1-lat-atl-lf',
    date: '2025-02-10',
    game: 'BO6',
    season: 2025,
    event: 'Major 1',
    stage: 'Losers Final',
    team1Id: 'lat',
    team2Id: 'atl',
    scoreTeam1: 3,
    scoreTeam2: 1,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 250, scoreTeam2: 200, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 4, scoreTeam2: 6, winner: 'team2' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 3, scoreTeam2: 1, winner: 'team1' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 150, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major1-grand-final',
    date: '2025-02-10',
    game: 'BO6',
    season: 2025,
    event: 'Major 1',
    stage: 'Grand Final',
    team1Id: 'opt',
    team2Id: 'lat',
    scoreTeam1: 3,
    scoreTeam2: 0,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 150, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 6, scoreTeam2: 3, winner: 'team1' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 3, scoreTeam2: 1, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major2-optic-lat',
    date: '2025-04-06',
    game: 'BO6',
    season: 2025,
    event: 'Major 2',
    stage: 'Winners Round 2',
    team1Id: 'opt',
    team2Id: 'lat',
    scoreTeam1: 3,
    scoreTeam2: 2,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 250, scoreTeam2: 210, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Rewind', scoreTeam1: 4, scoreTeam2: 6, winner: 'team2' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 2, scoreTeam2: 3, winner: 'team2' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 180, winner: 'team1' },
      { mapNumber: 5, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 6, scoreTeam2: 3, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-major2-atl-mia',
    date: '2025-04-05',
    game: 'BO6',
    season: 2025,
    event: 'Major 2',
    stage: 'Losers Round 2',
    team1Id: 'atl',
    team2Id: 'mia',
    scoreTeam1: 3,
    scoreTeam2: 1,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 190, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 3, scoreTeam2: 6, winner: 'team2' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 3, scoreTeam2: 2, winner: 'team1' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 250, scoreTeam2: 170, winner: 'team1' },
    ],
  },

  {
    id: 'bo6-champs-optic-lat',
    date: '2025-08-24',
    game: 'BO6',
    season: 2025,
    event: 'Champs',
    stage: 'Winners Final',
    team1Id: 'opt',
    team2Id: 'lat',
    scoreTeam1: 3,
    scoreTeam2: 1,
    winner: 'team1',
    maps: [
      { mapNumber: 1, mode: 'Hardpoint', mapName: 'Hacienda', scoreTeam1: 250, scoreTeam2: 200, winner: 'team1' },
      { mapNumber: 2, mode: 'Search & Destroy', mapName: 'Vault', scoreTeam1: 3, scoreTeam2: 6, winner: 'team2' },
      { mapNumber: 3, mode: 'Control', mapName: 'Hacienda', scoreTeam1: 3, scoreTeam2: 1, winner: 'team1' },
      { mapNumber: 4, mode: 'Hardpoint', mapName: 'Karst', scoreTeam1: 250, scoreTeam2: 180, winner: 'team1' },
    ],
  },

];

export const getMatchesByTeams = (team1Id: string, team2Id: string): Match[] =>
  matches.filter(
    (m) =>
      (m.team1Id === team1Id && m.team2Id === team2Id) ||
      (m.team1Id === team2Id && m.team2Id === team1Id)
  );

export const getMatchById = (id: string): Match | undefined =>
  matches.find((m) => m.id === id);