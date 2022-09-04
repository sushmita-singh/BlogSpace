let postsArray = []
const formEl = document.getElementById("new-blog-post")

// Rendering the fetched posts into the DOM
function renderPosts() {
    let postHtml = ""
    for (let post of postsArray) {
       postHtml += `
                <div class="blogpost">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-body">${post.body}</p>
                </div>
            `
    }
    document.getElementById("container").innerHTML = postHtml
}

// Fetching the posts from the server
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()        
    })

// On submit sending the new post to the server and simultaneously posting it on
// our website
formEl.addEventListener("submit", function(event){
    event.preventDefault()
    const postTitle = document.getElementById("title").value
    const postBody = document.getElementById("body").value
    const data = {
        title: postTitle,
        body: postBody
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch('https://apis.scrimba.com/jsonplaceholder/posts',options)
        .then(response => response.json())
        .then(post => {
            postsArray.unshift(post)
            console.log(postsArray)
            renderPosts()
            formEl.reset()
        })
});

