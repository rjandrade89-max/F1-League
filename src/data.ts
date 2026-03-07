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
  { id: 'd2', name: 'Bruno Queirós', shortName: 'B. QUE', isHuman: true, teamId: 'redbull', points: 110, image: 'https://i.ibb.co/5g3bggPP/brunocinteiro.png' },
  { id: 'd3', name: 'Gonçalo Santos', shortName: 'G. SAN', isHuman: true, teamId: 'ferrari', points: 95, image: 'https://i.ibb.co/Wv8FDKsV/caninca-cinteiro.png' },
  { id: 'd4', name: 'António Queirós', shortName: 'A. QUE', isHuman: true, teamId: 'mclaren', points: 82, image: 'https://picsum.photos/seed/aqueiros/200/200' },
  { id: 'd5', name: 'Bernardo Carvalho', shortName: 'B. CAR', isHuman: true, teamId: 'aston', points: 75, image: 'https://picsum.photos/seed/bcarvalho/200/200' },
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
