import { IsArrayWithValues, isNullOrUndefined } from "src/libs/util/utils/src";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Event, Router, RoutesRecognized } from "@angular/router";
import { UserControllerService } from "src/libs/util/user-controller/src";
import { NamedRoute, NamedRoutes } from "./models/named-route";
import { merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

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

  routes: NamedRoutes;

  private currentRouteInternal: NamedRoute | undefined | null;

  public get CurrentRoute() {
    return this.currentRouteInternal;
  }

  public set CurrentRoute(route: NamedRoute | undefined | null) {
    this.currentRouteInternal = route;
    this.currentRoute.emit(this.currentRouteInternal);
  }

  constructor(
    private router: Router,
    private userManager: UserControllerService
  ) {
    this.routes = [];
    this.CurrentRoute = null;
    const baseRoutes = router.config;

    for (const route of baseRoutes) {
      const currentRoute =
        route instanceof NamedRoute ? route : new NamedRoute(route);

      this.initializeRouteRequiredRoles(currentRoute, userManager);

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

  initializeRouteRequiredRoles(
    route: NamedRoute,
    userManager: UserControllerService
  ) {
    if (!isNullOrUndefined(route.requireRoleOf)) {
      route.CanShow = userManager.HasPermissionOf(route.requireRoleOf);
    }

    if (IsArrayWithValues(route.Childs))
      route.Childs.forEach((childRoute) => {
        this.initializeRouteRequiredRoles(childRoute, userManager);
      });

    if (route.isGroupOnly && isNullOrUndefined(route.requireRoleOf)) {
      const childsShowResults = Object.assign(
        {},
        ...route.Childs.map((x) => ({ [x.FullPath]: false }))
      );

      const childObservers = route.Childs.map((child) => {
        return child.CanShow.pipe(
          map((x) => {
            childsShowResults[child.FullPath] = x;
            const canShow = Object.values(childsShowResults).every(
              (value: boolean) => value
            );
            return canShow;
          })
        );
      });

      route.CanShow = merge(...childObservers);
    }
  }
}
