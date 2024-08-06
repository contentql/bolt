'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { JSONTree } from 'react-json-tree'

import { cn } from '@/utils/cn'

const tabVariant = {
  active: {
    width: '55%',
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
  inactive: {
    width: '20%',
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
}

const tabTextVariant = {
  active: {
    opacity: 1,
    x: 0,
    display: 'block',
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: -30,
    height: '10px',
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.1,
    },
    transitionEnd: { display: 'none' },
  },
}

const TabComponent = ({
  tabs,
  defaultIndex = 0,
}: {
  tabs: any
  defaultIndex?: number
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--active-color',
      tabs[activeTabIndex].color,
    )
  }, [activeTabIndex, tabs])

  // Default to a tab based on the URL hash value
  useEffect(() => {
    const tabFromHash = tabs.findIndex(
      (tab: any) => `#${tab.id}` === window.location.hash,
    )
    setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex)
  }, [tabs, defaultIndex])

  const onTabClick = (index: number) => {
    setActiveTabIndex(index)
  }

  return (
    <div className='container'>
      <div className='tabs-component'>
        <ul className='tab-links' role='tablist'>
          {tabs.map((tab: any, index: number) => (
            <motion.li
              key={tab.id}
              className={cn('tab', { active: activeTabIndex === index })}
              role='presentation'
              variants={tabVariant}
              animate={activeTabIndex === index ? 'active' : 'inactive'}>
              <a href={`#${tab.id}`} onClick={() => onTabClick(index)}>
                {tab.icon}
                <motion.span variants={tabTextVariant}>{tab.title}</motion.span>
              </a>
            </motion.li>
          ))}
        </ul>
        {tabs.map((tab: any, index: number) => (
          <tab.content
            key={tab.id}
            id={`${tab.id}-content`}
            active={activeTabIndex === index}
            data={tab?.data}
          />
        ))}
      </div>
    </div>
  )
}

export default TabComponent

const tabContentVariant = {
  active: {
    display: 'block',
    transition: {
      staggerChildren: 0.2,
    },
  },
  inactive: {
    display: 'none',
  },
}

export const TabContent = ({
  id,
  active,
  data,
}: {
  id: any
  active: any
  data: any
}) => {
  const isValidJson = data && typeof data === 'object'
  const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  }
  return (
    <motion.div
      role='tabpanel'
      id={id}
      className='codeContainer mx-auto mt-10 h-screen w-full overflow-scroll rounded-2xl bg-zinc-800 p-4 md:h-[500px] lg:max-w-4xl'
      variants={tabContentVariant}
      animate={active ? 'active' : 'inactive'}
      initial='inactive'>
      <JSONTree data={data} theme={theme} invertTheme={false} />
    </motion.div>
  )
}
