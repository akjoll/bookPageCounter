export function validateEntry({ name, date, pages }) {
  const errors = {}

  if (!name || !name.trim()) {
    errors.name = 'Атыңызды жазыңыз'
  }

  if (!date) {
    errors.date = 'Күндү тандаңыз'
  }

  const pagesNumber = Number(pages)
  if (pages === '' || pages === null || pages === undefined) {
    errors.pages = 'Окулган барак санын жазыңыз'
  } else if (!Number.isInteger(pagesNumber) || pagesNumber <= 0) {
    errors.pages = 'Барак саны 0дон чоң бүтүн сан болушу керек'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}
