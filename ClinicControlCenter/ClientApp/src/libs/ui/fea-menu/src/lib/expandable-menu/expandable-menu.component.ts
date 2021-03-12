import { trigger, state, style, transition, animate } from "@angular/animations";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NamedRoute, INamedRoutes } from "../models/named-route";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "fea-expandable-menu",
  templateUrl: "./expandable-menu.component.html",
  styleUrls: ["./expandable-menu.component.scss"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      ),
    ]),
  ],
})
export class ExpandableMenuComponent implements OnInit {
  @Input() icon: string = undefined;
  @Input() svgIcon: string = undefined;

  @Output() menuButtonClick = new EventEmitter();

  @Output() closeEvent = new EventEmitter();

  @Input() routes!: INamedRoutes;

  expanded: boolean[] = [];

  close() {
    this.closeEvent.emit();
  }

  itemClicked(index: number, menuItem?: NamedRoute) {
    this.expanded[index] = !this.expanded[index];

    if (menuItem && !menuItem.isGroupOnly) this.close();
  }

  ngOnInit(): void {
    this.routes.forEach(() => {
      this.expanded.push(false);
    });
  }

  toggleSidebar() {
    this.menuButtonClick.emit();
  }
}
