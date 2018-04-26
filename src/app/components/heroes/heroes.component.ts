import {Component, OnInit} from '@angular/core';
import {Hero} from '../../models/Hero';
import {DotaApiService} from '../../services/dota-api.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroList: Hero[];
  role: string;
  atr: string;
  name: string;

  constructor(public Http: DotaApiService) {
    this.heroList = [];
    this.name = 'name';
    this.atr = 'atr';
    this.role = 'Role';
    this.getHeroes();
  }

  filterHeroes(data): void {
    switch (data) {
      case this.name:
        let unsortedNames = this.heroList;
        unsortedNames.sort(function (a, b) {
          if (a.localized_name < b.localized_name) return -1;
          if (a.localized_name > b.localized_name) return 1;
          return 0;
        });
        break;
      case this.role:
        const role = this.role;
        const sortedRoles = [];
        const a = this.heroList.map(key => key, value => this.role);
        a.map(function (item, index) {
          const roles = item.roles[0].split(', ');
          for (let i = 0; i <= roles.length; ++i) {
            if (roles[i] === role) {
              sortedRoles.push(item);
            }
          }
        });
        this.heroList = sortedRoles;
        break;
      default:
        break;
    }
  }

  getHeroes(): void {
    this.Http.getHeroes().subscribe({
      next: (heroesList: Array<Hero>) => {
        for (const hero of heroesList) {
          hero.name = hero.name.slice(14);
          hero.roles = [hero.roles.join(', ')];
          this.heroList.push(hero);
        }
      },
      error: (err: any) => {
        console.log(err.status);
      }
    });
  }

  ngOnInit() {
  }

}
