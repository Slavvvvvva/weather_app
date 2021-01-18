import React from 'react'
import { compose } from 'redux';
import h from './h.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import {chaingeDarckModeAC} from '../Redux/global-settings-reduser'

const Header = (props) => {

    let cx = classNames.bind(h);
    const className =cx({
        chainge_mode_white: true,
        chainge_mode_darck: props.darckMode
    })

    const ChaingeMode = () =>{
        props.chaingeDarckModeAC()
    }

    return(
        <>
        <div>
            <p>MiniWeathear</p>
        </div>
        <div>
            <p>Today date</p>
        </div>
        <div>
            <span>Light</span>
            <div className ={className} onClick = {ChaingeMode}></div>
            <span>Dark</span>
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