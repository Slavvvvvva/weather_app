import React from 'react'
import { compose } from 'redux'
import c from './c.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getCurrentWeatherTC, stopTrackingLocationTC } from '../../Redux/weather-reduser'
import {chaingeActiveCityAC} from '../../Redux/global-settings-reduser'
import { NavLink } from 'react-router-dom'
import { iconSelector } from '../../Util/iconSelector'

const LocationCard = (props) => {

    let cx = classNames.bind(c);
    const className = cx({
        add_card: true,
        add_card_dark: props.darckMode
    })
    const classNameB = cx({
        delate: true,
        delate_darck: props.darckMode
    })
   
    let sityCoord = `${props.PositionWeather.lon}_${props.PositionWeather.lat}`

    const DaliteCard = () => {
        props.stopTrackingLocationTC(props.positionID)
    }

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
            <p>{`${(props.appLanguage === 'ru')? 'текущaя локация':'current location' }`}</p>
            <div className={c.weather_icon}>
                <img src={iconSelector(props.PositionWeather.current.weather[0])} alt='weather icon' />
            </div>
            
            <p className={c.temperature} >
                {Math.round(props.PositionWeather.current.temp)}&#176;
            </p>
            <div className={c.des}> {props.PositionWeather.current.weather[0].description}</div>
            <p className = {c.update}> {`${(props.appLanguage === 'ru')? 'последнее обновление':'Last update' }`} <br/>{props.day}</p>      
        </NavLink>
        <button className= {classNameB} onClick={DaliteCard} key={`jfkcncxfd`}></button>  
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
        appLanguage: state.GlobalSettings.appLanguage,
        positionID: state.Weather.yourPositionId
    }
}
export default compose(
    connect(mapStateToProps, { getCurrentWeatherTC, chaingeActiveCityAC, stopTrackingLocationTC })
)(LocationCard)