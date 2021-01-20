import React, {useEffect} from 'react'
import { compose } from 'redux'
import c from './c.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import {getCurrentWeatherTC} from '../../Redux/weather-reduser'

const CityCard =(props) => {

    useEffect ( () => {
        props.getCurrentWeatherTC()
    },[])

    let cx = classNames.bind(c);
    const className =cx({
        add_card: true,
        add_card_dark: props.darckMode
    })

    return(
            <div className ={className}>
                <p></p>
                
            </div>     
    )
}

let mapStateToProps = (state) =>{
    return{
        darckMode: state.GlobalSettings.darkMode,
        CurrentWeather:state.Weather.CurrentWeather
    }
}
export default compose(
    connect(mapStateToProps,{getCurrentWeatherTC})
) (CityCard)