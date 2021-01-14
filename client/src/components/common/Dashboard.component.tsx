/* eslint-disable multiline-ternary */
/* eslint-disable space-infix-ops */
/* Lib */
import React, { useState } from 'react'
import styled from 'styled-components'

/* Own Libraries */
import { IconRack } from '../common/svgIcons'

interface SideBarItem {
  name: string
  handler: string
  component: React.ReactElement
  icon: React.ReactElement
}

interface DashboardComponentProps {
  sideBarItems: SideBarItem[]
}

const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 16em auto;
  // grid-column-gap: 3em;
  background-color: #fff;
`

const SideBar = styled.div`
  height: 100%;
  border-bottom-right-radius: 25px;

  .active {
    p {
      color: #212529;
    }
    svg {
      fill: #159848;
    }
  }
`

const StyledSideBarHeader = styled.div`
  color: #212529;
  margin: 1em;
  display: flex;
  align-items: center;

  span {
    margin-left: 0.4em;
    font-size: 1.2rem;
    font-weight: bold;
  }
`

const StyledSideBarItem = styled.div`
  width: 100%;
  color: #b9b9b9;
  border-right: 1px solid #fff;
  :hover {
    cursor: pointer;
    svg {
      fill: #159848;
    }
    p {
      color: #5a6773;
    }
  }
  p {
    margin: 1.2em;
    padding: 0.2em;
  }
  .dashIcon {
    margin-right: 0.8em;
  }
`

const HeaderText = styled.span`
  background: #159848;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`

const DashboardContainer = (
  props: DashboardComponentProps
): React.ReactElement => {
  const [activePage, setActivePage] = useState(props.sideBarItems[0])

  return (
    <DashboardWrapper>
      <SideBar>
        <StyledSideBarHeader>
          <HeaderText>Instrumentbräda</HeaderText>
        </StyledSideBarHeader>
        {props.sideBarItems.map((item: any, index: any) => {
          return (
            <StyledSideBarItem
              key={index}
              onClick={() => setActivePage(item)}
              className={item.handler === activePage.handler ? 'active' : ''}
            >
              <p>
                <span className="dashIcon">{item.icon}</span>
                {item.name}
              </p>
            </StyledSideBarItem>
          )
        })}
      </SideBar>
      <div
        className="shadow bg-light db-container"
      >
        {activePage.component}
      </div>
    </DashboardWrapper>
  )
}

export default DashboardContainer
