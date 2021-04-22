import React, { useEffect } from 'react'
import { compose } from 'redux'
import store from 'store'
import d from './d.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { getCNTDaysWeatherTC, getCurrentWeatherIdTC } from '../Redux/weather-reduser'
import {TogleDetailWeatherAC, setModeAC } from '../Redux/global-settings-reduser'
import DatailItem from './DatailWeatherItem/detail-weather-item'
import sunrice from '../IMG/openweathermap/sunrise.svg'
import sunset from '../IMG/openweathermap/sunset.svg'
import { iconSelector } from '../YourPlace/LocationCard/location-card'


const DatailWeathear = (props) => {

    let lon = props.match.params.sityId.slice(0, props.match.params.sityId.indexOf('_'))
    let lat = props.match.params.sityId.slice(props.match.params.sityId.indexOf('_') + 1) 
    let mode = store.get('darckMode')
    let lang = store.get('appLanguage')

    useEffect(() => {
        props.setModeAC(mode, lang)
        props.getCNTDaysWeatherTC(lat, lon, lang) 
    }, [lon, lat, mode, props.appLanguage])


    let cx = classNames.bind(d);
    const className = cx({
        current: true,
        current_dark: props.darckMode,
    })
    const classNameDet = cx({
        datail: true,
        datail_dark: props.darckMode,
    })
    
    const classNameBack = cx({
        back_white: true,
        back_darck: props.darckMode
    })

    if (props.CNTDaysWeather.length ===0) {
        return (
            <p>Loading</p>
        )
    }

    const ShowDatailItaemDaily = props.CNTDaysWeather.daily.map((item, i) => {
        return (
            <DatailItem 
             day ={`${(props.appLanguage ==='ru')?
             new Date(item.dt*1000).toLocaleString('ru', {weekday: 'short'})
             : new Date(item.dt*1000).toDateString().slice( 0 ,3)}`}
             icon={iconSelector(item.weather[0].icon)}
             daytemp={item.temp.day}
             pop= {item.pop}
             descriptions={item.weather[0].description} key={`${i}gjk`} />
        )
    })
    const ShowDatailItaemHourly = props.CNTDaysWeather.hourly.map((item, i) => {
        return (
            <DatailItem 
            day ={`${(props.appLanguage ==='ru')?
             new Date(item.dt*1000).toLocaleString('ru', {weekday: 'short', hour: 'numeric', minute: 'numeric'})
             : new Date(item.dt*1000).toLocaleString('en', {weekday: 'short', hour: 'numeric',hour12: false, minute: 'numeric'})}`}
            icon={iconSelector(item.weather[0].icon)}
            daytemp={item.temp}
            descriptions={item.weather[0].description}
            pop= {item.pop}
            hourly ={props.dispayMode} key={`${i}gjk`}
            hourlyItem ={true} />
        )
    })

    return (
        <div className={d.datail_wrapper} >
            <div className={className}>
                <div>
                    <img src={iconSelector(props.CNTDaysWeather.current.weather[0].icon)} alt='weather logo' />
                    <div>
                        <p className={d.temp}> {Math.round(props.CNTDaysWeather.current.temp)}&#176; </p>
                        <p className = {d.fills}>feels like {Math.round(props.CNTDaysWeather.current.feels_like)}&#176;</p>
                        <p className={d.des}> {props.CNTDaysWeather.current.weather[0].description} </p>
                    </div>
                </div>
                <div className={d.city_name}>
                    <p>{props.activCity}</p>
                    <div className ={d.sunrice}>
                    <img src={sunrice} alt="sunrice"/>
                    <p>{new Date(props.CNTDaysWeather.current.sunrise*1000).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})} </p>
                    <img src={sunset} alt="sunset"/>
                    <p>{new Date(props.CNTDaysWeather.current.sunset*1000).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})} </p>
                </div>
                </div>
                <NavLink to='/' className={classNameBack}/>
            </div>
            {<div className={classNameDet}>
                <div className ={d.item_wrapper}>
                    {ShowDatailItaemDaily}
                </div>
                <div className ={d.item_wrapper}>
                    {ShowDatailItaemHourly}
                </div>
            </div>}
        </div>
    )
}

let mapStateToProps = (state) => {

    return {
        darckMode: state.GlobalSettings.darkMode,
        appLanguage: state.GlobalSettings.appLanguage,
        activCity: state.GlobalSettings.activeCityName,
        dispayMode: state.GlobalSettings.dailyHourly,
        CNTDaysWeather: state.Weather.CNTdaysWeather
    }
}
export default compose(
    connect(mapStateToProps, {TogleDetailWeatherAC, setModeAC, getCNTDaysWeatherTC, getCurrentWeatherIdTC }),
    withRouter
)(DatailWeathear)