/* Lib */
import React, { useState } from 'react'
import Styled from 'styled-components'

import ProducerForm from './ProducerForm'
import ProducerList from './ProducerList'
import CategoryList from './CategoryList'
import CategoryForm from './CategoryForm'
import DashBoardComponent from '../common/Dashboard.component'

/* Own Libraries */
import {
  IconPeople,
  IconPersonPlus,
  IconJournals,
  IconJournalPlus,
  IconRack
} from '../common/svgIcons'

interface Producer {
  username: string
  name: string
  orgNumber: string
  email: string
}

const sideBarItems = [
  {
    name: 'Hantera producenter',
    handler: 'manageProducers',
    component: <ProducerList />,
    icon: <IconPeople />
  },
  {
    name: 'Lägg till producent',
    handler: 'addProducer',
    component: <ProducerForm />,
    icon: <IconPersonPlus />
  },
  {
    name: 'Hantera kategorier',
    handler: 'manageCategories',
    component: <CategoryList />,
    icon: <IconJournals />
  },
  {
    name: 'Lägg till kategori',
    handler: 'addCategories',
    component: <CategoryForm />,
    icon: <IconJournalPlus />
  }
]

const Admin = (): any => {
  return <DashBoardComponent sideBarItems={sideBarItems} />
}

export default Admin
