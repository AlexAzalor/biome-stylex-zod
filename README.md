# Tech stack

Main:

- [Zod](https://zod.dev/) - validates data types at runtime and allows you to prevent the entry of incorrect ones.
- [React Hook Form](https://react-hook-form.com/) - a simple and effective form that works great in combination with Zod.
- [Biome](https://biomejs.dev/) - ESLint + Prettier.

Core:

- [Next.js](https://nextjs.org/) - a popular open-source framework for building web applications with React.
- [TypeScript](https://www.typescriptlang.org/) - a strongly-typed superset of JavaScript that adds optional static typing and other features to the language.
- [Tailwind CSS](https://tailwindcss.com/) - a popular utility-first CSS framework that simplifies the process of designing and styling modern websites and web applications.

# Getting Started

1. Install packages

```bash
yarn install
```

2. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# To install in your project

### Install react-hook-form and zod

```bash
yarn add react-hook-form
```

```bash
yarn add @hookform/resolvers
```

```bash
yarn add zod
```

### Install biome

```bash
yarn add --dev --exact @biomejs/biome
```

After this, copy the file `biome.json` to your project and reload the VS Code.
