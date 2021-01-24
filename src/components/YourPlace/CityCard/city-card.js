import React, { useEffect } from 'react'
import { compose } from 'redux'
import c from './c.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getCurrentWeatherTC } from '../../Redux/weather-reduser'
import sun from '../../IMG/weatherIcon/SunIcon.svg'
import littleCloud from '../../IMG/weatherIcon/cloudyIcon.svg'
import cloud from '../../IMG/weatherIcon/BigCloud.svg'
import rain from '../../IMG/weatherIcon/RainIcon.svg'
import storm from '../../IMG/weatherIcon/Stromicon.svg'
import snow from '../../IMG/weatherIcon/SnowingIcon.svg'


const CityCard = (props) => {

    /* useEffect(() => {
        props.getCurrentWeatherTC(props.city)
    }, []) */
    debugger
    let cx = classNames.bind(c);
    const className = cx({
        add_card: true,
        add_card_dark: props.darckMode
    })
     const iconSelector = () =>{
         switch (props.CurrentWeather.weather[0].icon) {
             case '01d' : return sun
             case '01n' : return sun
             case '02d' : return littleCloud
             case '02n' : return littleCloud
             case '03d' : return cloud
             case '03n' : return cloud
             case '04d' : return cloud
             case '04n' : return cloud
             case '09d' : return rain
             case '09n' : return rain
             case '10d' : return rain
             case '10n' : return rain
             case '11d' : return storm 
             case '11n' : return storm 
             case '13d' : return snow 
             case '13n' : return snow 
             case '50d' : return littleCloud
             case '50n' : return littleCloud
             default : return sun  
         }
     }
 

    if (!props.CurrentWeather) {
        return (
            <div className={className}>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={className}>
            <p>{props.CurrentWeather.name}</p>
            <img src={iconSelector()} alt='weather icon' />
            <div className = {c.temperature} >
                { Math.round(props.CurrentWeather.main.temp) }  
            </div>
            <div className = {c.des}> {props.CurrentWeather.weather[0].description}</div>
            
            <div className = {c.minmax} >
                <div className = {c.min}>{props.CurrentWeather.main.temp_min}</div>
                <div className = {c.max}>{props.CurrentWeather.main.temp_max}</div>
            </div>
            

        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
    }
}
export default compose(
    connect(mapStateToProps, { getCurrentWeatherTC })
)(CityCard)