chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.action === "getLocalStorage") {
    sendResponse({ tokens: localStorage.getItem("tokens") })
  }

  if(request.action === "setLocalStorage") {
    const tokens = JSON.parse(localStorage.getItem("tokens")) || []
    tokens.push(request.key)
    localStorage.setItem("tokens", JSON.stringify(tokens))
  }

  if(request.action === "removeLocalStorage") {
    const tokens = JSON.parse(localStorage.getItem("tokens")) || []
    localStorage.setItem("tokens", JSON.stringify(tokens.filter(token => token !== request.key)))
  }
});