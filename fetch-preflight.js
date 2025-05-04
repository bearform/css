import fs from 'node:fs/promises'

const outputPath = 'base/preflight.css'
const preflightUrl =
  'https://raw.githubusercontent.com/tailwindlabs/tailwindcss/refs/heads/main/packages/tailwindcss/preflight.css'

try {
  const response = await fetch(preflightUrl)
  const content = await response.text()
  const transformed = content.replace(
    /\B--theme\(\s*--.*?,\s*(.*?)\s*\)/gs,
    '$1',
  )

  await fs.writeFile(outputPath, transformed)
  console.log(
    'Preflight CSS was downloaded, transformed, and saved successfully.',
  )
} catch (error) {
  console.error(error)
}
