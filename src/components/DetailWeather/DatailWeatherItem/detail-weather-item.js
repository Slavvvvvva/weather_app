import React from 'react'
import di from './di.module.scss'
import classNames from 'classnames/bind'

const DatailItem  = (props) => {
    let date = new Date(props.day*1000)
    let day = date.toDateString().slice( 0 ,3)
   
    return (
        <div className = {di.wrapper}>
            <p className = {di.day}>{day}</p>
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