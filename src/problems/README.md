# Problems folder

This directory stores all competition challenges. Each year has its own folder and each challenge in that year is numbered. A typical path is `problems/2025/1`.

Every challenge folder includes three files.

- a markdown file describes the challenge.
- an image file is an optional illustration for the challenge.
- a TypeScript file exports two things. The `sanitize` function checks and normalizes the user submission. The `config` object reads the Judge0 endpoint from an environment variable dedicated to that problem.

Example layout

```text
problems
 └─ 2025
    └─ 1
       ├─ challenge.md
       ├─ image.png
       └─ config.ts
```

Example config.ts

```ts
export function sanitize(input: string) {
  return input.trim();
}

export const config = {
  judge: process.env.JUDGE0_2025_1,
};
```

Each challenge points to its own Judge0 runner. To add a new challenge create a new folder with the next number and include the three files mentioned above.
