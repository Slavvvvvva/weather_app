import React, { useEffect, useState } from 'react'
import button from './button.module.scss'
import classNames from 'classnames/bind'
import { compose } from 'redux';
import { connect } from 'react-redux';

const Button = ({ ChaingeMode, darckMode, appLanguage,
        RuTextLeft, RutextRight, EnTextLeft,
        EnTextRight, startButtonPosition }) => {
    const [buttonPosition, cheingeButtonPosition] = useState(true)

    useEffect ( () =>{
        cheingeButtonPosition(startButtonPosition)
    }, [startButtonPosition])

    let cx = classNames.bind(button);
    const classNameLang = cx({
        chainge_mode_white_left: true,
        chainge_button_position: buttonPosition,
        chainge_mode_darck: darckMode
    })

    const OnClickActions = () => {
        ChaingeMode()
        cheingeButtonPosition(!buttonPosition)
    }

    return (
        <div className={button.chainge_mode}>
            <p>{`${(appLanguage === 'ru') ? RuTextLeft : EnTextLeft}`}</p>
            <div
                className={classNameLang}
                onClick={OnClickActions}
            >
                <div />
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