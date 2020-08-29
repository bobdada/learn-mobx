import { types, onSnapshot } from "mobx-state-tree";
import { TodoList } from "./list";
import React, { createContext, useContext } from "react";
import makeInspectable from "mobx-devtools-mst";

const RootModel = types.model("Root", {
  todoStore: types.optional(TodoList, {}),
});

export const rootStore = RootModel.create();

makeInspectable(rootStore);

// onSnapshot(rootStore, (snapshot) => console.log("Snapshot: ", snapshot));

const RootStoreContext = createContext(null);
const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);

  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export function StoreProvider({ value, children }) {
  return <Provider value={rootStore}>{children}</Provider>;
}
