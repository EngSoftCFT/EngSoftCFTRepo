import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { INamedRoutes } from "../models/named-route";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "fea-icon-side-bar",
  templateUrl: "./icon-side-bar.component.html",
  styleUrls: ["./icon-side-bar.component.scss"],
})
export class IconSideBarComponent implements OnInit {
  @Input() icon: string = undefined;
  @Input() svgIcon: string = undefined;

  @Output() menuButtonClick = new EventEmitter();

  @Input() routes!: INamedRoutes;

  selected = -1;

  @Output() isHeatmap = new EventEmitter();

  constructor() {
    this.selected = -1;
  }

  selectItem(index: number): void {
    if (this.selected === index) this.selected = -1;
    else this.selected = index;
  }

  ngOnInit(): void {
    this.selectItemWatcher(this);
  }

  selectItemWatcher(iconMenu: this) {
    if (iconMenu.routes.some((d) => d.isSelected))
      iconMenu.routes.forEach((d, i) => {
        if (d.isSelected === true) iconMenu.selected = i;
      });
    else setTimeout(this.selectItemWatcher, 500, iconMenu);
  }

  toggleSidebar() {
    this.menuButtonClick.emit();
  }
}
