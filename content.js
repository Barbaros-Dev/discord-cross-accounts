document.addEventListener("keydown", function(event) {
  if(event.key === "Enter") {
    chrome.runtime.sendMessage({ action: "getLocalStorage" });

    const message = document.getElementsByClassName("slateTextArea__0661c")[0].textContent
    document.getElementsByClassName("button__8d734")[0].click()

    chrome.runtime.sendMessage({ action: "getLocalStorage" }, function(response) {
      const tokens = JSON.parse(response.tokens)
      tokens.map(token => {
        fetch(`https://discord.com/api/v9/channels/${window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
          body: JSON.stringify({
            content: message
          })
        })
      })
    })
  }
});