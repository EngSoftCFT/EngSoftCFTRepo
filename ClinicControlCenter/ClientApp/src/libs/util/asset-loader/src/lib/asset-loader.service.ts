import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class AssetLoaderService
{
  private matIconRegistry: MatIconRegistry;

  private domSanitizer: DomSanitizer;

  constructor(
    matIconRegistry: MatIconRegistry,
    domSanitizer: DomSanitizer
  )
  {
    this.matIconRegistry = matIconRegistry;
    this.domSanitizer = domSanitizer;
  }

  public loadIcon(name:string, path?:string)
  {
    const pathUrl = path ?? `assets/icons/${name}.svg`;
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(pathUrl)
    );
  }
}
