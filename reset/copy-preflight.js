import fs from 'node:fs/promises'

try {
  const response = await fetch(
    'https://raw.githubusercontent.com/tailwindlabs/tailwindcss/refs/heads/main/packages/tailwindcss/preflight.css',
  )
  const content = await response.text()
  const transformed = content.replace(/\B--theme\b/g, 'var')

  await fs.writeFile('reset/preflight.css', transformed)
  console.log(
    'Preflight CSS was downloaded, transformed, and saved successfully.',
  )
} catch (error) {
  console.error(error)
}
