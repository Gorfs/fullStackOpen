import Country from "./Country"
import Button from "./Button"

import { useEffect, useState } from "react"

const CountriesSection = ({ countries, API }) => {
  const [name, setName] = useState("")
  //the showCountries is an array of objets called the name of the country and a value of showCountry boolean
  const [showCountries, setShowCountries] = useState(
    countries.map(
      (country) => (country = { name: country.name.common, details: false })
    )
  )
  console.log("countries to be shown are pizzazely ", countries)
  const updateCountries = (name, details) => {
    let tempArr = []
    for (let i = 0; i < countries.length; i++) {
      console.log("looking at ", showCountries[i])
      if (countries[i].name.common === name) {
        tempArr.push({ name: name, details: details })
      } else if (
        showCountries.find(
          (country) => country.name === countries[i].name.common
        )
      ) {
        tempArr.push({
          name: showCountries[i].name,
          details: showCountries[i].details,
        })
      } else {
        tempArr.push({
          name: countries[i].name.common,
          details: false,
        })
      }
    }
    console.log(tempArr, "is the temp arr and the name is ", name)
    setShowCountries(tempArr)
  }

  const handleClick = (event) => {
    console.log("handeling a click from ", event.target.innerText)
    console.log(event.target.id)
    if (event.target.innerText === "hide") {
      updateCountries(event.target.id, false)
    } else {
      updateCountries(event.target.id, true)
    }
  }
  //updateCountries("")
  console.log("the countries to be shown are ", showCountries)
  if (countries.length === 250 || countries.length === 0) {
    return (
      <div>
        There are no countries that have that name please type in your search
      </div>
    )
  } else if (countries.length === 1) {
    let name = countries[0].name.common
    console.log(name, "we are at the countries section part of the voyage")
    return (
      <div>
        <Country country={countries[0]} details={true} API={API} />
      </div>
    )
  } else if (countries.length < 10) {
    console.log(countries, " and the show coutries are ", showCountries)
    return (
      <div>
        {countries.map((country, i) => (
          <div key={country.name.common}>
            <Country
              API={API}
              country={country}
              details={
                showCountries.length > 0
                  ? showCountries[i].details === true
                    ? true
                    : false
                  : false
              }
            />
            <Button
              name={country.name.common}
              text={
                showCountries.length === 0
                  ? "show"
                  : showCountries[i].details === true
                  ? "hide"
                  : "show"
              }
              handleClick={handleClick}
            />
          </div>
        ))}
      </div>
    )
  } else {
    return <div>Please refine your search</div>
  }
}

export default CountriesSection
