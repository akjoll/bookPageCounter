import { useEffect, useRef, useState } from 'react'
import { validateEntry } from '../lib/validation.js'
import { getTodayIsoDate } from '../lib/date.js'

const SUCCESS_MESSAGE_DURATION_MS = 3000

function createEmptyForm() {
  return { name: '', date: getTodayIsoDate(), pages: '' }
}

export default function EntryForm({ onAddEntry, existingNames = [] }) {
  const [form, setForm] = useState(createEmptyForm)
  const [errors, setErrors] = useState({})
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const nameFieldRef = useRef(null)
  const successTimeoutRef = useRef(null)

  useEffect(() => {
    if (!showSuggestions) return

    function handleOutsideClick(event) {
      if (nameFieldRef.current && !nameFieldRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showSuggestions])

  useEffect(() => {
    return () => clearTimeout(successTimeoutRef.current)
  }, [])

  const suggestions = existingNames.filter((name) =>
    name.toLowerCase().includes(form.name.trim().toLowerCase()),
  )

  function handleChange(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }
  }

  function handleSelectSuggestion(name) {
    setForm((prev) => ({ ...prev, name }))
    setShowSuggestions(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const { valid, errors: validationErrors } = validateEntry(form)
    setErrors(validationErrors)
    if (!valid) return

    onAddEntry({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      date: form.date,
      pages: Number(form.pages),
    })
    setForm(createEmptyForm())
    setShowSuggestions(false)

    setShowSuccess(true)
    clearTimeout(successTimeoutRef.current)
    successTimeoutRef.current = setTimeout(() => setShowSuccess(false), SUCCESS_MESSAGE_DURATION_MS)
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit} noValidate>
      <div className="field" ref={nameFieldRef}>
        <label htmlFor="name">Аты</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={handleChange('name')}
          onFocus={() => setShowSuggestions(existingNames.length > 0)}
          placeholder="Атыңызды жазыңыз"
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((name) => (
              <li key={name}>
                <button type="button" onClick={() => handleSelectSuggestion(name)}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="date">Күнү</label>
        <input id="date" type="date" value={form.date} onChange={handleChange('date')} />
        {errors.date && <span className="field-error">{errors.date}</span>}
      </div>

      <div className="field">
        <label htmlFor="pages">Окулган бет саны</label>
        <input
          id="pages"
          type="number"
          min="1"
          step="1"
          value={form.pages}
          onChange={handleChange('pages')}
          placeholder="0"
          inputMode="numeric"
        />
        {errors.pages && <span className="field-error">{errors.pages}</span>}
      </div>

      <button type="submit" className="submit-button">
        Жазуу кошуу
      </button>

      {showSuccess && (
        <p className="success-message" role="status" aria-live="polite">
          ✓ Жазуу ийгиликтуу аякталды
        </p>
      )}
    </form>
  )
}
