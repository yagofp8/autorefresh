var input = document.getElementById("inputId");
var output = document.getElementById("outputId");

// Functions to comunicate with background

function setState(state) {
  console.log("Tab: setting state to: " + state );
  chrome.extension.sendRequest({method: "setState", state: state}, function() {});
}

function getState() {
  console.log("Tab: getting state");
  chrome.extension.sendRequest({method: "getState"}, function(state) {
      console.log("STATE : "+state);
     if (!state)
     {
        output.textContent = input.value;
        console.log("Tab: not previous state");
        return;
     }
     output.textContent = state;
     input.value = state;
  });
}

function removeState() {
  console.log("Tab: removing state");
  chrome.extension.sendRequest({method: "removeState"}, function() {});
}

// Functions of the popup

function change() {
  output.textContent = input.value;
}

function start() {
  setState(input.value);
}

function stop() {
  removeState(input.value);
}

function check() {
  getState();
}

document.getElementById('inputId').oninput = change;
document.getElementById('buttonStart').onclick = start;
document.getElementById('buttonStop').onclick = stop;
window.onload = check;