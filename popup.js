function loadTokens() {
  chrome.runtime.sendMessage({ action: "getLocalStorage" }, function(response) {
    const tokens = JSON.parse(response.tokens)

    tokens.map(token => {
      const li = document.createElement("li")
      li.innerText = token
      li.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "removeLocalStorage", key: token })
        document.getElementById("list").removeChild(li)
      })
      document.getElementById("list").appendChild(li)
    })
  })
}

window.onload = () => {
  loadTokens()
}

document.getElementById("token").addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    addToken()
  }
})

document.getElementById("addButton").addEventListener("click", () => {
  addToken()
})

function addToken() {
  if(!document.getElementById("token").value) return

  const token = document.getElementById("token").value
  const li = document.createElement("li")
  li.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "removeLocalStorage", key: token })
    document.getElementById("list").removeChild(li)
  })
  li.innerText = document.getElementById("token").value
  document.getElementById("list").appendChild(li)

  chrome.runtime.sendMessage({ action: "setLocalStorage", key: document.getElementById("token").value })
  document.getElementById("token").value = ""
}