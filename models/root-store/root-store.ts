import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { OscarStore } from "../modules/oscar/store";
import { UserStore } from "../modules/user/store";
import { i18nStore } from "../modules/i18n/store";
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  // dummyStore:types.optional(DummyModel,{} as any),
  userStore: types.optional(UserStore, {} as any),
  productStore: types.optional(OscarStore, {} as any),
  i18nStore: types.optional(i18nStore, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
