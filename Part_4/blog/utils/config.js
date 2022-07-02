require("dotenv").config()

const mongoUrl =
  "mongodb+srv://admin:admin@cluster0.tskiu.mongodb.net/Bloglist?retryWrites=true&w=majority"
const PORT = 3003

module.exports = {
  mongoUrl,
  PORT,
}
