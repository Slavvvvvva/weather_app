import React from 'react'
import di from './di.module.scss'
import classNames from 'classnames/bind'

const DatailItem  = (props) => {
    let date = new Date(props.day)
    return (
        <div className = {di.wrapper}>
            <p>{date.getDay()}</p>
            <img src = {props.icon} alt = 'weathaer icon' />
            <p>{props.daytemp}</p>
            <p>{props.descriptions}</p>
        </div>
       
    )
}

export default DatailItem