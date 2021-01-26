import React, { useEffect } from 'react'
import { compose } from 'redux';
import d from './d.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const DatailWeathear = (props) => {
    debugger
    return (
        <div>
            Weather  was heart twice {props.match.params.sityId}
        </div>
    )
}

let mapStateToProps = (state) => {
    
    return {
        darckMode: state.GlobalSettings.darkMode,
        CurrentWeather: state.Weather.CurrentWeather
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps, { })
)(DatailWeathear)