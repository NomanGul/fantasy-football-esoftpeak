export interface Player {
  slatePlayerId: number;
  operatorPlayerName: string;
  operatorPosition: string;
  operatorSalary: number;
  team: string;
  fantasyPoints: number;
  projectedOwnership?: number;
}

export interface SlateData {
  _id: string;
  operator: string;
  operatorGameType: string;
  operatorName: string;
  dfsSlatePlayers: Player[];
}

export interface FilterOption {
  id: string;
  name: string;
}
