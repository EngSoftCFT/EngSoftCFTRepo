import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Event, Router, RoutesRecognized } from "@angular/router";
import { INamedRoute, NamedRoute, INamedRoutes } from "./models/named-route";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "fea-menu",
  templateUrl: "./fea-menu.component.html",
  styleUrls: ["./fea-menu.component.scss"],
})
export class FeaMenuComponent {
  @Input() icon: string = undefined;
  @Input() svgIcon: string = undefined;

  @Output() currentRoute = new EventEmitter<NamedRoute | null>();

  routes: INamedRoutes;

  private currentRouteInternal: NamedRoute | undefined | null;

  public get CurrentRoute() {
    return this.currentRouteInternal;
  }

  public set CurrentRoute(route: NamedRoute | undefined | null) {
    this.currentRouteInternal = route;
    this.currentRoute.emit(this.currentRouteInternal);
  }

  constructor(private router: Router) {
    this.routes = [];
    this.CurrentRoute = null;
    const baseRoutes = router.config;

    for (const route of baseRoutes) {
      const currentRoute =
        route instanceof NamedRoute ? route : new NamedRoute(route);

      this.routes.push(currentRoute);

      if (
        currentRoute.isGroupOnly &&
        currentRoute.Childs.every((x) => x.isDisabled)
      )
        currentRoute.isDisabled = true;
    }

    // tslint:disable-next-line: deprecation
    router.events.subscribe((event) => {
      this.onPageChange(event);
    });
  }

  onPageChange(val: Event) {
    if (val instanceof RoutesRecognized) {
      const oldRoute = this.CurrentRoute;

      if (oldRoute) {
        oldRoute.isSelected = false;
        if (oldRoute.Parent) oldRoute.Parent.isSelected = false;
      }

      let child = val.state.root.firstChild;

      while (child?.firstChild) child = child.firstChild;

      const routeConfig = child?.routeConfig ?? {};
      this.CurrentRoute =
        routeConfig instanceof NamedRoute
          ? (routeConfig as NamedRoute)
          : new NamedRoute(routeConfig);

      if (this.CurrentRoute) {
        this.CurrentRoute.isSelected = true;
        if (this.CurrentRoute.Parent)
          this.CurrentRoute.Parent.isSelected = true;
      }
    }
  }
}
