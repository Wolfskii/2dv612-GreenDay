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
import DashBoardComponent from '../common/Dashboard.component'
import CustomerHome from './CustomerHome'

/* Styles */
import './style.css'
import SubscriptionComponent from '../common/subscribe/SubscriptionComponent'

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
    name: 'Hem',
    handler: 'home',
    component: <CustomerHome />,
    icon: <IconDashboard />
  },
  {
    name: 'Prenumeration',
    handler: 'subscription',
    component: <SubscriptionComponent />,
    icon: <IconBell />
  }
]

const DashboardContainer = (props: any): any => {
  return <DashBoardComponent sideBarItems={sideBarItems} />
}

const mapStateToProps = (state: any) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps)(DashboardContainer)
