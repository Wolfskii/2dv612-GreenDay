/* eslint-disable multiline-ternary */
/* Lib */
import React, { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import axios from 'axios'

/* Lib: Redux stuff */
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/authActions'
import { loadMessages } from './actions/messageActions'

/* Components */
import Navbar from './components/nav/NavbarContainer'
import Homepage from './components/homepage/Homepage'
import ListingsPage from './components/listingspage/ListingsPage'
import SingleListingPage from './components/listingspage/SingleListingPage'
import Admin from './components/admin/Admin'
import AdminLogin from './components/admin/Login'
import CustomerDashboardContainer from './components/customer/CustomerDashboardContainer'
import DashboardContainer from './components/producer/DashboardContainer'
import FooterContainer from './components/footer/FooterContainer'
import SearchPage from './components/searchpage/SearchPage'
import ProducerPage from './components/searchpage/ProducerPage'
import NoPageFound from './components/404'

/* Protected/Private routes */
import AdminRoute from './routes/AdminRoute' // för gömda admin rutter
import CustomerRoute from './routes/CustomerRoute' // för gömda customer rutter
import ProducerRoute from './routes/ProducerRoute'

// import UserRoute from './routes/UserRoute'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = (props: any): any => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [window.location.pathname])

  const showFooter = ({ pathname } = window.location) => {
    switch (pathname) {
      case '/producer/dashboard':
      case '/customer/dashboard':
      case '/admin/panel':
        return false
      default:
        return true
    }
  }

  useEffect(() => {
    console.log('hello there')
    store.dispatch(loadMessages())
  }, [window.location.pathname])

  return (
    <Provider store={store}>
      <div className="app-container">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route exact path="/annonser" component={ListingsPage} />
          <Route exact path="/annonser/:id" component={SingleListingPage} />
          <Route exact path="/search/:id" component={SearchPage} />
          <Route exact path="/search/producer/:id" component={ProducerPage} />
          <Route exact path="/admin" component={AdminLogin} />
          <AdminRoute exact path="/admin/:subpage" component={Admin} />
          <CustomerRoute
            exact
            path="/customer/:subpage"
            component={CustomerDashboardContainer}
          />
          <ProducerRoute
            exact
            path="/producer/:subpage"
            component={DashboardContainer}
          />
          <Route path="/*" component={NoPageFound} />
        </Switch>
        {showFooter() && <FooterContainer />}
      </div>
    </Provider>
  )
}

export default withRouter(App)
