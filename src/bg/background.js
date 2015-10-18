var states = new Object();

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      var id = tabs[0].id;
      console.log("Background: request from " + id);
      if(request.method == "setState") {
        console.log("Background: setting state");
        states[id] = request.state;
        sendResponse({});
      } else if(request.method == "getState") {
        console.log("Background: getting state");
        var state = states[id];
        sendResponse(state);
      } else if(request.method == "removeState") {
        console.log("Background: removing state");
        delete states[id];
        sendResponse({});
      } else {
        console.log("Background: other method");
        sendResponse({});
      }
    });
  }
);

function refresh() {
  var timestamp = Math.floor(Date.now() / 1000);
  console.log(timestamp);
  for (var tab in states) {
    if (states.hasOwnProperty(tab)) {
      if (timestamp % states[tab] == 0)
      {
        console.log("Reloading tab " + tab);
        chrome.tabs.reload(parseInt(tab));
      }
    }
  }
}

setInterval(refresh, 1000);