import fs from 'node:fs/promises'

const outputDir = 'lib'
const preflightUrl =
  'https://raw.githubusercontent.com/tailwindlabs/tailwindcss/refs/heads/main/packages/tailwindcss/preflight.css'

try {
  const response = await fetch(preflightUrl)
  const content = await response.text()
  const transformed = content
    .replace(/\B--theme\(\s*--.*?,\s*(.*?)\s*\)/gs, '$1')
    .replace(/\s*(-webkit-)?text-decoration: inherit;/gs, '')

  await fs.mkdir(outputDir, { recursive: true })
  await fs.writeFile(`${outputDir}/preflight.css`, transformed)
  console.log(
    'Preflight CSS was downloaded, transformed, and saved successfully.',
  )
} catch (error) {
  console.error(error)
}
