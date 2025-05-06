import {Component, Input, ElementRef, ViewChildren, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [CommonModule, FormsModule],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  @ViewChildren('powerInput') powerInputs!: QueryList<ElementRef>;  
  focusIndex: number = -1;

  
  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {}
  
  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  onPowerChange(index: number): void {
    // Guarda el índice del poder que está siendo editado
    this.focusIndex = index;
    // Damos un pequeño tiempo para que Angular actualice la vista
    setTimeout(() => {
      // Aplicamos el foco al elemento después de que se haya actualizado
      if (this.powerInputs && this.powerInputs.length > index) {
        this.powerInputs.toArray()[index].nativeElement.focus();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}