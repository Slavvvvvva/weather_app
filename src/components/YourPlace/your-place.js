import React, { useEffect } from 'react'
import { compose } from 'redux';
import y from './y.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {getCurrentWeatherTC} from '../Redux/weather-reduser'
import CityCard from './CityCard/city-card';


const YourPlace =(props) => {

    let cx = classNames.bind(y);
    const className =cx({
        add_card: true,
        add_card_dark: props.darckMode
    })

    let cityName = React.createRef();

    const AddNevSity = () =>{
        props.getCurrentWeatherTC(cityName.current.value)
    }
    debugger
    const ShowCityCard = props.CurrentWeather.map((item, i) => {
        return (
            <CityCard city={item.massege} CurrentWeather={props.CurrentWeather[i]}  key ={`${i}gjkfjgk`} />
        )
    })
   
    return(
        <>  
            {props.CurrentWeather&&ShowCityCard}
            <div className ={className}>
                <p>Add city</p>
                <textarea ref = {cityName} onBlur= {AddNevSity}></textarea>
                <button></button>
            </div>
        </>
            
    )
}

let mapStateToProps = (state) =>{
    return{
        darckMode: state.GlobalSettings.darkMode,
        CurrentWeather: state.Weather.CurrentWeather
    }
}
export default compose(
    connect(mapStateToProps,{getCurrentWeatherTC})
) (YourPlace)