var input = document.getElementById("inputId");
var output = document.getElementById("outputId");
var agent;

function change() {
    output.textContent = input.value + " second(s)";
}

function refresh() {
    // Code to execute
    output.textContent = "hola";
}

function stop() {
    clearInterval(agent);
}

function update() {
    stop();
    agent = setInterval(refresh, input.value * 1000)
}

document.getElementById('inputId').onchange = change;
document.getElementById('buttonSet').onclick = update;
document.getElementById('buttonStop').onclick = stop;