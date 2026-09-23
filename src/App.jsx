import { useEffect, useMemo, useState } from 'react'
import EntryForm from './components/EntryForm.jsx'
import { loadEntries, saveEntries } from './lib/storage.js'
import { sendEntryToSheet } from './lib/sheetsSync.js'
import { getUniqueNames } from './lib/names.js'
import './App.css'

export default function App() {
  const [entries, setEntries] = useState(() => loadEntries())
  const existingNames = useMemo(() => getUniqueNames(entries), [entries])

  useEffect(() => {
    saveEntries(entries)
  }, [entries])

  function handleAddEntry(entry) {
    setEntries((prev) =>
      [...prev, entry].sort((a, b) => b.date.localeCompare(a.date)),
    )
    sendEntryToSheet(entry)
  }

  return (
    <main className="page">
      <div className="card">
        <h1>📚 Китеп бетин эсептегич</h1>
        <EntryForm onAddEntry={handleAddEntry} existingNames={existingNames} />
      </div>
    </main>
  )
}
