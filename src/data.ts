export interface Driver {
  id: string;
  name: string;
  shortName: string;
  isHuman: boolean;
  teamId: string;
  points: number;
  image: string;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  logo: string;
  carImage: string;
}

export interface SessionResult {
  pos: number;
  driverId: string;
  time?: string;
  gap?: string;
  laps?: number;
  points?: number;
  status?: string; // e.g., 'DNF'
}

export interface RaceWeekend {
  raceId: number;
  practice: SessionResult[];
  qualifying: SessionResult[];
  race: SessionResult[];
}

export const teams: Team[] = [
  { id: 'mercedes', name: 'Mercedes-AMG', color: '#00D2BE', logo: 'https://picsum.photos/seed/merc/100/100', carImage: 'https://picsum.photos/seed/car-merc/600/300' },
  { id: 'redbull', name: 'Red Bull Racing', color: '#0600EF', logo: 'https://picsum.photos/seed/rb/100/100', carImage: 'https://picsum.photos/seed/car-rb/600/300' },
  { id: 'ferrari', name: 'Scuderia Ferrari', color: '#DC0000', logo: 'https://picsum.photos/seed/fer/100/100', carImage: 'https://picsum.photos/seed/car-fer/600/300' },
  { id: 'mclaren', name: 'McLaren', color: '#FF8700', logo: 'https://picsum.photos/seed/mcl/100/100', carImage: 'https://picsum.photos/seed/car-mcl/600/300' },
  { id: 'aston', name: 'Aston Martin', color: '#006F62', logo: 'https://picsum.photos/seed/ast/100/100', carImage: 'https://picsum.photos/seed/car-ast/600/300' },
  { id: 'alpine', name: 'Alpine', color: '#0090FF', logo: 'https://picsum.photos/seed/alp/100/100', carImage: 'https://picsum.photos/seed/car-alp/600/300' },
  { id: 'williams', name: 'Williams', color: '#005AFF', logo: 'https://picsum.photos/seed/wil/100/100', carImage: 'https://picsum.photos/seed/car-wil/600/300' },
  { id: 'vcarb', name: 'VCARB', color: '#6692FF', logo: 'https://picsum.photos/seed/vcarb/100/100', carImage: 'https://picsum.photos/seed/car-vcarb/600/300' },
  { id: 'sauber', name: 'Kick Sauber', color: '#52E252', logo: 'https://picsum.photos/seed/sau/100/100', carImage: 'https://picsum.photos/seed/car-sau/600/300' },
  { id: 'haas', name: 'Haas F1 Team', color: '#FFFFFF', logo: 'https://picsum.photos/seed/haas/100/100', carImage: 'https://picsum.photos/seed/car-haas/600/300' },
  { id: 'porsche', name: 'Porsche Penske', color: '#D5001C', logo: 'https://picsum.photos/seed/por/100/100', carImage: 'https://picsum.photos/seed/car-por/600/300' },
];

export const drivers: Driver[] = [
  { id: 'd1', name: 'Gonçalo Queirós', shortName: 'G. QUE', isHuman: true, teamId: 'mercedes', points: 125, image: 'https://i.ibb.co/x8JpW3Y2/rafael-cinteiro.png' },
  { id: 'd2', name: 'Bruno Queirós', shortName: 'B. QUE', isHuman: true, teamId: 'ferrari', points: 110, image: 'https://i.ibb.co/5g3bggPP/brunocinteiro.png' },
  { id: 'd3', name: 'Gonçalo Santos', shortName: 'G. SAN', isHuman: true, teamId: 'redbull', points: 95, image: 'https://i.ibb.co/Wv8FDKsV/caninca-cinteiro.png' },
  { id: 'd4', name: 'António Queirós', shortName: 'A. QUE', isHuman: true, teamId: 'aston', points: 82, image: 'https://picsum.photos/seed/aqueiros/200/200' },
  { id: 'd5', name: 'Bernardo Carvalho', shortName: 'B. CAR', isHuman: true, teamId: 'mclaren', points: 75, image: 'https://i.ibb.co/kVM3FQzh/Firefly-Gemini-Flash-converte-este-homem-numa-foto-de-piloto-de-formula-1-com-fundo-branco-sem-moldu.png' },
  { id: 'd6', name: 'Lewis Hamilton', shortName: 'L. HAM', isHuman: false, teamId: 'mercedes', points: 68, image: 'https://picsum.photos/seed/ham/200/200' },
  { id: 'd7', name: 'Max Verstappen', shortName: 'M. VER', isHuman: false, teamId: 'redbull', points: 140, image: 'https://picsum.photos/seed/ver/200/200' },
  { id: 'd8', name: 'Charles Leclerc', shortName: 'C. LEC', isHuman: false, teamId: 'ferrari', points: 88, image: 'https://picsum.photos/seed/lec/200/200' },
  { id: 'd9', name: 'Lando Norris', shortName: 'L. NOR', isHuman: false, teamId: 'mclaren', points: 70, image: 'https://picsum.photos/seed/nor/200/200' },
  { id: 'd10', name: 'Fernando Alonso', shortName: 'F. ALO', isHuman: false, teamId: 'aston', points: 50, image: 'https://picsum.photos/seed/alo/200/200' },
  { id: 'd11', name: 'Pierre Gasly', shortName: 'P. GAS', isHuman: false, teamId: 'alpine', points: 42, image: 'https://picsum.photos/seed/gas/200/200' },
  { id: 'd12', name: 'Esteban Ocon', shortName: 'E. OCO', isHuman: false, teamId: 'alpine', points: 38, image: 'https://picsum.photos/seed/oco/200/200' },
  { id: 'd13', name: 'Alex Albon', shortName: 'A. ALB', isHuman: false, teamId: 'williams', points: 25, image: 'https://picsum.photos/seed/alb/200/200' },
  { id: 'd14', name: 'Logan Sargeant', shortName: 'L. SAR', isHuman: false, teamId: 'williams', points: 5, image: 'https://picsum.photos/seed/sar/200/200' },
  { id: 'd15', name: 'Yuki Tsunoda', shortName: 'Y. TSU', isHuman: false, teamId: 'vcarb', points: 30, image: 'https://picsum.photos/seed/tsu/200/200' },
  { id: 'd16', name: 'Daniel Ricciardo', shortName: 'D. RIC', isHuman: false, teamId: 'vcarb', points: 22, image: 'https://picsum.photos/seed/ric/200/200' },
  { id: 'd17', name: 'Valtteri Bottas', shortName: 'V. BOT', isHuman: false, teamId: 'sauber', points: 12, image: 'https://picsum.photos/seed/bot/200/200' },
  { id: 'd18', name: 'Zhou Guanyu', shortName: 'Z. GUA', isHuman: false, teamId: 'sauber', points: 8, image: 'https://picsum.photos/seed/zho/200/200' },
  { id: 'd19', name: 'Nico Hulkenberg', shortName: 'N. HUL', isHuman: false, teamId: 'haas', points: 18, image: 'https://picsum.photos/seed/hul/200/200' },
  { id: 'd20', name: 'Kevin Magnussen', shortName: 'K. MAG', isHuman: false, teamId: 'haas', points: 10, image: 'https://picsum.photos/seed/mag/200/200' },
  { id: 'd21', name: 'Oscar Piastri', shortName: 'O. PIA', isHuman: false, teamId: 'porsche', points: 65, image: 'https://picsum.photos/seed/pia/200/200' },
].sort((a, b) => b.points - a.points);

export const raceResults: RaceWeekend[] = [
  {
    raceId: 1, // Portugal
    practice: [
      { pos: 1, driverId: 'd1', time: '1:18.452', laps: 24 },
      { pos: 2, driverId: 'd2', time: '1:18.601', gap: '+0.149', laps: 22 },
      { pos: 3, driverId: 'd3', time: '1:18.890', gap: '+0.438', laps: 25 },
      { pos: 4, driverId: 'd7', time: '1:19.012', gap: '+0.560', laps: 20 },
      { pos: 5, driverId: 'd5', time: '1:19.155', gap: '+0.703', laps: 21 },
    ],
    qualifying: [
      { pos: 1, driverId: 'd2', time: '1:17.980', laps: 15 },
      { pos: 2, driverId: 'd1', time: '1:18.045', gap: '+0.065', laps: 16 },
      { pos: 3, driverId: 'd3', time: '1:18.210', gap: '+0.230', laps: 14 },
      { pos: 4, driverId: 'd5', time: '1:18.400', gap: '+0.420', laps: 15 },
      { pos: 5, driverId: 'd4', time: '1:18.550', gap: '+0.570', laps: 16 },
    ],
    race: [
      { pos: 1, driverId: 'd2', time: '1:32:45.123', points: 25 },
      { pos: 2, driverId: 'd1', gap: '+4.567', points: 18 },
      { pos: 3, driverId: 'd3', gap: '+12.890', points: 15 },
      { pos: 4, driverId: 'd5', gap: '+18.450', points: 12 },
      { pos: 5, driverId: 'd7', gap: '+22.100', points: 10 },
      { pos: 6, driverId: 'd4', gap: '+25.600', points: 8 },
      { pos: 21, driverId: 'd8', status: 'DNF', points: 0 },
    ]
  },
  {
    raceId: 2, // Espanha
    practice: [
      { pos: 1, driverId: 'd3', time: '1:14.220', laps: 28 },
      { pos: 2, driverId: 'd1', time: '1:14.350', gap: '+0.130', laps: 26 },
      { pos: 3, driverId: 'd2', time: '1:14.500', gap: '+0.280', laps: 24 },
      { pos: 4, driverId: 'd4', time: '1:14.800', gap: '+0.580', laps: 25 },
      { pos: 5, driverId: 'd5', time: '1:14.950', gap: '+0.730', laps: 22 },
    ],
    qualifying: [
      { pos: 1, driverId: 'd1', time: '1:13.500', laps: 18 },
      { pos: 2, driverId: 'd3', time: '1:13.650', gap: '+0.150', laps: 18 },
      { pos: 3, driverId: 'd2', time: '1:13.800', gap: '+0.300', laps: 17 },
      { pos: 4, driverId: 'd5', time: '1:14.100', gap: '+0.600', laps: 16 },
      { pos: 5, driverId: 'd4', time: '1:14.250', gap: '+0.750', laps: 18 },
    ],
    race: [
      { pos: 1, driverId: 'd1', time: '1:35:10.400', points: 25 },
      { pos: 2, driverId: 'd3', gap: '+2.100', points: 18 },
      { pos: 3, driverId: 'd5', gap: '+15.300', points: 15 },
      { pos: 4, driverId: 'd4', gap: '+20.500', points: 12 },
      { pos: 5, driverId: 'd7', gap: '+28.900', points: 10 },
      { pos: 21, driverId: 'd2', status: 'DNF', points: 0 },
    ]
  }
];
