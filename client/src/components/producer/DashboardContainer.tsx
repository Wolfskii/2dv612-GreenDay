/* eslint-disable multiline-ternary */
/* eslint-disable space-infix-ops */

/* Lib */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { connect } from 'react-redux'

/* Own Libraries */
import {
  IconDashboard,
  IconJournal,
  IconTag,
  IconBagPlus,
  IconChatRight,
  IconCashStack,
  IconColumnsGap,
  IconRack,
  IconBell
} from '../common/svgIcons'

/* Components */
import ContactInfoComponent from './ContactInfoComponent'
import AddProductComponent from './AddProductComponent'
import DashBoardComponent from '../common/Dashboard.component'
import SubscriptionComponent from '../common/subscribe/SubscriptionComponent'
import ProductList from './ProductList'
import Messages from './MessageDashboard'

/* Styles */
import ListingList from './ListingList'
import ListingForm from './ListingForm'
import './style.css'

interface Customer {
  customerId: number
  username: string
  email: string
  firstname: string
  lastname: string
  phone: string
}

const sideBarItems = [
  {
    name: 'Kontaktuppgifter',
    handler: 'contact',
    component: <ContactInfoComponent />,
    icon: <IconJournal />
  },
  {
    name: 'Prenumeration',
    handler: 'subscription',
    component: <SubscriptionComponent />,
    icon: <IconBell />
  },
  {
    name: 'Hantera produkter',
    handler: 'manageProducts',
    component: <ProductList />,
    icon: <IconTag />
  },
  {
    name: 'Lägg till produkt',
    handler: 'addProduct',
    component: <AddProductComponent />,
    icon: <IconBagPlus />
  },
  {
    name: 'Meddelanden',
    handler: 'addMessage',
    component: <Messages />,
    icon: <IconChatRight />
  },
  {
    name: 'Hantera annonser',
    handler: 'manageListings',
    component: <ListingList />,
    icon: <IconColumnsGap />
  },
  {
    name: 'Lägg till annons',
    handler: 'addListing',
    component: <ListingForm />,
    icon: <IconCashStack />
  }
]

const DashboardContainer = (props: any): any => {
  return <DashBoardComponent sideBarItems={sideBarItems} />
}

const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(DashboardContainer)
