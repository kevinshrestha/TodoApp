// listening for click event from browser
document.addEventListener("click", function(e) {
  // if the element that was clicked contains "edit-me" will run this conditnion
  if (e.target.classList.contains("edit-me")) {
    // web browser function
    let userInput =  prompt("Enter your desired text")
    // using axios to post data, to return a promise
    // post - first arguement is the url, second arguement is the data
    // then
    // catch
    axios.post('/update-item', {text: userInput}).then(function() {
      // do something later
    }).catch(function () {
      console.log("Try again later")
    })
  }
})