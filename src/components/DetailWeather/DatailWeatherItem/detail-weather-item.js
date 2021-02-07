import React from 'react'
import di from './di.module.scss'
import classNames from 'classnames/bind'

const DatailItem  = (props) => {
    let cx = classNames.bind(di);
    const className = cx({
        wrapper: true,
        wrapper_hourly: props.hourly,
    })

    return (
        <div className = {className}>
            <p className = {di.day}>{props.day}</p>
            <div>
                <img src = {props.icon} alt = 'weathaer icon' />
            </div>
                <p className = {di.temp}>{Math.round(props.daytemp)}&#176; </p>
            <div className = {di.des}>
                <p>{props.descriptions}</p>
            </div>
            
        </div>
       
    )
}

export default DatailItem