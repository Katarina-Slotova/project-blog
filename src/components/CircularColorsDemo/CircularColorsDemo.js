'use client'
import React from 'react'
import clsx from 'clsx'
import { Play, Pause, RotateCcw } from 'react-feather'

import Card from '@/components/Card'
import VisuallyHidden from '@/components/VisuallyHidden'

import styles from './CircularColorsDemo.module.css'

import { motion } from 'framer-motion'

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
]

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length]

  React.useEffect(() => {
    if (!isPlaying) {
      return
    }
    const intervalId = window.setInterval(
      () => setTimeElapsed((currentValue) => currentValue + 1),
      1000
    )
    return () => window.clearInterval(intervalId)
  }, [isPlaying])

  function handlePlayAnimation() {
    setIsPlaying(!isPlaying)
  }

  function handleReset() {
    setIsPlaying(false)
    setTimeElapsed(0)
  }

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId='selected-color-outline'
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          )
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePlayAnimation}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CircularColorsDemo
