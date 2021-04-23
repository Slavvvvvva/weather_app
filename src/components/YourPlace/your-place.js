import React, { useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import y from './y.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getCurrentWeatherIdTC, getCurrentWeatherTC,getPositionWeatherTC,getPositionTC } from '../Redux/weather-reduser'
import {setModeAC} from '../Redux/global-settings-reduser'
import CityCard from './CityCard/city-card'
import LocationCard from './LocationCard/location-card'
import store from 'store'
import { Input } from '../Util/Form/form'



const YourPlace = (props) => {
    let mode = store.get('darckMode')
    let lang = store.get('appLanguage')
    useEffect(() => {
        props.setModeAC(mode, lang)
        let citymass = store.get('city')
        if (citymass && (props.CurrentWeather.length == 0)) {  
            citymass.forEach((i) => {
                props.getCurrentWeatherIdTC(i,lang)
            })
        }
    }, [mode, lang])

    let {long,lat} = props.position
    useEffect(() => {
        if (props.position){
            props.getPositionWeatherTC(lat,long,lang)
        }
    }, [lat,long,lang])

    let position = store.get('position')
    useEffect(()=>{
        if(position){
            props.getPositionTC()
        }
    },[position])

    let cx = classNames.bind(y);
    const className = cx({
        add_card: true,
        add_card_dark: props.darckMode
    })

    const AddNewCity= (formData) => {
        props.getCurrentWeatherTC(formData.cityName, props.appLanguage)
    }

    const ShowCityCard = props.CurrentWeather.map((item, i) => {
        return (
            <CityCard city={item.massege} CurrentWeather={props.CurrentWeather[i]} key={`${i}gjkfjgk`} />
        )
    })

    const find = () => {
        props.getPositionTC()
    }
    
    return (
        <>
            {props.CurrentWeather && ShowCityCard}
            {props.positionWeather && <LocationCard 
                                        PositionWeather={props.positionWeather}
                                        day = {`${(props.appLanguage ==='ru')?
                                        new Date(props.position.timestamp).toLocaleString('ru', {weekday: 'short', hour: 'numeric', minute: 'numeric'})
                                        : new Date(props.position.timestamp).toLocaleString('en', {weekday: 'short', hour: 'numeric',hour12: false, minute: 'numeric'})}`}/>
            }
            <div className={className}>
                <AddCityCardReduxForm onSubmit={AddNewCity} {...props}/>
                <div className = {y.location}>
                    <button className = {y.location_button}  onClick ={find} />  
                    {(props.appLanguage === 'ru')? <p>добавить/обновить <br/> погоду по локации </p>:<p>add/update your  <br/> location weather </p>}
                </div>
            </div>
        </>

    )
}           

let notAmptyRU = (value) => {
    if (value) return undefined
    return (
        <p className = {y.valdation}>ты не можешь отправить пустое поле</p>
    )
}
let notAmptyENG = (value) => {
    if (value) return undefined
    return (
        <p className = {y.valdation}>you can't send an empty field</p>
    )
}

const AddCityCardForm = (props) => {
    return (
        <form className={y.form} onSubmit={props.handleSubmit} >
            <Field placeholder={`${(props.appLanguage ==='ru')? 'ГОРОД':'ADD CITY'}`} name={'cityName'} component={Input} className={y.input} validate = {(props.appLanguage ==='ru')?[notAmptyRU]:[notAmptyENG]}></Field>
            <button></button>
        </form>
    )
}
const AddCityCardReduxForm = reduxForm({ form:'AddCity' })(AddCityCardForm)

let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
        CurrentWeather: state.Weather.CurrentWeather,
        appLanguage: state.GlobalSettings.appLanguage,
        position: state.Weather.yourPosition,
        positionWeather:state.Weather.yourPositionWeather
    }
}
export default compose(
    connect(mapStateToProps, { getCurrentWeatherIdTC, getCurrentWeatherTC,getPositionWeatherTC,getPositionTC, setModeAC })
)(YourPlace)