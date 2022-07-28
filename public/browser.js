// item -> parameter
function itemTemplate(item) {
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>`
}

// Create Feature
let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", function(e) {
  e.preventDefault()
  axios.post('/create-item', {text: createField.value}).then(function (response) {
    // Create the HTML for a new item
    // response.data gets the newest doc in the DB the server is sending back to the DOM
    document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
    createField.value = ""
    createField.focus()
  }).catch(function() {
    console.log("Please try again later.")
  })
})



document.addEventListener("click", function(e) {
  // Delete function
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Do you really want to delete this item permanetly?")) {
      axios.post('/delete-item', {id: e.target.getAttribute("data-id")}).then(function() {
        // targetting the editted element
        // parentElement is targetting item-text in server.js
        // remove() deletes list item
        e.target.parentElement.parentElement.remove()
      }).catch(function () {
        console.log("Try again later")
      })      
    }
  }
  // if the element that was clicked contains "edit-me" will run this conditnion
  // edit function
  if (e.target.classList.contains("edit-me")) {
    // web browser function
    // e.target pre-populates form field when editing
    let userInput =  prompt("Enter your desired text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if (userInput) {
      // using axios to post data, to return a promise
      // post - first arguement is the url, second arguement is the data
      // then
      // catch
      axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {
        // targetting the editted element
        // Get the HTML content of an element with "item-text":
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
      }).catch(function () {
        console.log("Try again later")
      })
    }
  }
})