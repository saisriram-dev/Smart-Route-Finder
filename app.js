const places = [
"Main Gate","AB1","AB2","AB3","AB4",
"Sopnam Canteen","IT Canteen",
"Boys 1st year Mess hall","Boys 2nd year Mess hall",
"Kashyapa Bhavanam","Gym",
"Volleyball court (near gym)",
"Synthetic Volleyball court",
"Synthetic Basketball court",
"Volleyball court (adjacent to Synthetic Basketball court)"
];

const startSelect = document.getElementById("start");
const endSelect = document.getElementById("end");
const resultText = document.getElementById("resultText");

/* Fill dropdowns */

places.forEach(place => {
    startSelect.add(new Option(place, place));
    endSelect.add(new Option(place, place));
});

/* Button click */

document.getElementById("findBtn").addEventListener("click", async () => {

    const start = startSelect.value;
    const end = endSelect.value;

    if (start === end) {
        resultText.innerHTML = "⚠️ Start and destination are the same.";
        return;
    }

    const url =
        `http://127.0.0.1:5000/route?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;

    resultText.innerHTML = "Calculating optimal route...";

    try {

        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            resultText.innerHTML = data.error;
            return;
        }

        resultText.innerHTML =
            "<b>🧭 Shortest Path:</b><br>" +
            data.path.join(" → ") +
            "<br><br><b>📏 Total Distance:</b> " + data.distance + " meters" +
            "<br><b>⚙️ Operations:</b> " + data.operations;

    }

    catch {
        resultText.innerHTML = "❌ Server not reachable";
    }

});