import React, { useEffect } from 'react'
import { compose } from 'redux'
import c from './c.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getCurrentWeatherTC, delCurrentWeatherAC } from '../../Redux/weather-reduser'
import {chaingeActiveCityAC} from '../../Redux/global-settings-reduser'
import d01 from '../../IMG/openweathermap/01d.svg'
import n01 from '../../IMG/openweathermap/01n.svg'
import d02 from '../../IMG/openweathermap/02d.svg'
import n02 from '../../IMG/openweathermap/02n.svg'
import d03 from '../../IMG/openweathermap/03d.svg'
import n03 from '../../IMG/openweathermap/03n.svg'
import d04 from '../../IMG/openweathermap/04d.svg'
import n04 from '../../IMG/openweathermap/04n.svg'
import d09 from '../../IMG/openweathermap/09d.svg'
import n09 from '../../IMG/openweathermap/09n.svg'
import d10 from '../../IMG/openweathermap/10d.svg'
import n10 from '../../IMG/openweathermap/10n.svg'
import d11 from '../../IMG/openweathermap/11d.svg'
import n11 from '../../IMG/openweathermap/11n.svg'
import d13 from '../../IMG/openweathermap/13d.svg'
import n13 from '../../IMG/openweathermap/13n.svg'
import d50 from '../../IMG/openweathermap/50d.svg'
import n50 from '../../IMG/openweathermap/50n.svg'
import { NavLink } from 'react-router-dom'

const iconSelector = (patch) => {
    switch (patch) {
        case '01d': return d01
        case '01n': return n01
        case '02d': return d02
        case '02n': return n02
        case '03d': return d03
        case '03n': return n03
        case '04d': return d04
        case '04n': return n04
        case '09d': return d09
        case '09n': return n09
        case '10d': return d10
        case '10n': return n10
        case '11d': return d11
        case '11n': return n11
        case '13d': return d13
        case '13n': return n13
        case '50d': return d50
        case '50n': return n50
        default: return d01
    }
}


const LocationCard = (props) => {

    let cx = classNames.bind(c);
    const className = cx({
        add_card: true,
        add_card_dark: props.darckMode
    })
   
    let sityCoord = `${props.PositionWeather.lon}_${props.PositionWeather.lat}`

    if (!props.PositionWeather) {
        return (
            <div className={className}>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={c.wrapper}>
        <NavLink to = {`/detail/${sityCoord}`} className={className} onClick = {()=> props.chaingeActiveCityAC(props.PositionWeather.name)}>
            <p>{props.city}</p>
            <div className={c.weather_icon}>
                <img src={iconSelector(props.PositionWeather.current.weather[0].icon)} alt='weather icon' />
            </div>
            
            <p className={c.temperature} >
                {Math.round(props.PositionWeather.current.temp)}&#176;
            </p>
            <div className={c.des}> {props.PositionWeather.current.weather[0].description}</div>
            <p>{props.day}</p>      
        </NavLink>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
    }
}
export default compose(
    connect(mapStateToProps, { getCurrentWeatherTC, chaingeActiveCityAC, delCurrentWeatherAC })
)(LocationCard)