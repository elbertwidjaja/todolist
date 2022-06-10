import { ChakraProvider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Input from "./input";
import Todo from "./todo";
import { Container } from "@chakra-ui/react";

function App() {
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

  return (
    <ChakraProvider>
      <Container mt={3}>
        <Input
          onEnter={(value) => {
            const now = new Date();
            const id = `${now.getMilliseconds()}${now.getTime()}`;

            setToDo((prev) => [...prev, { value, id }]);
          }}
        />
        <Todo
          dataComplete={todoComplete}
          data={toDo}
          onCheckboxChecked={onCheckboxChecked}
          onDelete={onDelete}
        />
      </Container>
    </ChakraProvider>
  );
}

export default App;
