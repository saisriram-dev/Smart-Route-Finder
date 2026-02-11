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
