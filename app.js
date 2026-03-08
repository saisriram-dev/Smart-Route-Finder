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

const start = document.getElementById("start");
const end = document.getElementById("end");
const result = document.getElementById("resultText");

places.forEach(place => {
    start.add(new Option(place, place));
    end.add(new Option(place, place));
});

document.getElementById("findBtn").onclick = async () => {

    if (start.value === end.value) {
        result.innerHTML = "Start and destination cannot be the same";
        return;
    }

    const response = await fetch(
        `http://127.0.0.1:5000/route?start=${start.value}&end=${end.value}`
    );

    const data = await response.json();

    result.innerHTML =
        "<b>Shortest Path:</b><br>" +
        data.path.join(" → ") +
        "<br><br><b>Distance:</b> " + data.distance + " meters";
};
