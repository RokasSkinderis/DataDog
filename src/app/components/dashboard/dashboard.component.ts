import {Component, OnInit} from '@angular/core';
import {DotaApiService} from '../../services/dota-api.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Account} from '../../models/Account';
import {Hero} from '../../models/Hero';
import {Match} from '../../models/Match';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchInput: FormControl;
  usersDisplayed: number;
  account: Account;
  matches: Match[];
  searchResults: Account[];
  heroList: Hero[];

  displayProfile: boolean;

  constructor(public Http: DotaApiService) {
    this.searchInput = new FormControl();
    this.usersDisplayed = 0;
    this.account = new Account();
    this.displayProfile = false;
    this.searchResults = [];
    this.heroList = [];
    this.matches = [];
    this.getHeroes();

    this.searchInput.valueChanges.pipe(debounceTime(400)).subscribe({
      next: (value: string) => {
        if (value.length > 0) {
          this.Http.searchUsers(value).subscribe({
            next: (userList: Array<Account>) => {
              this.searchResults = [];
              for (const user of userList) {
                this.usersDisplayed += 1;
                if (this.usersDisplayed <= 10) {
                  this.searchResults.push(user);
                } else {
                  break;
                }
              }
            },
            error: (err: any) => {
              console.log(err.status);
            }
          });
        } else {
          this.searchResults = [];
        }
      },
      error: (err: any) => {
        console.log(err.status);
      }
    });
  }

  getHeroes(): void {
    // kreipiasi i api service
    this.Http.getHeroes().subscribe({
      next: (heroesList: Array<Hero>) => {
        for (const hero of heroesList) {
          // slicina name del img src patho
          hero.name = hero.name.slice(14);
          // Isskaido roles, del patogesnio filtravimo ir padeda tarpa po kablelio, del stiliaus, kad nebutu visos roles, vienas zodis.
          hero.roles = [hero.roles.join(', ')];
          this.heroList.push(hero);
        }
      },
      error: (err: any) => {
        console.log(err.status);
      }
    });
  }

  showProfile(accountId): void {
    this.Http.getUsers(accountId).subscribe({
      next: (profile: Account) => {
        this.account = profile;
        this.searchResults = [];
        this.getUserWL(accountId);
        this.getUserMatches(accountId);
        this.displayProfile = true;
      },
      error: (err: any) => {
        console.log(err.status);
      }
    });
  }


  getUserWL(accountId): void {
    this.Http.getUsersWL(accountId).subscribe({
      next: (wl: Account) => {
        this.account.win = wl.win;
        this.account.lose = wl.lose;
      },
      error: (err: any) => {
        console.log(err.status);
      }
    });
  }

  getUserMatches(accountId): void {
    this.Http.getUsersMatches(accountId).subscribe({
      next: (match: Match) => {
        this.matches.push(match);
      },
      error: (err: any) => {
        console.log(err.status);
      }
    });
  }

  ngOnInit() {
  }

}
