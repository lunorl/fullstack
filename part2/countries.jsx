import { useState, useEffect } from 'react'
import axios from 'axios'

const View = (country) => {
  country = country.country
  console.log(country.flags.png);
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital} <br />
      area {country.area}
      <h3>languages:</h3  >
      <ul>
        {Object.values(country.languages).map(c => <li key={Object.values(country.languages).indexOf(c)}>{c}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
      <h2>Weather in {country.capital}</h2>
    </div>
  )
}
const Countries = ({countries, search}) => {
  let left = countries.map(country => country.name.common);
  left = left.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  const [isClicked, setIsClicked] = useState({});

  const handleClick = (index) => {
    setIsClicked(prev => ({
      ...prev,
      [index]: !prev[index]
  }));
}
  if (left.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div> 
    )
  }
  else if (left.length === 1) {
    const countrye = countries.find(c => c.name.common === left[0])
    return (
      <div>
        <View country={countrye}/>
        </div>
    )
  }
  else {
  return (
    <div>
        {left.map((l, i) => <li key={l}>{l}<button key={i} onClick={() => handleClick(i)}>{isClicked[i] ? 'unshow' : 'show'}</button>{isClicked[i] && <View country={countries.find(c => c.name.common === l)}/>}</li>)}
    </div>
  )
  }
}
const App = () => {
  const [search, setSearch] = useState('')    
  const [countries, setCountries] = useState([]) 
  useEffect(() => {  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
    const countries = response.data;

    const names = countries.map(country => country.name.common);
    setCountries(countries)
  })}, [])
  return ( 
  <div>
    find countries <input onChange={e => setSearch(e.target.value)}></input>  
    <Countries countries={countries} search={search} />
    </div>
  )
}
export default App    
