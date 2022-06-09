import { Input as BaseInput } from "@chakra-ui/react";
import { useRef } from "react";
import { Text } from "@chakra-ui/react";
function Input(props) {
  const { onEnter } = props;
  const todo = useRef();

  return (
    <div>
      <Text fontSize="3xl">To Do List</Text>
      <form
        onSubmit={(e) => {
          console.log(todo.current.value, "value todo");
          e.preventDefault();
          onEnter(todo.current.value);
        }}
      >
        <BaseInput ref={todo} placeholder="Basic usage" id="todo" />
      </form>
    </div>
  );
}

export default Input;
