import React from 'react'
import { compose } from 'redux';
import c from './c.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

const CityCard =(props) => {

    let cx = classNames.bind(c);
    const className =cx({
        add_card: true,
        add_card_dark: props.darckMode
    })

    return(
            <div className ={className}>
                <p>Add city</p>
                <button></button>
            </div>     
    )
}

let mapStateToProps = (state) =>{
    return{
        darckMode: state.GlobalSettings.darkMode,
    }
}
export default compose(
    connect(mapStateToProps,{})
) (CityCard)