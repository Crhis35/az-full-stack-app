import {
  Heading,
  useColorMode,
  VStack,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import AddTodo from "./components/add-todo";
import TodoList from "./components/list-todo";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const buttonProps = {
    size: "lg",
    isRound: true,
    alignSelf: "flex-end",
    icon: colorMode === "light" ? <FaMoon /> : <FaSun />,
    "aria-label": "Switch DarkMode",
  };

  return (
    <VStack p={4} h="100vh" w="100vw">
      <IconButton onClick={toggleColorMode} {...buttonProps} />
      <Heading mb="8" fontWeight="extrabold" size="2xl" bgClip="text">
        Todo App
      </Heading>
      <Heading size="2xl">Chakra UI Todo App</Heading>
      <Center>
        <VStack>
          <AddTodo />
          <TodoList />
        </VStack>
      </Center>
    </VStack>
  );
}

export default App;
