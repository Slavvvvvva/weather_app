import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import { connect } from 'react-redux'
import { compose } from 'redux';
import classNames from 'classnames/bind'
import Header from './components/Header/header';
import YourPlace from './components/YourPlace/your-place';
import DetailWeather from './components/DetailWeather/detail-weather';


const App = (props) => {

  let cx = classNames.bind(s);
  const classNameH =cx({
        head: true,
        head_black: props.darckMode
    })
  const classNameC =cx({
      content: true,
      content_black: props.darckMode
  })
  const classNameB =cx({
    body: true,
    body_black: props.darckMode
})

  return (
    <HashRouter>
      <div className={classNameB}>
        <div className={classNameH}>
          <Header/>
        </div>
        <div className={classNameC}>
          <Switch>
            <Route path='/detail/:sityId' render={() => <DetailWeather/>} />
            <Route exact path='/' render={() => <YourPlace/>}/>
            <Route path='/*' render={() => <h1> 404 page not found </h1>} />
          </Switch>
        </div>
      </div>
    </HashRouter>

  )

}

let mapStateToProps = (state) =>{
  return{
      darckMode: state.GlobalSettings.darkMode,
  }
}
export default compose(
  connect(mapStateToProps,{})
) (App)


