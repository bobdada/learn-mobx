import {
  types,
  flow,
  getParent,
  destroy,
  applySnapshot,
} from "mobx-state-tree";
import { getTodosList, addTodo, deleteTodo, updateTodo } from "../firebase";

export const TodoItem = types
  .model({
    title: types.string,
    description: "",
    importance: types.number,
    key: types.optional(types.string, ""),
  })
  .actions((self) => {
    const update = flow(function* (item) {
      try {
        console.log(item);
        const updated = yield updateTodo(item);
        console.log("UPDATETETE", item);
        applySnapshot(self, item);
        // getParent(self, 2).update(self);
      } catch (e) {
        console.log("error", e);
        throw e;
      }
    });
    return {
      update,
      remove() {
        getParent(self, 2).remove(self);
      },
    };
  });

export const TodoList = types
  .model("Todos", {
    items: types.optional(types.array(TodoItem), []),
    status: "loading",
  })
  .actions((self) => {
    const load = flow(function* () {
      self.status = "loading";
      const items = yield getTodosList();
      self.items = items;
      self.status = "idle";
    });

    const create = flow(function* (params) {
      try {
        let newData = yield addTodo(params);
        console.log("CREATED", newData);
        self.items.push(params);
      } catch (e) {
        console.log("error", e);
        throw e;
      }
    });

    const remove = flow(function* (item) {
      try {
        const deleted = yield deleteTodo(item);
        self.items.splice(self.items.indexOf(item), 1);
      } catch (e) {
        console.log("error", e);
        throw e;
      }
    });

    function afterCreate() {
      load();
    }

    return {
      create,
      remove,
      // update,
      afterCreate,
      reload: load,
    };
  });
// .views((self) => ({
//   getAllTitles() {
//     self.items.map((i) => i.title);
//   },
// }));

//getSnapshot(list) le  exact immutable copy of state list
// onSnapshot le chai snapshot liyesi k hunxa garne ho. for eg: onSnapshot(list,snapshot)=>{variable.push (snapshot)}
//patches pani same snapshot but create json patch -> see how state changes overtime but not looking on snapshot
//view -> pieces of model
//reaction from mobx  -> listen to some observable data and callback whenever its values changes  for eg: reaction(()=>list.totalCost,()=>varibale++)
// observer makes sure that whenever data is changed data that is relevant to rending component that component rerenders
