import React, { useState } from 'react'
import { compose } from 'redux';
import h from './h.module.scss'
import classNames from 'classnames/bind'
import { connect } from 'react-redux';
import { chaingeDarckModeAC, togleLanguageAC } from '../Redux/global-settings-reduser'
import { delAllCurrentWeatherAC } from '../Redux/weather-reduser'
import logo from '../IMG/weatherIcon/AppLogo.svg'
import { NavLink } from 'react-router-dom';
import Button from '../Util/Button/Button';

const Header = (props) => {

    const [settingsActiv, setSettingsActiv] = useState(false)

    let cx = classNames.bind(h);
    
    const LogoStyle = cx({
        logo: true,
        logo_darck: props.darckMode
    })
    
    const classNameSetting = cx({
        settings: true,
        settings_activ: settingsActiv,
        setting_darck: props.darckMode
    })
    const classNameSettingBtn = cx({
        setting_button: true,
        setting_button_black: props.darckMode
    })

    const ChaingeMode = () => {
        props.chaingeDarckModeAC()
    }
    const ChaingeLang = () => {
        props.delAllCurrentWeatherAC()
        if (props.appLanguage === 'en') props.togleLanguageAC('ru')
        else props.togleLanguageAC('en')
    }

    let time = new Date()


    return (
        <>
            <NavLink to={`/`} className={LogoStyle}>
                <img src={logo} alt='app logo' />
                <p>MiniWeathear</p>
            </NavLink>
            <div>
                {(props.appLanguage === 'ru') ?
                    <p className={h.time}>{time.toLocaleString('ru', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    : <p className={h.time}>{time.toUTCString().slice(0, 16)}</p>
                }
            </div>
            <div className={h.under}>

            </div>

            <div className={classNameSetting}>
                <button
                className={classNameSettingBtn}
                onClick={() => setSettingsActiv(!settingsActiv)} ></button>
                <Button
                    ChaingeMode={ChaingeMode}
                    RuTextLeft= 'светлая'
                    RutextRight ='темная'
                    EnTextLeft = 'Light'
                    EnTextRight = 'Darck'
                />
                <Button
                    ChaingeMode={ChaingeLang}
                    RuTextLeft= 'англ'
                    RutextRight ='ру'
                    EnTextLeft = 'ENG'
                    EnTextRight = 'RU'
                />
                
            </div>

        </>
    )
}



let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
        appLanguage: state.GlobalSettings.appLanguage
    }
}
export default compose(
    connect(mapStateToProps, { chaingeDarckModeAC, togleLanguageAC, delAllCurrentWeatherAC })
)(Header)