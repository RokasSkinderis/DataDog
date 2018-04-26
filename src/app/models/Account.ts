export class Account {
  solo_competitive_rank: string;
  competitive_rank: string;
  win: number;
  lose: number;
  mmr_estimate: {
    estimate: number;
    stdDev: number;
    n: number;
  };
  profile: {
    account_id: 0;
    personaname: string;
    name: string;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string;
    loccountrycode: string
  };
}
