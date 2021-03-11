import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ConfirmationModalService } from "src/app/shared/components/confrimation-modal/services/confirmation-modal.service";

import { MultipleRoutes, CompleteRoutesName } from "src/app/shared/extensions/CompleteRoutes";

@Component({
  selector: "app-icon-side-bar",
  templateUrl: "./icon-side-bar.component.html",
  styleUrls: ["./icon-side-bar.component.scss", "../menu.component.scss"],
})
export class IconSideBarComponent implements OnInit {
  @Output() menuButtonClick = new EventEmitter();
  @Input() multipleRoutes: MultipleRoutes;
  selected: number = -1;
  @Output() isHeatmap = new EventEmitter();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.selected = -1;

    this.matIconRegistry.addSvgIcon(
      "atom",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/atom.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "warning",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/warning-single-color.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "box",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/box.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "eye",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/eye.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "eraser",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/eraser.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "search",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/search.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "delete",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/delete.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "add",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/document.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "gear-single-color",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/gear-single-color.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "finance",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/finance.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "chart-scatter-plot",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/chart-scatter-plot.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "swap-vertical-bold",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/swap-vertical-bold.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "matrix",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/matrix.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "chart-bell-curve",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/chart-bell-curve.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "gradient",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/gradient.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "edit",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/edit.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "calendar1",
      this.domSanitizer.bypassSecurityTrustResourceUrl("#assets/icons/calendar1.svg")
    );
  }

  selectItem(index: number): void {
    if (this.selected === index) this.selected = -1;
    else this.selected = index;
  }

  ngOnInit(): void {
    const iconMenu = this;
    this.selectItemWatcher(iconMenu);
  }

  selectItemWatcher(iconMenu: this) {
    if (iconMenu.multipleRoutes.some((d) => d.isSelected))
      iconMenu.multipleRoutes.forEach((d, i) => {
        if (d.isSelected === true) iconMenu.selected = i;
      });
    else setTimeout(this.selectItemWatcher, 500, iconMenu);
  }

  toggleSidebar() {
    this.menuButtonClick.emit();
  }

  checkPath(path: string) {
  }
}
