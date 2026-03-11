import fs from 'fs'
import path from 'path'

const baseDir = path.resolve('docs/public/templates')
const outputFile = path.resolve('docs/data/templates.json')

const channelMap = {
  email: 'Email',
  sms: 'SMS',
  whatsapp: 'WhatsApp'
}

const textChannels = new Set(['sms', 'whatsapp'])

function formatTitle(flow) {
  return flow
    .split('-')
    .map(word => {
      if (/^\d+$/.test(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

function formatAgency(agency) {
  return agency
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatLanguage(language) {
  return language.toUpperCase()
}

function walkTemplates() {
  const templates = []

  if (!fs.existsSync(baseDir)) {
    console.log('No existe la carpeta docs/public/templates')
    return templates
  }

  const channels = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  for (const channelFolder of channels) {
    const channelPath = path.join(baseDir, channelFolder)

    const agencies = fs.readdirSync(channelPath, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)

    for (const agencyFolder of agencies) {
      const agencyPath = path.join(channelPath, agencyFolder)

      const flows = fs.readdirSync(agencyPath, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name)

      for (const flowFolder of flows) {
        const flowPath = path.join(agencyPath, flowFolder)

        const files = fs.readdirSync(flowPath, { withFileTypes: true })
          .filter(entry => entry.isFile())
          .map(entry => entry.name)

        for (const fileName of files) {
          const ext = path.extname(fileName).toLowerCase()
          const language = path.basename(fileName, ext)

          if (!['.html', '.txt'].includes(ext)) continue

          const id = `${agencyFolder}-${flowFolder}-${channelFolder}-${language}`
          const agency = formatAgency(agencyFolder)
          const flow = formatTitle(flowFolder)
          const channel = channelMap[channelFolder] || channelFolder
          const lang = formatLanguage(language)

          const publicFilePath = `/template-docs-platform/templates/${channelFolder}/${agencyFolder}/${flowFolder}/${fileName}`
          const absoluteFilePath = path.join(flowPath, fileName)

          const template = {
            id,
            title: `${formatTitle(flowFolder)} - ${agency}`,
            agency,
            flow: formatTitle(flowFolder),
            channel,
            language: lang
          }

          if (textChannels.has(channelFolder)) {
            const content = fs.readFileSync(absoluteFilePath, 'utf8')
            template.type = 'text'
            template.content = content
          } else {
            template.type = 'html'
            template.file = publicFilePath
          }

          templates.push(template)
        }
      }
    }
  }

  return templates.sort((a, b) => a.title.localeCompare(b.title))
}

const templates = walkTemplates()

fs.writeFileSync(outputFile, JSON.stringify(templates, null, 2), 'utf8')

console.log(`templates.json generado correctamente con ${templates.length} templates`)