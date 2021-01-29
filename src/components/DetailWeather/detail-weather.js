import React, { useEffect } from 'react'
import { compose } from 'redux';
import d from './d.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getCNTDaysWeatherTC, getCurrentWeatherIdTC} from '../Redux/weather-reduser'

const DatailWeathear = (props) => {

    useEffect( () => {
        props.getCNTDaysWeatherTC(props.match.params.sityId)
    },[props.match.params.sityId])
    
    return (
        <div>
            Weather  was heart twice {props.match.params.sityId}

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