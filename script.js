let cookies = 0;
let buildings = [];

function clickCookie() {
    cookies += 1;
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('cookieCount').innerText = Math.floor(cookies);
}

function loadBuildings() {
    fetch('/generate_buildings')
        .then(res => res.json())
        .then(data => {
            buildings = data;
            renderBuildings();
        });
}

function renderBuildings() {
    let html = '';
    buildings.forEach((b, i) => {
        html += `<div>
                    <strong>${b.name}</strong> - Cost: ${Math.floor(b.cost)} - CPS: ${b.cps} - Owned: ${b.owned}
                    <button onclick="buyBuilding(${i})">Buy</button>
                 </div>`;
    });
    document.getElementById('buildings').innerHTML = html;
}

function buyBuilding(index) {
    let b = buildings[index];
    if(cookies >= b.cost){
        cookies -= b.cost;
        b.owned += 1;
        b.cost = Math.floor(b.cost * 1.15);
        updateDisplay();
        renderBuildings();
    } else {
        alert("Not enough cookies!");
    }
}

function accumulateCPS() {
    let totalCPS = buildings.reduce((sum, b) => sum + b.cps * b.owned, 0);
    cookies += totalCPS / 10; // 10 ticks per second
    updateDisplay();
}
setInterval(accumulateCPS, 100);

function openAdminPanel() {
    cookies += 10000;
    buildings.forEach(b => b.owned += 1);
    updateDisplay();
    renderBuildings();
}

window.onload = loadBuildings;
