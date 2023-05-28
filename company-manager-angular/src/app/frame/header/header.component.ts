import {Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  public routes: { link: string, desc: string }[] = [
    {link: '/departments', desc: 'Departments'},
    {link: '/employees', desc: 'Employees'},
  ];
  public active!: string;
  public routerSub!: Subscription;

  constructor(private router: Router) {
    this.routerSub = router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(data => {
        const url = (data as RouterEvent).url;
        this.active = '/'.concat(url?.split('/')[1] || 'employees');
      });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
