// listening for click event from browser
document.addEventListener("click", function(e) {
  // if the element that was clicked contains "edit-me" will run this conditnion
  if (e.target.classList.contains("edit-me")) {
    // web browser function
    // e.target pre-populates form field when editing
    let userInput =  prompt("Enter your desired text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if (userInput) {
      // using axios to post data, to return a promise
      // post - first arguement is the url, second arguement is the data
      // then
      // catch
      axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
        // targetting the editted element
        e.target.parentElement.parentElement.querySelector(".item-text") = userInput
      }).catch(function () {
        console.log("Try again later")
      })
    }
  }
})