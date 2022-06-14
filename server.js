// Establishing Express & MongoDb
let express = require('express')
let {MongoClient} = require('mongodb')

// declaring variables
let app = express()
let db

// enabling express to use files from public folder
app.use(express.static('public'))

async function go() {
  let client = new MongoClient('mongodb+srv://kshrestha:K$hr3Z123@cluster0.7ams9kk.mongodb.net/TodoApp?retryWrites=true&w=majority')
  await client.connect()
  db = client.db()
  app.listen(3000)
}

// executing function
go()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res) {
  // Setting up DB, "find" (read,load) is mongodb function to search data
  // toArray helps convert data to an Array
  db.collection('items').find().toArray(function(err, items) {
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
        
        <ul class="list-group pb-5">
        <!-- function(item) is declaring the parameter to pull data from the collection -->
          ${items.map(function(item) {
            return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>`
          }).join('')}
        </ul>
        
      </div>
    
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
    </body>
    </html>`)
  })
})

// POST method to submit Data to MongoDB
app.post('/create-item', function(req, res) {
// where the data is being saved in the DB
// going to 'items' in mongo DB, saving the value of the input, followed by a sucessful response
// insertOne is the obj
db.collection('items').insertOne({text: req.body.item}, function() {
  res.redirect('/')
  })
})

// post to update-item
app.post('/update-item', function(req, res) {
  // displaying axios request
  console.log(req.body.text)
  res.send("Success")
})