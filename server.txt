import express from "express"

const app = express()
const contacts = require("./contacts.json")

app.get("/", (req, res) =>
  res.send("Hello World!")
)

app.listen(3009, () =>
  console.log("Example app listening on port 3000!")
)

app.get("/contacts", (req, res) => {
  res.send(contacts)
})

app.get("/contacts/:id", (req, res) => {
    if (contacts.contacts[req.params.id-1]) {
      res.send(contacts.contacts[req.params.id-1])
    } else {
      res.status(404).send("Sorry can't find that!")
    }
  }
)

app.use(function (req, res, next) {
  console.log("cant find that")
  res.status(404).send("Sorry can't find that! app.use")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
