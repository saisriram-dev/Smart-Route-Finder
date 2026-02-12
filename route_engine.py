# ===== Graph Structure =====

graph = {}

def add_edge(a, b, d):
    if a not in graph:
        graph[a] = []
    if b not in graph:
        graph[b] = []

    graph[a].append((b, d))
    graph[b].append((a, d))


# ===== Distance Connections =====

add_edge("Main Gate", "AB1", 120)
add_edge("Main Gate", "IT Canteen", 150)

add_edge("AB1", "AB2", 60)
add_edge("AB2", "AB3", 55)
add_edge("AB3", "AB4", 50)

add_edge("AB2", "Sopnam Canteen", 90)
add_edge("AB3", "IT Canteen", 110)

add_edge("IT Canteen", "Boys 1st year Mess hall", 70)
add_edge("Boys 1st year Mess hall", "Boys 2nd year Mess hall", 65)

add_edge("AB4", "Kashyapa Bhavanam", 140)
add_edge("Kashyapa Bhavanam", "Gym", 80)

add_edge("Gym", "Volleyball court (near gym)", 35)
add_edge("Gym", "Synthetic Volleyball court", 75)

add_edge("Synthetic Volleyball court", "Synthetic Basketball court", 40)
add_edge("Synthetic Basketball court",
         "Volleyball court (adjacent to Synthetic Basketball court)", 25)

add_edge("Sopnam Canteen", "Kashyapa Bhavanam", 130)
add_edge("IT Canteen", "Kashyapa Bhavanam", 160)

add_edge("Boys 2nd year Mess hall", "Gym", 120)
add_edge("AB1", "Sopnam Canteen", 100)


# ===== Dijkstra =====

def dijkstra(start, end):
    distances = {node: float('inf') for node in graph}
    parent = {node: None for node in graph}
    visited = set()
    ops = 0

    distances[start] = 0

    while True:
        closest = None
        min_dist = float('inf')

        for node in distances:
            ops += 1
            if node not in visited and distances[node] < min_dist:
                min_dist = distances[node]
                closest = node

        if closest is None or closest == end:
            break

        visited.add(closest)

        for neighbor, weight in graph[closest]:
            ops += 1
            new_dist = distances[closest] + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                parent[neighbor] = closest

    path = []
    cur = end
    while cur is not None:
        path.append(cur)
        cur = parent[cur]

    path.reverse()
    return distances[end], path, ops
