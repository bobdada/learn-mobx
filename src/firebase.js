import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAAYdr7d6UkeLt5ER2pr-KGcATZ2CKJFCI",
  authDomain: "mobxtest-ee66e.firebaseapp.com",
  databaseURL: "https://mobxtest-ee66e.firebaseio.com",
  projectId: "mobxtest-ee66e",
  storageBucket: "mobxtest-ee66e.appspot.com",
  messagingSenderId: "258739151293",
  appId: "1:258739151293:web:de39da407d13ba930f32d4",
  measurementId: "G-7CWBMP7P9Z",
};

firebase.initializeApp(firebaseConfig);

export async function getTodosList() {
  return (await firebase.firestore().collection("todos").get()).docs.map((d) =>
    d.data()
  );
}

export async function addTodo(data) {
  const ref = firebase.firestore().collection("todos").doc();
  data.key = ref.id;
  await ref.set(data);
}

export async function deleteTodo(params) {
  await firebase.firestore().collection("todos").doc(params.key).delete();
  console.log("Deleted");
}

export async function updateTodo(params) {
  console.log("FRIRERERER", params);
  await firebase.firestore().collection("todos").doc(params.key).update(params);
  console.log("Updated");
}
