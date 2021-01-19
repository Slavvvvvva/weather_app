import React from 'react'
import { compose } from 'redux';
import y from './y.module.scss'
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import CityCard from './CityCard/city-card';

const YourPlace =(props) => {

    let cx = classNames.bind(y);
    const className =cx({
        add_card: true,
        add_card_dark: props.darckMode
    })

    return(
        <>  
            <CityCard/>
            <div className ={className}>
                <p>Add city</p>
                <button></button>
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
    connect(mapStateToProps,{})
) (YourPlace)