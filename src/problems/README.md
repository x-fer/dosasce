# Problems folder

This directory stores all competition challenges. Each year has its own folder and each challenge in that year is numbered. A typical path is `problems/2025/1`.

## Year Configuration

Each year folder includes a `config.ts` file that contains:

- Global dates (competition end time - when all problems close, awards ceremony)
- Awards location and description
- Problems array with start dates (all problems stay open until endTime)

## Challenge Structure

Every challenge folder includes:

- `problem.md` - The problem description in markdown
- `banner.png` - Optional banner image for the problem
- `config.ts` - Problem-specific configuration (Judge0 endpoint, sanitize function)

Example layout

```text
problems
 └─ 2025
    ├─ config.ts        # Year-level configuration
    ├─ 1
    │  ├─ problem.md    # Problem description
    │  ├─ banner.png    # Optional banner image
    │  └─ config.ts     # Problem-specific configuration
    ├─ 2
    │  ├─ problem.md
    │  ├─ banner.png
    │  └─ config.ts
    └─ 3
       ├─ problem.md
       ├─ banner.png
       └─ config.ts
```

Example year config.ts (`2025/config.ts`)

```ts
export const config = {
  year: 2025,
  endTime: new Date(2025, 11, 21, 19, 0),
  awards: {
    date: new Date(2025, 11, 21, 19, 15),
    location: "FER, Unska 3, A202",
    description: "Dodjela nagrada za najbolje rješenje svakog zadatka.",
  },
};
```

Example problem config.ts (`2025/1/config.ts`)

```ts
export function sanitize(input: string) {
  return input.trim();
}

export const config = {
  judge0: process.env.JUDGE0_CHALLENGE_2025_1,
};
```

Each challenge points to its own Judge0 runner. To add a new challenge create a new folder with the next number and include the three files mentioned above.
