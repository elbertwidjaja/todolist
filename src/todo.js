import { Checkbox, UnorderedList, ListItem, Button, Text } from "@chakra-ui/react";

function Todo({ dataComplete, data, onCheckboxChecked, onDelete }) {
  const arr = data.map((num) => {
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
  const arr2 = dataComplete.map((num) => {
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
