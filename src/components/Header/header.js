import React from 'react'
import { compose } from 'redux';
import h from './h.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {chaingeDarckModeAC} from '../Redux/global-settings-reduser'
import logo from '../IMG/weatherIcon/AppLogo.svg'
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    let cx = classNames.bind(h);
    const className =cx({
        chainge_mode_white: true,
        chainge_mode_darck: props.darckMode
    })

    const ChaingeMode = () =>{
        props.chaingeDarckModeAC()
    }
    
    let time = new Date()
    
    return(
        <>
        <NavLink to = {`/`} className = {h.logo}>
            <img src = {logo} alt ='app logo'/>
            <p>MiniWeathear</p>
        </NavLink>
        <div>
            <p className = {h.time}>{time.toUTCString().slice(0,16)}</p>
        </div>
        <div className = {h.chainge_mode}>
            <p>Light</p>
            <div className ={className} onClick = {ChaingeMode}></div>
            <p>Dark</p>
        </div>
        </>
    )
}

let mapStateToProps = (state) =>{
    return{
        darckMode: state.GlobalSettings.darkMode,
    }
}
export default compose(
    connect(mapStateToProps,{chaingeDarckModeAC})
) (Header)