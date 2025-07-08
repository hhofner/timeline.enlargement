import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.5.min.js"

const {button, div, pre} = van.tags

let isLoggedIn = van.state(false)

const Init = () => {
  if (isLoggedIn.val) {
    return div("logged in!")
  } else {
    return div(button({onclick: () => isLoggedIn.val = true}, "log in"), div("not logged in!"))
  }
}

van.add(document.body, Init())
