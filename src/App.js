import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import s from './App.module.scss';
import { connect } from 'react-redux'
import { compose } from 'redux';
import Header from './components/Header/header';

const App = () => {

  return (
    <BrowserRouter>
      <div className={s.body}>
        <div className={s.head}>
          <Header/>
        </div>
        <div className={s.content}>
          <Switch>
            {/* {<Route path='/myprofile/:userId?' render={() => <UserContainer />} />
            <Route path='/meseges' render={() => <ChatContainer />} />
            <Route path='/login' render={() => <Login />} />
            <Route exact path='/' render={() => <Redirect to={'/login'} />} />}
            <Route path='/*' render={() => <h1> 404 page not found </h1>} /> */}
          </Switch>
        </div>
      </div>
    </BrowserRouter>

  )

}
export default App



