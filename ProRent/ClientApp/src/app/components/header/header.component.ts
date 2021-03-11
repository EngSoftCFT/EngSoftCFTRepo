import { Component, OnInit, Input } from "@angular/core";
import { ConfirmationModalService } from "src/app/shared/components/confrimation-modal/services/confirmation-modal.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  user: string = "Usuário";

  @Input() pageGroup: string;
  @Input() pageName: string;

  constructor(
    public confirmationModal: ConfirmationModalService,
    public router: Router,
  ) {}

  async ngOnInit() {
  }

  logout() {
  }

  confirmCancel() {
    this.confirmationModal.openConfirmationModal({
      title: "Sair",
      description: "Deseja realmente sair da aplicação?",
    });

    const subs = this.confirmationModal.confirmationResult.subscribe((result) => {
      if (result) this.logout();
      subs.unsubscribe();
    });
  }
}
