export function sendEntryToSheet(entry) {
  const webhookUrl = import.meta.env.VITE_SHEET_WEBHOOK_URL
  if (!webhookUrl) return

  const body = new URLSearchParams({
    name: entry.name,
    date: entry.date,
    pages: String(entry.pages),
  })

  return fetch(webhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    body,
  }).catch(() => {
    // Webhook unreachable (offline, URL misconfigured, deployment revoked) —
    // the entry stays saved locally regardless, so we swallow this quietly.
  })
}
