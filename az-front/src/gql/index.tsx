// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateTaskInput = {
  description: Scalars['String']['input'];
};

export type CreateTaskOutput = {
  __typename?: 'CreateTaskOutput';
  error?: Maybe<Scalars['String']['output']>;
  item?: Maybe<Task>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteTaskInput = {
  id?: Scalars['String']['input'];
};

export type DeleteTaskOutput = {
  __typename?: 'DeleteTaskOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ListTaskInput = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};

export type ListTaskOutput = {
  __typename?: 'ListTaskOutput';
  error?: Maybe<Scalars['String']['output']>;
  items?: Maybe<Array<Task>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalResults?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: CreateTaskOutput;
  deleteTask: DeleteTaskOutput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};

export type Query = {
  __typename?: 'Query';
  listTask: ListTaskOutput;
};


export type QueryListTaskArgs = {
  input?: InputMaybe<ListTaskInput>;
};

export type Task = {
  __typename?: 'Task';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskFieldsFragment = { __typename?: 'Task', id: string, description: string, createdAt: any, updatedAt: any };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'CreateTaskOutput', ok: boolean, item?: { __typename?: 'Task', id: string, description: string, createdAt: any, updatedAt: any } | null } };

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: { __typename?: 'DeleteTaskOutput', ok: boolean, error?: string | null } };

export type ListTaskQueryVariables = Exact<{
  input: ListTaskInput;
}>;


export type ListTaskQuery = { __typename?: 'Query', listTask: { __typename?: 'ListTaskOutput', ok: boolean, totalPages?: number | null, totalResults?: number | null, items?: Array<{ __typename?: 'Task', id: string, description: string, createdAt: any, updatedAt: any }> | null } };

export const TaskFieldsFragmentDoc = `
    fragment TaskFields on Task {
  id
  description
  createdAt
  updatedAt
}
    `;
export const CreateTaskDocument = `
    mutation createTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    ok
    item {
      ...TaskFields
    }
  }
}
    ${TaskFieldsFragmentDoc}`;
export const useCreateTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateTaskMutation, TError, CreateTaskMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateTaskMutation, TError, CreateTaskMutationVariables, TContext>(
      ['createTask'],
      (variables?: CreateTaskMutationVariables) => fetcher<CreateTaskMutation, CreateTaskMutationVariables>(client, CreateTaskDocument, variables, headers)(),
      options
    );
export const DeleteTaskDocument = `
    mutation deleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    ok
    error
  }
}
    `;
export const useDeleteTaskMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteTaskMutation, TError, DeleteTaskMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteTaskMutation, TError, DeleteTaskMutationVariables, TContext>(
      ['deleteTask'],
      (variables?: DeleteTaskMutationVariables) => fetcher<DeleteTaskMutation, DeleteTaskMutationVariables>(client, DeleteTaskDocument, variables, headers)(),
      options
    );
export const ListTaskDocument = `
    query listTask($input: ListTaskInput!) {
  listTask(input: $input) {
    ok
    totalPages
    totalResults
    items {
      ...TaskFields
    }
  }
}
    ${TaskFieldsFragmentDoc}`;
export const useListTaskQuery = <
      TData = ListTaskQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ListTaskQueryVariables,
      options?: UseQueryOptions<ListTaskQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ListTaskQuery, TError, TData>(
      ['listTask', variables],
      fetcher<ListTaskQuery, ListTaskQueryVariables>(client, ListTaskDocument, variables, headers),
      options
    );