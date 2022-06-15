import { useState, useEffect, createContext, useContext } from "react";
import Input from "./input";
import Todo from "./todo";

const defaultValue = {
  toDo: [],
  todoComplete: [],
  onCheckboxChecked: () => {},
  onDelete: () => {},
  onEnter: () => {}
};

const ToDoContext = createContext(defaultValue);

function ToDoProvider({ children }) {
  const [toDo, setToDo] = useState(() => {
    return window.localStorage.getItem("my data")
      ? JSON.parse(window.localStorage.getItem("my data"))
      : [];
  });
  const [todoComplete, setTodoComplete] = useState(() => {
    return window.localStorage.getItem("comp data")
      ? JSON.parse(window.localStorage.getItem("comp data"))
      : [];
  });
  useEffect(() => {
    window.localStorage.setItem("my data", JSON.stringify(toDo));
    window.localStorage.setItem("comp data", JSON.stringify(todoComplete));
  }, [toDo, todoComplete]);
  function onCheckboxChecked(value, currentId) {
    const copyTodo = [...toDo];
    const copyTodoComplete = [...todoComplete];
    if (value === true) {
      setToDo((prev) => [
        ...prev.filter((value) => {
          return value.id !== currentId;
        })
      ]);
      setTodoComplete((prev) => [
        ...prev,
        copyTodo.find((prev) => prev.id === currentId) ?? {}
      ]);
    } else {
      setTodoComplete((prev) => [
        ...prev.filter((value) => {
          return value.id !== currentId;
        })
      ]);
      setToDo((prev) => [
        ...prev,
        copyTodoComplete.find((prev) => prev.id === currentId) ?? {}
      ]);
    }
  }
  function onDelete(num, status) {
    if (status === "unchecked") {
      setToDo((toDo) => {
        return [...toDo.filter((prev) => prev.id !== num.id)];
      });
    } else {
      setTodoComplete((todoComplete) => {
        return [...todoComplete.filter((prev) => prev.id !== num.id)];
      });
    }
  }
  function onEnter(value) {
    const now = new Date();
    const id = `${now.getMilliseconds()}${now.getTime()}`;

    setToDo((prev) => [...prev, { value, id }]);
  }
  return (
    <ToDoContext.Provider
      value={{ toDo, todoComplete, onCheckboxChecked, onDelete, onEnter }}
    >
      {children}
    </ToDoContext.Provider>
  );
}

function useToDo() {
  return useContext(ToDoContext);
}

export { ToDoProvider, useToDo };
