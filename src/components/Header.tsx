import { useState, useEffect } from 'react'

interface HeaderProps {
  darkMode: boolean
  onToggleDark: () => void
}

export const Header = ({ darkMode, onToggleDark }: HeaderProps) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hour = time.getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <header className="text-center pt-12 pb-8 relative">
      <button
        onClick={onToggleDark}
        className="absolute right-0 top-12 p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <p className="text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
        {dateStr}
      </p>
      <h1 className="text-[5.5rem] font-thin text-stone-800 dark:text-stone-100 leading-none tracking-tight tabular-nums">
        {timeStr}
      </h1>
      <p className="text-xl text-stone-500 dark:text-stone-400 mt-3 font-light">{greeting}, Seth</p>

    </header>
  )
}
