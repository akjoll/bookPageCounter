export function getUniqueNames(entries) {
  const seen = new Set()
  const names = []

  for (const entry of entries) {
    if (!seen.has(entry.name)) {
      seen.add(entry.name)
      names.push(entry.name)
    }
  }

  return names
}
