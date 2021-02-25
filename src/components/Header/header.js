import React from 'react'
import { compose } from 'redux';
import h from './h.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {chaingeDarckModeAC, togleLanguageAC} from '../Redux/global-settings-reduser'
import {delAllCurrentWeatherAC} from '../Redux/weather-reduser'
import logo from '../IMG/weatherIcon/AppLogo.svg'
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    let cx = classNames.bind(h);
    const className =cx({
        chainge_mode_white: true,
        chainge_mode_darck: props.darckMode
    })
    const classNameL =cx({
        logo: true,
        logo_darck: props.darckMode
    })
    const classNameLang =cx({
        chainge_mode_white: true,
        chainge_mode_darck: props.appLanguage ==='ru'
    })

    const ChaingeMode = () =>{
        props.chaingeDarckModeAC()
    }
    const ChaingeLang = () =>{
        props.delAllCurrentWeatherAC()
        if(props.appLanguage === 'en') props.togleLanguageAC('ru')
        else props.togleLanguageAC('en')
    }
    
    let time = new Date()
    
    return(
        <>
        <NavLink to = {`/`} className = {classNameL}>
            <img src = {logo} alt ='app logo'/>
            <p>MiniWeathear</p>
        </NavLink>
        <div>
            {(props.appLanguage === 'ru')?
            <p className = {h.time}>{time.toLocaleString('ru', {weekday: 'long',year: 'numeric',month: 'short',day: 'numeric'})}</p>
            : <p className = {h.time}>{time.toUTCString().slice(0,16)}</p>
            }
            
            
        </div>
        <div>
            <div className = {h.chainge_mode}>
                <p>{`${(props.appLanguage === 'ru')? 'светлая':'Light' }`}</p>
                <div className ={className} onClick = {ChaingeMode}></div>
                <p>{`${(props.appLanguage === 'ru')? 'темная':'darck' }`}</p>
            </div>
            <div className = {h.chainge_mode}>
                <p>{`${(props.appLanguage === 'ru')? 'англ':'ENG' }`}</p>
                <div className ={classNameLang} onClick = {ChaingeLang}></div>
                <p>{`${(props.appLanguage === 'ru')? 'ру':'RU' }`}</p>
            </div>
        </div>
        
        </>
    )
}

let mapStateToProps = (state) =>{
    return{
        darckMode: state.GlobalSettings.darkMode,
        appLanguage: state.GlobalSettings.appLanguage
    }
}
export default compose(
    connect(mapStateToProps,{chaingeDarckModeAC,togleLanguageAC, delAllCurrentWeatherAC})
) (Header)