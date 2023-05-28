import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  // schema: 'http://127.0.0.1:7071/api/graphql',
  schema: 'https://azapigql.azurewebsites.net/api/graphql',
  documents: 'src/**/*.gql',
  generates: {
    'src/gql/index.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
        {
          add: {
            content: '// @ts-nocheck',
          },
        },
      ],
      config: {
        fetcher: 'graphql-request',
      },
    },
  },
};

export default config;