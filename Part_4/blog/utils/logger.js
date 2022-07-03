const info = (...params) => {
  if ((process.env.NODE_ENV = "production")) {
    console.log(...params)
  }
}

const error = (...params) => {
  if ((process.env.NODE_ENV = "production")) {
    console.log(...params)
  }
}

module.exports = { info, error }
