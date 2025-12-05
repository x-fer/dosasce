import sys

D_MAX = 230136843644340  # Kako bi spektar bodova bio širi ovo nije teoretski najgori slučaj nego maksimalna suma dobivena korištenjem najbanalnijeg greedy algoritma (bez sortiranja)
D_MIN = 171514003252241  # Teoretski optimum, suma svih brojeva podijeljena s brojem poklona (420) zaokružena na višu decimalu
SCORE_RANGE = 100000.0
DIFFERENCE_RANGE = D_MAX - D_MIN


def parse_user_solution(user_solution_str, input_set_list):
    PARTITIONS = []

    input_lines = user_solution_str.strip().split("\n")

    line_count = 0
    for line in input_lines:
        line_count += 1
        line = line.strip()

        if not line:
            continue

        indices = [int(x) for x in line.split()]
        partition_values = [input_set_list[i] for i in indices]
        PARTITIONS.append(partition_values)

    return PARTITIONS


def calculate(user_solution_str, input_set_list):
    partitions = parse_user_solution(user_solution_str, input_set_list)

    largest_sum = -1

    for partition in partitions:
        current_sum = sum(partition)
        if current_sum > largest_sum:
            largest_sum = current_sum

    if largest_sum == -1:
        points = 0.0
    elif largest_sum >= D_MAX:
        points = 0.0
    elif largest_sum <= D_MIN:
        points = SCORE_RANGE
    else:
        points = SCORE_RANGE * (D_MAX - largest_sum) / DIFFERENCE_RANGE

    return points


with open("input.txt", "r") as f:
    problem_input = [int(line.strip()) for line in f if line.strip()]

user_solution = sys.stdin.read()
total_score = calculate(user_solution, problem_input)
print(f"{total_score:.2f}")
