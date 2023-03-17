# keystone-t3

A monorepo built for rapid full stack web development using KeystoneJS and tRPC. This repository contains a CMS, UI component library and end-to-end tests. The packages are organized by their functionalities and can be developed and tested independently.

- `cms`: KeystoneJS CMS
- `app`: Screens with data fetching with UI components
- `ui`: UI library with twin.macro and stitches
- `e2e`: End-to-end tests using Playwright

The monorepo also includes client applications
- `astro-app`: Astro web application
- `next-app`: Next.js web application

## 📦 Installation

Install all packages and dependencies using:

```bash
git clone https://github.com/lachlanhawthorne/keystone-t3.git
pnpm
```

## 🛠 Development

You can run all apps and packages simultaneously from the root directory or individually using:

```bash
pnpm dev
```
```bash
pnpm cms:dev
pnpm ui:dev

pnpm astro-app:dev
pnpm next-app:dev
pnpm remix-app:dev
pnpm qwick-app:dev
pnpm vite-app:dev
```

### Adding UI Components

You can quickly generate new components with Storybook stories and tests using: 

```bash
pnpm ui:new
```

For more information on generating styled components, follow the guidelines outlined in the [twin.macro documentation](https://github.com/ben-rogerson/twin.macro#styled-components).

## 📖 Storybook

The `ui` package is configured to use [Storybook](https://storybook.js.org/) for component development. You can run Storybook using:

```bash
pnpm storybook:dev
```

## 📡 Data Fetching

The `e2e` package contains an adapter create a tRPC server and client using KeystoneJS. This allows you to use KeystoneJS as a data source for your tRPC API.

To link a new KeystoneJS project to the tRPC server, add the following to your KeystoneJS `schema.ts` file:

```typescript
import { KeystoneContext } from '@keystone-next/types';
import { createKeystoneAdapter } from '@keystone-next-trpc-twin.macro/e2e';

export const keystone = new Keystone({
  adapter: createKeystoneAdapter({
    context: KeystoneContext,
    schemaName: 'public',
  }),
});
```

To link a new Next.js project to the tRPC client, add the following to your Next.js `pages/api/trpc/[trpc].ts` file:

```typescript
import { createNextApiHandler } from '@keystone-next-trpc-twin.macro/e2e';

export default createNextApiHandler();
```

### Creating Routes

To create a new tRPC route, add a new file to the `e2e/routes` directory. The file should export a function that returns a tRPC route. For example:

```typescript
import { createRouter } from '@trpc/server';
import { createContext } from '@keystone-next-trpc-twin.macro/e2e';

export const createRoutes = () =>
  createRouter()
    .query('hello', {
      resolve() {
        return 'Hello World!';
      },
    })
    .mutation('createUser', {
      input: z.object({
        name: z.string(),
      }),
      resolve({ input }) {
        return createContext().db.user.create({
          data: {
            name: input.name,
          },
        });
      },
    });
```

### Using Routes

To use a tRPC route, import the `useQuery` or `useMutation` hook from `@trpc/react` and pass the route name as the first argument. For example:

```typescript
import { useQuery, useMutation } from '@trpc/react';

const { data } = useQuery('hello');
const [createUser] = useMutation('createUser');
```


## 🌐 Accessibility and Internationalization

## 🔐 Security

To add access control to a tRPC route, add a `middleware` function to the route. For example:

```typescript
import { createRouter } from '@trpc/server';
import { createContext } from '@keystone-next-trpc-twin.macro/e2e';

export const createRoutes = () =>
  createRouter()
    .query('hello', {
      resolve() {
        return 'Hello World!';
      },
    })
    .mutation('updateUser', {
      input: z.object({
        id: z.string(),
        name: z.string(),
      }),
      resolve({ input }) {
        return createContext().db.user.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
          },
        });
      },
    }
    .middleware(async ({ ctx, next }) => {
      if (!ctx.session?.data?.userId) {
        throw new Error('Not authenticated');
      }

      return next();
    });
```

## 📊 SEO and Analytics

## 🧪 Testing
You tests for all apps and packages  simultaneously or individually using:

```bash
pnpm test
```
```bash
pnpm cms:test
pnpm web:test
pnpm ui:test
pnpm e2e:test
```

## 🚀 Deployment

To build a production version of the `cms` or `web` application, navigate to the respective directory and run `pnpm build`. This will build the application and output the files to the `build` directory. You can build all apps and packages using:

```bash
pnpm build
```

Refer to the [KeystoneJS documentation](https://www.keystonejs.com/guides/deployment) and the [NextJS documentation](https://nextjs.org/docs/deployment) for further deployment instructions.

## 🚦 GitHub CI

This repository is configured to use GitHub CI for continuous integration. Any changes pushed to the `master` branch will trigger a build and test run.

Any changes to the UI package will trigger 

## 📚 Resources
* [KeystoneJS](https://www.keystonejs.com/)
* [tRPC](https://github.com/trpc/trpc)
* [twin.macro](https://github.com/ben-rogerson/twin.macro)
* [Tailwind](https://tailwindcss.com/)
* [Playwright](https://github.com/microsoft/playwright)

