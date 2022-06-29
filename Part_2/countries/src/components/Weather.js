import axios from "axios"
import { useState, useEffect } from "react"

const Weather = ({ country, API }) => {
  console.log("API key is ", API)
  const [data, setData] = useState("")
  console.log(
    "request is ",
    `http://api.weatherstack.com/current?access_key=${API}&query=${country.capital}`
  )
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API}&query=${country.capital}`
      )
      .then((response) => {
        console.log("setting data to ", response.data)
        setData(response.data)
      })
  }, [API, country])

  console.log("DATA IS ", data)
  if (data) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature is {data.current.temperature} degrees celcius </p>
        <img src={data.current.weather_icons[0]} alt="icon showing weather" />
        <p> It is {data.current.weather_descriptions[0]}</p>
        <p>UV index is {data.current.uv_index}</p>
      </div>
    )
  } else {
    return <p>currently pending</p>
  }
}
export default Weather
