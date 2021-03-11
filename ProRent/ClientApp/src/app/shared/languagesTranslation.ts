import { isNullOrUndefined } from "./Functions/value-checks";

export interface ITranslation {
  basicCrud: {
    detail: string;
    edit: string;
    delete: string;
  };

  custom?: object;
}

export class Languages {
  public static storedLanguages = {
    default: {
      presets: {
        basicCrudButtons: {
          detail: "Detail",
          edit: "Edit",
          delete: "Delete",
        },
      },
    },
    "pt-BR": {
      presets: {
        basicCrudButtons: {
          detail: "Detalhes",
          edit: "Editar",
          delete: "Excluir",
        },
      },
    },
  };

  public static addLanguage(languageCode: string, tranlation: ITranslation) {
    Languages.storedLanguages[languageCode] = tranlation;
  }

  public static getTranslation(languageCode: string): ITranslation {
    let translation = Languages.storedLanguages[languageCode];
    if (isNullOrUndefined(translation)) translation = Languages.storedLanguages.default;
    return translation;
  }
}
