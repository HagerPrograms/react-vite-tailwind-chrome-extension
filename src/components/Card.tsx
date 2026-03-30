import type { ReactNode } from 'react'

interface CardProps {
  title: string
  value: string
  subtitle?: string
  icon: ReactNode
  accentBg: string
}

export const Card = ({ title, value, subtitle, icon, accentBg }: CardProps) => {
  return (
    <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 shadow-sm border border-stone-100 dark:border-stone-800 hover:shadow-md transition-shadow">
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4 ${accentBg}`}
      >
        {icon}
      </div>
      <p className="text-stone-400 dark:text-stone-500 text-xs font-semibold uppercase tracking-widest">
        {title}
      </p>
      <p className="text-2xl font-semibold text-stone-800 dark:text-stone-100 mt-1 tabular-nums">{value}</p>
      {subtitle && <p className="text-stone-400 dark:text-stone-500 text-xs mt-1">{subtitle}</p>}
    </div>
  )
}
