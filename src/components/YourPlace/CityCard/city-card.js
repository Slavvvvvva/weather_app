import React from 'react'
import { compose } from 'redux'
import c from './c.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getCurrentWeatherTC, delCurrentWeatherAC } from '../../Redux/weather-reduser'
import { chaingeActiveCityAC } from '../../Redux/global-settings-reduser'
import { NavLink } from 'react-router-dom'
import { iconSelector } from '../LocationCard/location-card'

const CityCard = (props) => {

    let cx = classNames.bind(c);
    const className = cx({
        add_card: true,
        add_card_dark: props.darckMode
    })
    const classNameB = cx({
        delate: true,
        delate_darck: props.darckMode
    })


    let sityCoord = `${props.CurrentWeather.coord.lon}_${props.CurrentWeather.coord.lat}`

    if (!props.CurrentWeather) {
        return (
            <div className={className}>
                <p>Loading...</p>
            </div>
        )
    }

    const DaliteCard = () => {
        props.delCurrentWeatherAC(props.CurrentWeather.id)
    }

    return (
        <div className={c.wrapper}>
            <NavLink to={`/detail/${sityCoord}`} className={className} onClick={() => props.chaingeActiveCityAC(props.CurrentWeather.name)}>
                <p>{props.CurrentWeather.name}</p>
                <div className={c.weather_icon}>
                    <img src={iconSelector(props.CurrentWeather.weather[0].icon)} alt='weather icon' />
                </div>

                <p className={c.temperature} >
                    {Math.round(props.CurrentWeather.main.temp)}&#176;
            </p>
                <div className={c.des}> {props.CurrentWeather.weather[0].description}</div>
                <div className={c.minmax} >
                    <div className={c.min}>{Math.round(props.CurrentWeather.main.temp_min)}</div>
                    <div className={c.max}>{Math.round(props.CurrentWeather.main.temp_max)}</div>
                </div>
            </NavLink>
            <button className={classNameB} onClick={DaliteCard} key={`${props.CurrentWeather.id}jfkcncx`}></button>
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
)(CityCard)