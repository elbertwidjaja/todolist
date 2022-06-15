import {
  Checkbox,
  UnorderedList,
  ListItem,
  Button,
  Text
} from "@chakra-ui/react";
import { useToDo } from "./useToDo";

function Todo() {
  const { todoComplete, toDo, onCheckboxChecked, onDelete } = useToDo();
  const arr = toDo.map((num) => {
    return (
      <ListItem display="flex" alignItems="center">
        <Checkbox
          isInvalid
          onChange={(event) => onCheckboxChecked(event.target.checked, num.id)}
        >
          {num.value}
        </Checkbox>
        <Button
          colorScheme="red"
          size="sm"
          ml="auto"
          onClick={(event) => onDelete(num, "unchecked")}
        >
          Delete
        </Button>
      </ListItem>
    );
  });
  const arr2 = todoComplete.map((num) => {
    return (
      <ListItem display="flex" alignItems="center">
        <Checkbox
          defaultChecked
          onChange={(event) => onCheckboxChecked(event.target.checked, num.id)}
        >
          {num.value}
        </Checkbox>
        <Button
          colorScheme="red"
          size="sm"
          ml="auto"
          onClick={(event) => onDelete(num, "checked")}
        >
          Delete
        </Button>
      </ListItem>
    );
  });
  return (
    <div>
      <Text fontSize="3xl">To Do</Text>
      <UnorderedList listStyleType={"none"}>{arr}</UnorderedList>
      <br />
      <br />
      <Text fontSize="3xl">Completed</Text>
      <UnorderedList>{arr2}</UnorderedList>
    </div>
  );
}

export default Todo;
