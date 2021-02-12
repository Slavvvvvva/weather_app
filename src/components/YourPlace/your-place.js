import React, { useEffect } from 'react'
import { reduxForm, Field } from 'redux-form'
import { compose } from 'redux'
import y from './y.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { getCurrentWeatherIdTC, getCurrentWeatherTC } from '../Redux/weather-reduser'
import CityCard from './CityCard/city-card'
import store from 'store'
import { Input } from '../Util/form'



const YourPlace = (props) => {

    useEffect(() => {
        let citymass = store.get('city')
        if (citymass && (props.CurrentWeather.length == 0)) {
            citymass.forEach((i) => {
                props.getCurrentWeatherIdTC(i)
            })
        }
    }, [])


    let cx = classNames.bind(y);
    const className = cx({
        add_card: true,
        add_card_dark: props.darckMode
    })

    const AddNewCity= (formData) => {
        props.getCurrentWeatherTC(formData.cityName)
    }

    const ShowCityCard = props.CurrentWeather.map((item, i) => {
        return (
            <CityCard city={item.massege} CurrentWeather={props.CurrentWeather[i]} key={`${i}gjkfjgk`} />
        )
    })

    return (
        <>
            {props.CurrentWeather && ShowCityCard}
            <div className={className}>
                <AddCityCardReduxForm onSubmit={AddNewCity} {...props}/>
            </div>
        </>

    )
}

const AddCityCardForm = (props) => {
    return (
        <form className={y.form} onSubmit={props.handleSubmit} >
            <Field placeholder={'ADD CITY'} name={'cityName'} component={Input} className={y.input}></Field>
            <button></button>
        </form>
    )
}
const AddCityCardReduxForm = reduxForm({ form:'AddCity' })(AddCityCardForm)

let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
        CurrentWeather: state.Weather.CurrentWeather
    }
}
export default compose(
    connect(mapStateToProps, { getCurrentWeatherIdTC, getCurrentWeatherTC })
)(YourPlace)