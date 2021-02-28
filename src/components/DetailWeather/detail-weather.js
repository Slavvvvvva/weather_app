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
import d01 from '../IMG/openweathermap/01d.svg'
import n01 from '../IMG/openweathermap/01n.svg'
import d02 from '../IMG/openweathermap/02d.svg'
import n02 from '../IMG/openweathermap/02n.svg'
import d03 from '../IMG/openweathermap/03d.svg'
import n03 from '../IMG/openweathermap/03n.svg'
import d04 from '../IMG/openweathermap/04d.svg'
import n04 from '../IMG/openweathermap/04n.svg'
import d09 from '../IMG/openweathermap/09d.svg'
import n09 from '../IMG/openweathermap/09n.svg'
import d10 from '../IMG/openweathermap/10d.svg'
import n10 from '../IMG/openweathermap/10n.svg'
import d11 from '../IMG/openweathermap/11d.svg'
import n11 from '../IMG/openweathermap/11n.svg'
import d13 from '../IMG/openweathermap/13d.svg'
import n13 from '../IMG/openweathermap/13n.svg'
import d50 from '../IMG/openweathermap/50d.svg'
import n50 from '../IMG/openweathermap/50n.svg'


const DatailWeathear = (props) => {

    let lon = props.match.params.sityId.slice(0, props.match.params.sityId.indexOf('_'))
    let lat = props.match.params.sityId.slice(props.match.params.sityId.indexOf('_') + 1) 
    let mode = store.get('darckMode')
    let lang = store.get('appLanguage')

    useEffect(() => {
        props.setModeAC(mode, lang)
        props.getCNTDaysWeatherTC(lat, lon, lang) 
    }, [lon, lat, mode, props.appLanguage])

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
    

    let cx = classNames.bind(d);
    const className = cx({
        current: true,
        current_dark: props.darckMode,
    })
    const classNameDet = cx({
        datail: true,
        datail_dark: props.darckMode,
    })
    const classNameB = cx({
        chainge_mode_white: true,
        chainge_mode_darck: props.dispayMode
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
            hourly ={props.dispayMode} key={`${i}gjk`} />
        )
    })

    const ChaingeMode = () => {
        props.TogleDetailWeatherAC()
    }

    return (
        <div className={d.datail_wrapper} >
            <div className={className}>
                <div>
                    <img src={iconSelector(props.CNTDaysWeather.current.weather[0].icon)} alt='weather logo' />
                    <div>
                        <p className={d.temp}> {Math.round(props.CNTDaysWeather.current.temp)}&#176; </p>
                        <p className={d.des}> {props.CNTDaysWeather.current.weather[0].description} </p>
                    </div>
                </div>
                <div className={d.city_name}>
                    <p>{props.activCity}</p>
                </div>
                <div className={d.chainge_mode}>
                    <p>{`${(props.appLanguage === 'ru')? 'По дням':'Daily' }`}</p>
                    <div className={classNameB} onClick={ChaingeMode}></div>
                    <p>{`${(props.appLanguage === 'ru')? 'По часам':'Hourly' }`}</p>
                </div>
                <NavLink to='/' className={classNameBack}/>
            </div>
            <div className={classNameDet}>
                {(!props.dispayMode)? ShowDatailItaemDaily : ShowDatailItaemHourly }
            </div>
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