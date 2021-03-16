import { Route } from "@angular/router";
import { isNullOrUndefined } from "src/libs/util/utils/src";

export interface INamedRoute extends Route {
  children?: INamedRoute[];

  /** @description Name of this Route */
  name?: string;

  /** @description Name of the Icon to be loaded */
  icon?: string;

  /** @description If the Icon to be loaded is of an SVG type */
  isSvg?: boolean;

  /** @description Determines rather this route only represents a group and doesnt make any actions */
  isGroupOnly?: boolean;

  /** @description Determines if this route is to be disabled in the menu */
  isDisabled?: boolean;

  /** @description If this route is selected in the menu */
  isSelected?: boolean;

  /** @description Parent route if it exists */
  Parent?: INamedRoute;
}

export class NamedRoute implements INamedRoute {
  children?: INamedRoutes;

  redirectTo?: string;

  path?: string;

  pathMatch?: any;

  canActivate?: any[];

  name?: string;

  icon?: string;

  isSvg = false;

  isGroupOnly?: boolean = false;

  isDisabled?: boolean;

  isSelected?: boolean;

  private parent?: INamedRoute;

  private fullPath?: string;

  public get FullPath() {
    return this.fullPath;
  }

  public get Childs(): NamedRoutes {
    return (this.children as NamedRoutes) ?? [];
  }

  public get Parent() {
    return this.parent;
  }

  public set Parent(parent: INamedRoute | undefined) {
    if (this.path && this.path[0] !== "/" && parent) {
      const parentNamedRoute = parent as NamedRoute;
      const parentPath = parentNamedRoute ? parentNamedRoute.FullPath : "";
      this.fullPath = `${parentPath}/${this.path}`;
    } else {
      this.fullPath = this.path;
    }

    this.parent = parent;
  }

  constructor(obj: Partial<INamedRoute>) {
    if (obj !== null) Object.assign(this, obj);

    this.fullPath = this.path;

    if (isNullOrUndefined(this.isDisabled) && isNullOrUndefined(this.name))
      this.isDisabled = true;

    if (
      isNullOrUndefined(this.isDisabled) &&
      !isNullOrUndefined(this.redirectTo)
    )
      this.isDisabled = true;

    if (!isNullOrUndefined(this.children)) {
      const childs = this.children ?? [];
      for (let i = 0; i < childs.length; i++) {
        if (!(childs[i] instanceof NamedRoute))
          childs[i] = new NamedRoute(childs[i]);

        childs[i].Parent = this;
      }
    }
  }
}

export declare type INamedRoutes = INamedRoute[];

export declare type NamedRoutes = NamedRoute[];
