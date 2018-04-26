export class Match {
  match: [
    {
      match_id: number;
      player_slot: number;
      radiant_win: boolean;
      duration: number;
      game_mode: number;
      lobby_type: number;
      hero_id: number;
      start_time: number;
      version: number;
      kills: number;
      deaths: number;
      assists: number;
      skill: number;
      party_size: number;
      heroes: {
        player_slot: {
          account_id: number;
          hero_id: number;
          player_slot: number
        }
      }
    }
    ];
}
