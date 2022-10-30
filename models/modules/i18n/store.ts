import { types, flow } from "mobx-state-tree"
import { i18nx } from "../../../i18n"
import { withEnvironment } from "../../extensions/with-environment"
import * as Localization from "i18n-js"

export const i18nStore = types
    .model({
        appLanguage: types.maybeNull(types.string),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        setAppLanguage: flow(function* (language) {
            i18nx.locale = language
            self.appLanguage = language
        }),
        setSystemDefault: flow(function* () {
            i18nx.locale = Localization.locale
            self.appLanguage = null
        }),
        getCurrentLanguage: () => {
            if (self.appLanguage) return self.appLanguage
            /*TODO
                DOESN'T ACCOUNT FOR LANGUAGE LOCAL VARIANTS 
             */
            return Localization.locale.split("-")[0]
        },
    }))
