import React,{useState, useEffect} from 'react'
import axios from 'axios'

const App_countries = () => {
    const [keyword, setKeyword] = useState('')
    const [countries, setCountries] = useState([])
    const [filterCountries, setFilterCountries] = useState([])
    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data)
        })
    }, [])
    const handleSearch = (event) => {
        setKeyword(event.target.value)
        setFilterCountries(countries.reduce((prev,country) => {
            if(country.name.includes(event.target.value)){
                prev.push(country)
                return prev
            }
            return prev
        }, []))
    }
    return (
        <div>
            <div>
                find countries <input value={keyword} onChange={(event) => handleSearch(event)}></input>
            </div>
            {filterCountries.length > 10 ? <p>Too Many Matches,spiecify another filter</p> : (
                filterCountries.map(country => <p key={country.alpha2Code}>{country.name}</p>)
            )}
        </div>
    )
}

export default App_countries
