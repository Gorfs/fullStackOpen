require("dotenv").config()

const mongoUrl =
  process.env.NODE_ENV === "test"
    ? "mongodb+srv://admin:admin@cluster0.tskiu.mongodb.net/Bloglist?retryWrites=true&w=majority"
    : "mongodb+srv://admin:admin@cluster0.tskiu.mongodb.net/Bloglist?retryWrites=true&w=majority"
const PORT = 3003

const SECRET =
  "fjdkosa;fgheuiwaongvdfjkalfjedsakfhewruqaibdjksalfijhaioweed34214312dfkajp34#$#*(#*@3kdfas"

module.exports = {
  mongoUrl,
  PORT,
  SECRET,
}
