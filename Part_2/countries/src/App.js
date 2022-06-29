import MainHeader from "./components/MainHeader"
import SearchBar from "./components/SearchBar"
import CountriesSection from "./components/CountriesSection"
import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled")
      setCountries(
        response.data.map((country) => {
          return country
        })
      )
      updateCountries("")
    })
  }, [])

  const API_KEY = process.env.REACT_APP_KEY

  const handleChange = (event) => {
    console.log("updating the countries")
    updateCountries(event.target.value)
    console.log("handeling change in filter ", event.target.value)
    setFilter(event.target.value)
    console.log("evt target value is ", event.target.value)
    console.log("filter has been changed")
  }

  const updateCountries = (newfilter) => {
    let tempArr = []
    for (let i = 0; i < countries.length; i++) {
      if (
        countries[i].name.common.toLowerCase().includes(newfilter.toLowerCase())
      ) {
        tempArr.push(countries[i])
      }
    }
    console.log("settings new countries to ", tempArr)
    setFilteredCountries(tempArr)
  }

  return (
    <div>
      <MainHeader />
      <SearchBar onChange={handleChange} value={filter} />
      <CountriesSection API={API_KEY} countries={filteredCountries} />
    </div>
  )
}

export default App
