import sys


def hamming_distance(str1, str2):
    return sum(c1 != c2 for c1, c2 in zip(str1, str2))


def calculate(input_string, string_list):
    distances = [hamming_distance(input_string, s) for s in string_list]
    max_distance = max(distances)
    total_distance = sum(distances)
    N = len(input_string)
    M = len(string_list)

    ratio_max = (N - max_distance) / N
    ratio_sum = (M * N - total_distance) / (M * N)

    max_score = 70000 * ratio_max
    sum_score = 30000 * ratio_sum
    total_score = max_score + sum_score

    return total_score


def sanitize(input_string):
    if len(input_string) != 100:
        raise Exception("Input string must be exactly 100 characters long.")
    allowed = set("IBESKDPOGL")
    if not all(c in allowed for c in input_string):
        raise Exception("Input string contains invalid characters.")


with open("input.txt", "r") as f:
    problem_input = f.readlines()


user_solution = sys.argv[1]
sanitize(user_solution)
total_score = calculate(user_solution, problem_input)
print(f"{total_score:.2f}")
