import React from 'react'
import { useLinkProps, useActive } from 'react-navi'
import styled from 'styled-components'

import Home from '../../icons/home'
import Create from '../../icons/create'
import List from '../../icons/list'

import profile from '../../images/profile.jpg'

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px 12px;
  border-radius: 24px;
  background-color: #373759;
  overflow: hidden;
`

const MenuItemWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 52px;
  height: 52px;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  color: ${p => (p.active ? '#fff' : '#73738b')};
  background-color: ${p => (p.active ? '#6888ff' : 'none')};

  &:before {
    content: '';
    display: block;
    width: 48px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -36px;
    background-color: ${p => (p.active ? '#6888ff' : 'none')};
  }

  &:hover {
    color: #fff;
    background-color: #6888ff;
  }

  &:hover:before {
    background-color: #6888ff;
  }

  svg {
    max-width: 100%;
    width: 100%;
  }
`

type MenuItemProps = {
  href: string
  children: React.ReactNode
}

const MenuItem = ({ href, children }: MenuItemProps) => {
  const active = useActive(href)
  const linkProps = useLinkProps({ href })

  return (
    <MenuItemWrapper as="a" {...linkProps} active={active}>
      {children}
    </MenuItemWrapper>
  )
}

const ProfilePicture = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 24px;
  display: block;
  overflow: hidden;
  margin-bottom: 24px;

  img {
    width: 100%;
    max-width: 100%;
  }
`

const Menu = () => {
  return (
    <MenuWrapper>
      <ProfilePicture>
        <img src={profile} />
      </ProfilePicture>
      <MenuItem href="/">
        <Home />
      </MenuItem>
      <MenuItem href="/create">
        <Create />
      </MenuItem>
      <MenuItem href="/list">
        <List />
      </MenuItem>
    </MenuWrapper>
  )
}

export default Menu
