// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


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
        states = delete states[id];
        sendResponse({});
      } else {
        console.log("Background: other method");
        sendResponse({});
      }
    });
  });