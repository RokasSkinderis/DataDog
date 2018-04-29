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
  hero: Hero;

  constructor(public Http: DotaApiService) {
    this.hero = new Hero();
    this.heroList = [];
    this.name = '';
    this.atr = '';
    this.role = '';
    this.getHeroes();
  }

  filterByHeroName(): void {
    this.heroList.sort(function (a, b) {
      if (a.localized_name < b.localized_name) {
        return -1;
      } else if (a.localized_name > b.localized_name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  getHeroes(): void {
    // Kreipiasi i dotaApiService
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

  ngOnInit() {
  }

}
