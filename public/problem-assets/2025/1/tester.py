import sys


def parse_matrix(lines):
    m = []
    for line in lines:
        parts = line.strip().split(",")
        row = []
        for v in parts:
            if v == "-":
                row.append(None)
            else:
                row.append(int(v))
        m.append(row)
    return m


def parse_solution(s):
    return [int(x) for x in s.split(",")]


def build_grid(sol, rows, cols):
    g = []
    for r in range(rows):
        g.append(sol[r * cols : (r + 1) * cols])
    return g


def happiness(mat, grid):
    r = len(grid)
    c = len(grid[0])
    total = 0
    mins = []
    for i in range(r):
        for j in range(c):
            idg = grid[i][j] - 1
            vals = []
            if i > 0:
                vals.append(mat[idg][grid[i - 1][j] - 1])
            if i < r - 1:
                vals.append(mat[idg][grid[i + 1][j] - 1])
            if j > 0:
                vals.append(mat[idg][grid[i][j - 1] - 1])
            if j < c - 1:
                vals.append(mat[idg][grid[i][j + 1] - 1])
            s = sum(vals)
            total += s
            mins.append(min(vals))
    return total, min(mins)


def calculate(user_solution, problem_input):
    mat = parse_matrix(problem_input)
    sol = parse_solution(user_solution)
    rows = 10
    cols = 100
    grid = build_grid(sol, rows, cols)
    total_h, min_h = happiness(mat, grid)
    score_total = (total_h / 378000) * 80000
    score_min = (min_h / 100) * 20000
    return score_total + score_min


with open("input.txt", "r") as f:
    problem_input = f.readlines()

user_solution = sys.argv[1]
total_score = calculate(user_solution, problem_input)
print(f"{total_score:.2f}")
