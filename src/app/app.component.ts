import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <app-loader></app-loader>
    <main [@routeAnimations]="getRouteState(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loaderService.show();
      }
    });
  }

  getRouteState(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['state'] || 'default';
  }
}
