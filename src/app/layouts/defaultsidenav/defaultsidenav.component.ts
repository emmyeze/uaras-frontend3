import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-defaultsidenav',
  templateUrl: './defaultsidenav.component.html',
  styleUrls: ['./defaultsidenav.component.scss']
})
export class DefaultsidenavComponent implements OnInit {
  sideNavOpen = true;
  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe((result: any) => {
      this.sideNavOpen = true;
      environment.sideNavOpen = this.sideNavOpen;
      const breakpoints = result.breakpoints;
      if (breakpoints[Breakpoints.TabletLandscape]) {this.sideNavOpen = true;}
      else if (breakpoints[Breakpoints.TabletPortrait]) {this.sideNavOpen = false;}
      else if (breakpoints[Breakpoints.HandsetLandscape]) {this.sideNavOpen = false;}
      else if (breakpoints[Breakpoints.HandsetPortrait]) {this.sideNavOpen = false;}
      environment.sideNavOpen = this.sideNavOpen;
    });
  }

  sideBarToggler(): void {
    this.sideNavOpen = !this.sideNavOpen;
  }

}
