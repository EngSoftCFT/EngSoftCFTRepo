import { Route } from "@angular/router";

export type CompleteRoutes = CompleteRoute[];

export interface CompleteRoute extends Route {
  icon?: string;
  name?: string;
  isSvg?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export interface CompleteRoutesName {
  routes: CompleteRoutes;
  name: string;
  icon: string;
  isSvg?: boolean;
  isSelected?: boolean;
}

export type MultipleRoutes = CompleteRoutesName[];
