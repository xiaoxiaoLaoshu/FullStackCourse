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
        const newCountries = countries.reduce((prev,country) => {
            if(country.name.toLowerCase().includes(event.target.value)){
                const newCountry = {
                    ...country,
                    isShow: false
                }
                prev.push(newCountry)
                return prev
            }
            return prev
        }, [])
        if(newCountries.length === 1) {
            const api_key = process.env.REACT_APP_API_KEY
            axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${newCountries[0].name}`)
                .then(response => {
                    const weather = response.data
                    newCountries[0].weather = weather
                })
                setFilterCountries([...newCountries])
        } else {
            setFilterCountries([...newCountries])
        }
    }
    const handleIsShow = (index) => {
        const newFilterCountries = filterCountries.reduce((prev, curr, i) => {
            if(i === index) {
                curr.isShow = !curr.isShow
                prev.push(curr)
                return prev
            }
            prev.push(curr)
            return prev
        }, [])
        setFilterCountries([...newFilterCountries])
    }
    return (
        <div>
            <div>
                find countries <input value={keyword} onChange={(event) => handleSearch(event)}></input>
            </div>
            {
                filterCountries.length > 10 ? <p>Too Many Matches,spiecify another filter</p> : (
                    filterCountries.map((country, index) => {
                        return (
                        <div key={country.alpha2Code}>
                            <p >{country.name} <button onClick={() => handleIsShow(index)}>show</button></p>
                            {country.isShow && (
                                <>
                                    <div key={country.alpha2Code}>
                                        <h1>{country.name}</h1>
                                        <p>capital {country.capital}</p>
                                        <p>population {country.population}</p>
                                        <h4>languages</h4>
                                        <ul>
                                            {country.languages.map((value) => {
                                                return <li key={value.iso639_1}>{value.name}</li>
                                            })}
                                        </ul>
                                        <img src={country.flag} alt='' width='300' height='200'></img>
                                        {filterCountries.length === 1 && (
                                            <>
                                                <h4>Weather</h4>
                                                <p>temperature: {country.weather.current.temperature} Celcius</p>
                                                {country.weather.current.weather_icons.map((icon, index) => <img alt='' key={index} src={icon}></img>)}
                                                <p><strong>wind:</strong>{country.weather.current.wind_speed} mph direction {country.weather.current.wind_dir}</p>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        )
                    })
            )}
        </div>
    )
}

export default App_countries
