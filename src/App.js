import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import { connect } from 'react-redux'
import { compose } from 'redux';
import classNames from 'classnames/bind'
import Header from './components/Header/header';
import YourPlace from './components/YourPlace/your-place';


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
    <BrowserRouter>
      <div className={classNameB}>
        <div className={classNameH}>
          <Header/>
        </div>
        <div className={classNameC}>
          <Switch>
            {/* {<Route path='/myprofile/:userId?' render={() => <UserContainer />} />
            <Route path='/meseges' render={() => <ChatContainer />} />
            <Route path='/login' render={() => <Login />} /> */}
            <Route exact path='/' render={() => <YourPlace/>}/>
            <Route path='/*' render={() => <h1> 404 page not found </h1>} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>

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


