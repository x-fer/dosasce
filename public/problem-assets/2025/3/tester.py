import sys
import math


S = 40000.0


def parse_input(lines):
    idx = 0

    N = int(lines[idx].strip())
    idx += 1

    weights = list(map(int, lines[idx].split()))
    idx += 1

    M = int(lines[idx].strip())
    idx += 1

    capacities = list(map(int, lines[idx].split()))
    idx += 1

    fuel = list(map(int, lines[idx].split()))
    idx += 1

    K = int(lines[idx].strip())
    idx += 1

    destinations = []

    for _ in range(K):
        coord_part, gift_part = lines[idx].strip().split("|")
        idx += 1

        x_str, y_str = coord_part.split()
        x = float(x_str)
        y = float(y_str)

        demand = {}
        for g in gift_part.split(","):
            t, q = g.split(":")
            demand[int(t)] = int(q)

        destinations.append((x, y, demand))

    return weights, capacities, fuel, M, K, destinations


def distance(a, b):
    return math.hypot(a[0] - b[0], a[1] - b[1])


def calculate(user_solution, problem_input):
    weights, capacities, fuel, M, K, destinations = parse_input(problem_input)

    routes = user_solution.strip().split("\n")

    total_fuel_cost = 0.0
    sled_loads = [0.0 for _ in range(M)]

    for i in range(M):
        line = routes[i].strip()

        if line == "-":
            continue

        current_pos = (0.0, 0.0)
        sled_distance = 0.0

        parts = line.split(" ")

        for part in parts:
            dest_str, gifts_str = part.split("|")
            d = int(dest_str) - 1

            dx, dy, _ = destinations[d]
            next_pos = (dx, dy)

            sled_distance += distance(current_pos, next_pos)
            current_pos = next_pos

            for g in gifts_str.split(","):
                t_str, q_str = g.split(":")
                t = int(t_str) - 1
                q = int(q_str)

                sled_loads[i] += weights[t] * q

        sled_distance += distance(current_pos, (0.0, 0.0))
        total_fuel_cost += sled_distance * fuel[i]

    score_efficiency = 70000.0 / (1.0 + total_fuel_cost / S)

    loads_ratio = []
    for i in range(M):
        if capacities[i] > 0:
            loads_ratio.append(sled_loads[i] / capacities[i])

    if loads_ratio:
        max_load = max(loads_ratio)
        min_load = min(loads_ratio)
        spread = max_load - min_load
        score_balance = (1.0 - spread) ** 2 * 30000.0
    else:
        score_balance = 30000.0

    total_score = score_efficiency + score_balance
    return total_score


with open("input.txt", "r") as f:
    problem_input = f.readlines()

user_solution = sys.stdin.read().strip()
total_score = calculate(user_solution, problem_input)
print(f"{total_score:.2f}")
