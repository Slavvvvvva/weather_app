import React from 'react'
import button from './button.module.scss'
import classNames from 'classnames/bind'
import { compose } from 'redux';
import { connect } from 'react-redux';

const Button = ({ChaingeMode, darckMode, appLanguage, RuTextLeft, RutextRight, EnTextLeft, EnTextRight}) => {
    let cx = classNames.bind(button);
    const ButtonStyle = cx({
        chainge_mode_white: true,
        chainge_mode_darck: darckMode
    })
    const classNameLang = cx({
        chainge_mode_white_left: true,
        chainge_mode_white_right: appLanguage === 'ru'
    })
    return (
        <div className={button.chainge_mode}>
            <p>{`${(appLanguage === 'ru') ? RuTextLeft : EnTextLeft}`}</p>
            <div className={classNameLang} onClick={ChaingeMode}>
                <div/>
            </div>
            <p>{`${(appLanguage === 'ru') ? RutextRight : EnTextRight}`}</p>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        darckMode: state.GlobalSettings.darkMode,
        appLanguage: state.GlobalSettings.appLanguage
    }
}
export default compose(
    connect(mapStateToProps)
)(Button)