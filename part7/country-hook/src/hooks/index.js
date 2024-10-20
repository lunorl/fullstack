import { useEffect } from 'react'
export const useCountry = (field) => {
    const [value, setValue] = useEffect
    const type = field
    const onChange = (event) => {
        setValue(event.target.value)
    }
    const findCountry = async () => {
        const countries = await fetch('https://studies.cs.helsinki.fi/restcountries/api/name/finland')
        return countries.find(value)
    } 
    return {
        value,
        type,
        onChange,
        findCountry
    }
}