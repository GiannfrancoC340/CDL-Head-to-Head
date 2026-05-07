import type { Team } from '../types';

export const teams: Team[] = [

  // --- UNCHANGED ACROSS BOTH SEASONS ---
  {
    id: 'bos',
    name: 'Boston Breach',
    abbreviation: 'BOS',
    primaryColor: '#00A859',
    secondaryColor: '#FFFFFF',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Boston_Breach_logo.png/200px-Boston_Breach_logo.png',
    seasons: [2025, 2026],
  },
  {
    id: 'car',
    name: 'Carolina Royal Ravens',
    abbreviation: 'CAR',
    primaryColor: '#B8952A',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Carolina_Royal_Ravens_logo.png/200px-Carolina_Royal_Ravens_logo.png',
    seasons: [2025, 2026],
  },
  {
    id: 'c9ny',
    name: 'Cloud9 New York',
    abbreviation: 'C9NY',
    primaryColor: '#0090FF',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Cloud9_logo.png/200px-Cloud9_logo.png',
    seasons: [2025, 2026],
  },
  {
    id: 'lat',
    name: 'Los Angeles Thieves',
    abbreviation: 'LAT',
    primaryColor: '#FF0000',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Los_Angeles_Thieves_logo.png/200px-Los_Angeles_Thieves_logo.png',
    seasons: [2025, 2026],
  },
  {
    id: 'mia',
    name: 'Miami Heretics',
    abbreviation: 'MIA',
    primaryColor: '#00B140',
    secondaryColor: '#FF6B00',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Miami_Heretics_logo.png/200px-Miami_Heretics_logo.png',
    seasons: [2025, 2026],
  },
  {
    id: 'opt',
    name: 'OpTic Texas',
    abbreviation: 'OPT',
    primaryColor: '#92C83E',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/OpTic_Texas_logo.png/200px-OpTic_Texas_logo.png',
    seasons: [2025, 2026],
  },
  {
    id: 'van',
    name: 'Vancouver Surge',
    abbreviation: 'VAN',
    primaryColor: '#00B2A9',
    secondaryColor: '#FF6B00',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Seattle_Surge_logo.png/200px-Seattle_Surge_logo.png',
    seasons: [2025, 2026],
  },

  // --- BO6 ONLY (2025) ---
  {
    id: 'atl',
    name: 'Atlanta FaZe',
    abbreviation: 'ATL',
    primaryColor: '#FF0000',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Atlanta_FaZe_logo.png/200px-Atlanta_FaZe_logo.png',
    seasons: [2025],
  },
  {
    id: 'lvf',
    name: 'Las Vegas Falcons',
    abbreviation: 'LVF',
    primaryColor: '#B8952A',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Las_Vegas_Legion_logo.png/200px-Las_Vegas_Legion_logo.png',
    seasons: [2025],
  },
  {
    id: 'lagm',
    name: 'Los Angeles Guerrillas M8',
    abbreviation: 'M8',
    primaryColor: '#FF6B00',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Los_Angeles_Guerrillas_logo.png/200px-Los_Angeles_Guerrillas_logo.png',
    seasons: [2025],
  },
  {
    id: 'min25',
    name: 'Minnesota RØKKR',
    abbreviation: 'MIN',
    primaryColor: '#2B0C4E',
    secondaryColor: '#FF6B00',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Minnesota_RØKKR_logo.png/200px-Minnesota_RØKKR_logo.png',
    seasons: [2025],
  },
  {
    id: 'tor25',
    name: 'Toronto Ultra',
    abbreviation: 'TOR',
    primaryColor: '#FF0000',
    secondaryColor: '#FFFFFF',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Toronto_Ultra_logo.png/200px-Toronto_Ultra_logo.png',
    seasons: [2025],
  },

  // --- BO7 ONLY (2026) ---
  {
    id: 'fzv',
    name: 'FaZe Vegas',
    abbreviation: 'FZV',
    primaryColor: '#FF0000',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Atlanta_FaZe_logo.png/200px-Atlanta_FaZe_logo.png',
    seasons: [2026],
  },
  {
    id: 'ryd',
    name: 'Riyadh Falcons',
    abbreviation: 'RYD',
    primaryColor: '#00843D',
    secondaryColor: '#FFFFFF',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Las_Vegas_Legion_logo.png/200px-Las_Vegas_Legion_logo.png',
    seasons: [2026],
  },
  {
    id: 'par',
    name: 'Paris Gentlemates',
    abbreviation: 'PAR',
    primaryColor: '#6B2D8B',
    secondaryColor: '#FFFFFF',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Los_Angeles_Guerrillas_logo.png/200px-Los_Angeles_Guerrillas_logo.png',
    seasons: [2026],
  },
  {
    id: 'g2mn',
    name: 'G2 Minnesota',
    abbreviation: 'G2MN',
    primaryColor: '#2B0C4E',
    secondaryColor: '#FF0028',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Minnesota_RØKKR_logo.png/200px-Minnesota_RØKKR_logo.png',
    seasons: [2026],
  },
  {
    id: 'tkoi',
    name: 'Toronto KOI',
    abbreviation: 'TKOI',
    primaryColor: '#E91E8C',
    secondaryColor: '#000000',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Toronto_Ultra_logo.png/200px-Toronto_Ultra_logo.png',
    seasons: [2026],
  },
];

export const getTeamById = (id: string): Team | undefined =>
  teams.find((t) => t.id === id);

export const getTeamsBySeason = (season: 2025 | 2026): Team[] =>
  teams.filter((t) => t.seasons.includes(season));