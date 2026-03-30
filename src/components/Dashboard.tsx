import { useState } from 'react'
import { Header } from './Header'
import { Card } from './Card'

const quickLinks = [
  { name: 'GitHub', initials: 'GH', bg: 'bg-stone-900', text: 'text-white', url: 'https://github.com' },
  { name: 'Gmail', initials: 'GM', bg: 'bg-red-500', text: 'text-white', url: 'https://mail.google.com' },
  { name: 'Calendar', initials: 'CA', bg: 'bg-blue-500', text: 'text-white', url: 'https://calendar.google.com' },
  { name: 'Notion', initials: 'NO', bg: 'bg-stone-700', text: 'text-white', url: 'https://notion.so' },
  { name: 'Figma', initials: 'FI', bg: 'bg-purple-500', text: 'text-white', url: 'https://figma.com' },
  { name: 'Slack', initials: 'SL', bg: 'bg-green-600', text: 'text-white', url: 'https://slack.com' },
  { name: 'Linear', initials: 'LI', bg: 'bg-indigo-600', text: 'text-white', url: 'https://linear.app' },
  { name: 'YouTube', initials: 'YT', bg: 'bg-red-600', text: 'text-white', url: 'https://youtube.com' },
]

interface Todo {
  id: number
  text: string
  done: boolean
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Review pull request #42', done: true },
  { id: 2, text: 'Update project documentation', done: false },
  { id: 3, text: 'Team standup at 10am', done: false },
  { id: 4, text: 'Deploy to staging environment', done: false },
  { id: 5, text: 'Send weekly progress report', done: false },
]

export const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')

  const toggleDark = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', String(!prev))
      return !prev
    })
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: newTodo.trim(), done: false },
    ])
    setNewTodo('')
  }

  const completedCount = todos.filter((t) => t.done).length

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-amber-50 dark:bg-stone-950">
        <div className="max-w-5xl mx-auto px-6">
          <Header darkMode={darkMode} onToggleDark={toggleDark} />

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            <Card
              title="Tasks Done"
              value={`${completedCount} / ${todos.length}`}
              subtitle={`${todos.length - completedCount} remaining`}
              accentBg="bg-amber-50"
              icon={
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              }
            />
            <Card
              title="Focus Time"
              value="3h 45m"
              subtitle="today"
              accentBg="bg-violet-50"
              icon={
                <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <Card
              title="Day Streak"
              value="14 days"
              subtitle="keep it up!"
              accentBg="bg-rose-50"
              icon={
                <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <Card
              title="Bookmarks"
              value="247"
              subtitle="total saved"
              accentBg="bg-emerald-50"
              icon={
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              }
            />
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-3 gap-4 pb-10">

            {/* Quick Links */}
            <div className="col-span-2 bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800">
              <h2 className="text-stone-400 dark:text-stone-500 text-xs font-semibold uppercase tracking-widest mb-5">
                Quick Links
              </h2>
              <div className="grid grid-cols-4 gap-2">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors group"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${link.bg} ${link.text} flex items-center justify-center text-xs font-bold shadow-sm`}
                    >
                      {link.initials}
                    </div>
                    <span className="text-stone-500 dark:text-stone-400 text-xs group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>

              {/* Divider + weather-style footer */}
              <div className="mt-5 pt-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-stone-300 dark:text-stone-600 text-xs">
                  Click any link to open — right-click to customize
                </span>
                <button className="text-xs text-amber-500 hover:text-amber-600 font-medium transition-colors">
                  + Add link
                </button>
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 shadow-sm border border-stone-100 dark:border-stone-800 flex flex-col">
              <h2 className="text-stone-400 dark:text-stone-500 text-xs font-semibold uppercase tracking-widest mb-4">
                Today's Tasks
              </h2>

              <ul className="space-y-3 flex-1">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    onClick={() => toggleTodo(todo.id)}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${todo.done
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-stone-300 dark:border-stone-600 group-hover:border-emerald-300'
                        }`}
                    >
                      {todo.done && (
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm leading-snug transition-colors ${todo.done
                        ? 'text-stone-400 line-through'
                        : 'text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100'
                        }`}
                    >
                      {todo.text}
                    </span>
                  </li>
                ))}
              </ul>

              <form onSubmit={addTodo} className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a task..."
                  className="w-full text-sm text-stone-700 dark:text-stone-300 placeholder-stone-300 dark:placeholder-stone-600 outline-none focus:placeholder-stone-200 transition-colors bg-transparent"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
