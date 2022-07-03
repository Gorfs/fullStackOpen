require("dotenv").config()

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? "mongodb+srv://admin:admin@cluster0.tskiu.mongodb.net/Bloglist-test?retryWrites=true&w=majority"
    : "mongodb+srv://admin:admin@cluster0.tskiu.mongodb.net/Bloglist?retryWrites=true&w=majority"
const PORT = 3003

module.exports = {
  mongoUrl,
  PORT,
}
