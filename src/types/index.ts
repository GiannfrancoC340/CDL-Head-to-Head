export interface Team {
    id: string;
    name: string;
    abbreviation: string;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
    seasons: (2025 | 2026)[];
  }
  
  export type MapMode = 'Hardpoint' | 'Search & Destroy' | 'Control' | 'Overload';
  
  export interface MapResult {
    mapNumber: number;
    mode: MapMode;
    mapName: string;
    scoreTeam1: number;
    scoreTeam2: number;
    winner: 'team1' | 'team2';
  }
  
  export interface Match {
    id: string;
    date: string;
    game: 'BO6' | 'BO7';
    team1Id: string;
    team2Id: string;
    scoreTeam1: number;
    scoreTeam2: number;
    winner: 'team1' | 'team2';
    event: string;
    stage: string;
    season: 2025 | 2026;
    maps: MapResult[];
  }
  
  export interface H2HRecord {
    team1Wins: number;
    team2Wins: number;
    totalMatches: number;
    matches: Match[];
  }