// ===== Locations =====
const places = [
"Main Gate",
"AB1",
"AB2",
"AB3",
"AB4",
"Sopnam Canteen",
"IT Canteen",
"Boys 1st year Mess hall",
"Boys 2nd year Mess hall",
"Kashyapa Bhavanam",
"Gym",
"Volleyball court (near gym)",
"Synthetic Volleyball court",
"Synthetic Basketball court",
"Volleyball court (adjacent to Synthetic Basketball court)"
];


// ===== Fill Dropdowns =====
const startSelect = document.getElementById("start");
const endSelect = document.getElementById("end");

places.forEach(place => {
    const opt1 = document.createElement("option");
    opt1.value = place;
    opt1.textContent = place;
    startSelect.appendChild(opt1);

    const opt2 = document.createElement("option");
    opt2.value = place;
    opt2.textContent = place;
    endSelect.appendChild(opt2);
});

// ===== Graph Structure =====
const graph = {};

function addEdge(a, b, d) {
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push({ node: b, dist: d });
    graph[b].push({ node: a, dist: d }); // undirected
}


// ===== Distance Connections =====
addEdge("Main Gate", "AB1", 120);
addEdge("Main Gate", "IT Canteen", 150);

addEdge("AB1", "AB2", 60);
addEdge("AB2", "AB3", 55);
addEdge("AB3", "AB4", 50);

addEdge("AB2", "Sopnam Canteen", 90);
addEdge("AB3", "IT Canteen", 110);

addEdge("IT Canteen", "Boys 1st year Mess hall", 70);
addEdge("Boys 1st year Mess hall", "Boys 2nd year Mess hall", 65);

addEdge("AB4", "Kashyapa Bhavanam", 140);
addEdge("Kashyapa Bhavanam", "Gym", 80);

addEdge("Gym", "Volleyball court (near gym)", 35);
addEdge("Gym", "Synthetic Volleyball court", 75);

addEdge("Synthetic Volleyball court", "Synthetic Basketball court", 40);
addEdge("Synthetic Basketball court", "Volleyball court (adjacent to Synthetic Basketball court)", 25);

addEdge("Sopnam Canteen", "Kashyapa Bhavanam", 130);
addEdge("IT Canteen", "Kashyapa Bhavanam", 160);

addEdge("Boys 2nd year Mess hall", "Gym", 120);
addEdge("AB1", "Sopnam Canteen", 100);

console.log(graph);

// ===== Dijkstra Shortest Path =====
function dijkstra(start, end) {

    const distances = {};
    const visited = new Set();
    const parent = {};

    // initialize
    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
        parent[node] = null;
    });

    distances[start] = 0;

    while (true) {

        // pick closest unvisited node
        let closest = null;
        let minDist = Infinity;

        for (let node in distances) {
            if (!visited.has(node) && distances[node] < minDist) {
                minDist = distances[node];
                closest = node;
            }
        }

        if (closest === null) break;
        if (closest === end) break;

        visited.add(closest);

        // relax neighbors
        for (let neighbor of graph[closest]) {
            const newDist = distances[closest] + neighbor.dist;

            if (newDist < distances[neighbor.node]) {
                distances[neighbor.node] = newDist;
                parent[neighbor.node] = closest;
            }
        }
    }

    // reconstruct path
    const path = [];
    let cur = end;

    while (cur) {
        path.push(cur);
        cur = parent[cur];
    }

    path.reverse();

    return {
        distance: distances[end],
        path: path
    };
}

// ===== Button Action =====
document.getElementById("findBtn").addEventListener("click", () => {

    const start = startSelect.value;
    const end = endSelect.value;

    if (start === end) {
        document.getElementById("resultText").textContent =
            "Start and destination are the same.";
        return;
    }

    const result = dijkstra(start, end);

    if (!result.path.length || result.distance === Infinity) {
        document.getElementById("resultText").textContent =
            "No route found.";
        return;
    }

    document.getElementById("resultText").innerHTML =
    "<b>Shortest Path:</b><br>" +
    result.path.join(" -> ") +
    "<br><b>Total Distance:</b> " + result.distance + " meters";
});
