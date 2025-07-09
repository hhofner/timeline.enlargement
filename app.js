import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.5.min.js"

const {input, button, div, header, p} = van.tags

const hasTimeline = van.state(false)
const serverUrl = van.state("")
const posts = van.state([])

const fetchTimeline = async () => {
  try {
    const res = await fetch(`${serverUrl.val}/api/v1/timelines/public?limit=5&local=true`)
    if (!res.ok) throw new Error("Failed to fetch timeline")
    const data = await res.json()
    posts.val = data
    hasTimeline.val = true
  } catch (err) {
    console.error(err)
    posts.val = [{content: "<b>Failed to load timeline.</b>"}]
    hasTimeline.val = true
  }
}

const fetchTestTimeline = async () => {
  posts.val = [
    {content: "It’s back in the 20s in Bihoro with a nice cool breeze 😍"},
    {content: "finished the second driving lesson. The owner of the school sat in the back mid way thru. Spoke a bit too fast, too technical, got me all twisted. Felt more confident as I got pointed out for mistakes or where I'm going to get points deducted. Kept doing the s curve and crank. Figured out what I have to focus on on Thursday"},
    {content: "I have finally joined the 3d printer's club. Ordered a Prusa for the kids to have something to work on this summer. Ok, I mostly got it for me, but it is good for them to learn and makes a good justification. And now I wait..." },
  ]
  hasTimeline.val = true
}

const Timeline = () => div(
  posts.val.map(post =>
    div({class: 'post'},
      header({class: 'post-header'}, `${post.account.display_name}`),
      p({class: 'text', innerHTML: post.content}),
      button({class: 'text-btn'}, 'View Post')
    )
  )
)

const Init = () => div(() =>
  hasTimeline.val ?
    Timeline() :
    div(
      input({
        type: "text",
        placeholder: "https://your.mastodon.server",
        oninput: e => serverUrl.val = e.target.value
      }),
      button({onclick: fetchTimeline}, "view")
    )
)

van.add(document.body, Init())
