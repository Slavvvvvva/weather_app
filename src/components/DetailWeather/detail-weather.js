import React, { useEffect } from 'react'
import { compose } from 'redux'
import d from './d.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {getCNTDaysWeatherTC, getCurrentWeatherIdTC} from '../Redux/weather-reduser'
import DatailItem from './DatailWeatherItem/detail-weather-item'
import sun from '../IMG/weatherIcon/SunIcon.svg'
import littleCloud from '../IMG/weatherIcon/cloudyIcon.svg'
import cloud from '../IMG/weatherIcon/BigCloud.svg'
import rain from '../IMG/weatherIcon/RainIcon.svg'
import storm from '../IMG/weatherIcon/Stromicon.svg'
import snow from '../IMG/weatherIcon/SnowingIcon.svg'

const DatailWeathear = (props) => {

    let lon = props.match.params.sityId.slice(0, props.match.params.sityId.indexOf('_') )
    let lat = props.match.params.sityId.slice( props.match.params.sityId.indexOf('_')+1 )

    useEffect( () => {
        props.getCNTDaysWeatherTC(lat, lon)
    },[lon, lat])

    const iconSelector = (patch) => {
        switch (patch) {
            case '01d': return sun
            case '01n': return sun
            case '02d': return littleCloud
            case '02n': return littleCloud
            case '03d': return cloud
            case '03n': return cloud
            case '04d': return cloud
            case '04n': return cloud
            case '09d': return rain
            case '09n': return rain
            case '10d': return rain
            case '10n': return rain
            case '11d': return storm
            case '11n': return storm
            case '13d': return snow
            case '13n': return snow
            case '50d': return littleCloud
            case '50n': return littleCloud
            default: return sun
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
    
    if (props.CNTDaysWeather.length == 0){
        return(
            <p>Loading</p>
        )
    }
    
    const ShowDatailItaem = props.CNTDaysWeather.daily.map((item, i) => {
        return (
            <DatailItem day={item.dt} icon={iconSelector( item.weather[0].icon)} daytemp= {item.temp.day} descriptions = {item.weather[0].description} key={`${i}gjk`} />
        )
    })

    return (
        <div className = {d.datail_wrapper} >
            <div className = {className}>
                <div>
                    <img src={iconSelector(props.CNTDaysWeather.current.weather[0].icon)} alt ='weather logo'/>
                    <div>
                        <p className = {d.temp}> {Math.round(props.CNTDaysWeather.current.temp)}&#176; </p> 
                        <p className = {d.des}> {props.CNTDaysWeather.current.weather[0].description} </p>
                    </div>  
                </div>
                <div>
                    <p>City Name</p>
                </div>
            </div>
            <div className = {classNameDet}>
                {ShowDatailItaem}
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    
    return {
        darckMode: state.GlobalSettings.darkMode,
        CNTDaysWeather: state.Weather.CNTdaysWeather
    }
}
export default compose(
    connect(mapStateToProps, { getCNTDaysWeatherTC, getCurrentWeatherIdTC }),
    withRouter
)(DatailWeathear)