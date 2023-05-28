import { FormEvent, useRef } from "react";
import { Button, HStack, Input, useToast } from "@chakra-ui/react";
import { useCreateTaskMutation } from "../gql";
import { gqlClient } from "../api/gql.api";
import { useQueryClient } from "@tanstack/react-query";

export default function AddTodo() {
  const client = useQueryClient();

  const { isLoading, mutateAsync } = useCreateTaskMutation(gqlClient, {
    onSuccess: (data) => {
      if (data.createTask.ok) {
        client.invalidateQueries(["listTask"]);
      }
    },
  });
  const contentRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const toastError = (title: string) =>
    toast({
      title: title,
      status: "error",
      duration: 2000,
      isClosable: true,
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contentRef.current === null) return;

    if (!contentRef.current.value) {
      toastError("No content");
      return;
    }

    await mutateAsync({
      input: {
        description: contentRef.current.value,
      },
    });

    contentRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack m="8">
        <Input
          variant="filled"
          placeholder="Description"
          ref={contentRef}
        />
        <Button type="submit" colorScheme="green" px="8" isLoading={isLoading}>
          Add Todo
        </Button>
      </HStack>
    </form>
  );
}
