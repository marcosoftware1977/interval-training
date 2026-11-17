const schedule = [];

let currentIndex = 0;
let remaining = 0;
let timer = null;

const scheduleDiv = document.getElementById("schedule");

function renderSchedule() {
    scheduleDiv.innerHTML = "";

    schedule.forEach((item, index) => {
        const div = document.createElement("div");

        div.textContent =
            `${index + 1}. ${item.type === "walk" ? "🚶 Wandelen" : "🏃 Hardlopen"} - ${item.minutes} min - ${item.speed} km/u`;

        scheduleDiv.appendChild(div);
    });
}

document.getElementById("addBtn").addEventListener("click", () => {

    const type = document.getElementById("type").value;

    const minutes = parseFloat(
        document.getElementById("minutes").value.replace(",", ".")
    );

    const speed = parseFloat(
        document.getElementById("speed").value.replace(",", ".")
    );

    if (
        isNaN(minutes) ||
        minutes <= 0 ||
        isNaN(speed) ||
        speed <= 0
    ) {
        alert("Vul geldige waarden in.");
        return;
    }

    schedule.push({
        type,
        minutes,
        speed
    });

    renderSchedule();

    document.getElementById("minutes").value = "";
    document.getElementById("speed").value = "";
});

function showBlock() {

    if (currentIndex >= schedule.length) {

        clearInterval(timer);

        document.getElementById("currentActivity").textContent =
            "✅ Training voltooid";

        document.getElementById("timer").textContent =
            "00:00";

        document.getElementById("speedDisplay").textContent = "";

        return;
    }

    const block = schedule[currentIndex];

    remaining = Math.round(block.minutes * 60);

    if (block.type === "walk") {
        document.body.className = "walk-mode";
        document.getElementById("currentActivity").textContent =
            "🚶 Wandelen";
    } else {
        document.body.className = "run-mode";
        document.getElementById("currentActivity").textContent =
            "🏃 Hardlopen";
    }

    document.getElementById("speedDisplay").textContent =
        `Snelheid: ${block.speed} km/u`;
}

function updateTimer() {

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    remaining--;

    if (remaining < 0) {
        currentIndex++;
        showBlock();
    }
}

document.getElementById("startBtn").addEventListener("click", () => {

    if (schedule.length === 0) {
        alert("Voeg eerst een interval toe.");
        return;
    }

    clearInterval(timer);

    currentIndex = 0;

    showBlock();

    updateTimer();

    timer = setInterval(updateTimer, 1000);
});

document.getElementById("resetBtn").addEventListener("click", () => {

    clearInterval(timer);

    currentIndex = 0;
    remaining = 0;

    document.getElementById("timer").textContent =
        "00:00";

    document.getElementById("currentActivity").textContent =
        "Klaar om te starten";

    document.getElementById("speedDisplay").textContent = "";
});
