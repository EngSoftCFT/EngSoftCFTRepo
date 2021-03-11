import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MultipleRoutes } from "src/app/shared/extensions/CompleteRoutes";
import { trigger, transition, state, animate, style } from "@angular/animations";
import { ConfirmationModalService } from "src/app/shared/components/confrimation-modal/services/confirmation-modal.service";

@Component({
  selector: "app-inner-menu",
  templateUrl: "./inner-menu.component.html",
  styleUrls: ["./inner-menu.component.scss", "../menu.component.scss"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4,0.0,0.2,1)")),
    ]),
  ],
})
export class InnerMenuComponent implements OnInit {
  @Output() menuButtonClick = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  @Input() multipleRoutes: MultipleRoutes;
  @Output() isHeatmap = new EventEmitter();

  expanded: boolean[] = [];

  constructor(public confirmationModal: ConfirmationModalService) {}

  close(path: string) {
    this.closeEvent.emit();
  }

  itemClicked(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  ngOnInit(): void {
    this.multipleRoutes.forEach(() => {
      this.expanded.push(false);
    });
  }

  toggleSidebar() {
    this.menuButtonClick.emit();
  }
}
