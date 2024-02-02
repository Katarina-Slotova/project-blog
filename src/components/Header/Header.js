'use client'
import React from 'react'
import clsx from 'clsx'
import { Rss, Sun, Moon } from 'react-feather'

import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants'

import Logo from '@/components/Logo'
import VisuallyHidden from '@/components/VisuallyHidden'

import styles from './Header.module.css'

import Cookie from 'js-cookie'

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  function handleThemeToggle() {
    setTheme(nextTheme)
    // cookie method from next is not usable in client components
    // js-cookie library is used for client components
    Cookie.set('color-theme', nextTheme, {
      expires: 1000,
    })

    const nextTokens = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS

    const root = document.documentElement

		root.setAttribute('data-color-theme', nextTheme) 

    // go through all key value pairs in nextTokens object and apply them as new property on style tag
    Object.entries(nextTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size='1.5rem'
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleThemeToggle}>
          {theme === 'light' ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  )
}

export default Header
