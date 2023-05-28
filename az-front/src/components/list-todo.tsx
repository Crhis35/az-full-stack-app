import {
  Badge,
  HStack,
  IconButton,
  Spacer,
  Spinner,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useDeleteTaskMutation, useListTaskQuery } from "../gql";
import { gqlClient } from "../api/gql.api";
import { ClientError } from "graphql-request";

export default function TodoList() {
  const { data, isLoading,refetch } = useListTaskQuery(
    gqlClient,
    {
      input: { offset: 0 },
    },
    {
      onError: (error:ClientError) => {
        console.error("Debug: ", error.message);
        console.error("Debug: ", error.response);
      },
    }
  );
  const mutation = useDeleteTaskMutation(gqlClient);
  const tasks = data?.listTask?.items;

  if (tasks?.length === 0 || !tasks)
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Todos, yay!!!
      </Badge>
    );

  const vStackProps = {
    p: "4",
    w: "100%",
    maxW: { base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" },
    borderColor: "gray.100",
    borderWidth: "2px",
    borderRadius: "lg",
    alignItems: "stretch",
    divider: <StackDivider />,
  };

  const buttonProps = {
    icon: <FaTrash />,
    isRound: true,
    "aria-label": "delete",
  };

  const deleteTodo = async(id: string) => {
    await mutation.mutateAsync({ input: { id } });
    await refetch()
  };
  
  if (isLoading) {
    return (
      <VStack {...vStackProps}>
        <Spinner />
      </VStack>
    );
  }

  return (
    <VStack {...vStackProps}>
      {tasks.map((task) => (
        <HStack key={task.id}>
          <Text>{task.description}</Text>
          <Spacer />
          <IconButton onClick={() => deleteTodo(task.id)} {...buttonProps} />
        </HStack>
      ))}
    </VStack>
  );
}
