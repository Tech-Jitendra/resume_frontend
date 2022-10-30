// import * as Localization from "expo-localization"
import * as Localization from "i18n-js"
// import Localization from "i18n-js";
import i18n from "i18n-js"
import en from "./en.json"
import hi from "./hi.json"
//import * as storage from 'localforage'
i18n.fallbacks = true
i18n.translations = { en, hi }

i18n.locale = Localization.locale || "en"
export let i18nx = i18n
/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
// type DefaultLocale = typeof en
// export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

// type RecursiveKeyOf<TObj extends Record<string, any>> = {
//     [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
//     ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
//     : `${TKey}`
// }[keyof TObj & string]

type DefaultLocale = typeof en
export type TxKeyPath = DeepKeys<DefaultLocale>

type DeepKeys<T> = T extends object
    ? {
          // @ts-ignore
          [K in keyof T]-?: `${K & string}` | Concat<K & string, DeepKeys<T[K]>>
      }[keyof T]
    : ""
type Concat<K extends string, P extends string> = `${K}${"" extends P ? "" : "."}${P}`
