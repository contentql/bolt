'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <input
      type='checkbox'
      checked={theme === 'dark-mode'}
      onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
      className='toggle'
    />
  )
}

export default ThemeSwitcher
