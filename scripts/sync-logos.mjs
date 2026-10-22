import fs from 'node:fs'
import path from 'node:path'

const filesToDownload = [
  // PACOTE 1 — Fundo claro · Colorida (principal)
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-colorida-18ced.svg',
    dest: 'public/logos/comven-logo-claro-colorida.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-colorida-impressao-7cc03.png',
    dest: 'public/logos/comven-logo-claro-colorida-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-colorida-web-96279.png',
    dest: 'public/logos/comven-logo-claro-colorida-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-colorida-web2x-6f039.png',
    dest: 'public/logos/comven-logo-claro-colorida-web@2x.png',
  },

  // PACOTE 2 — Fundo escuro · Colorida
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-colorida-a5a64.svg',
    dest: 'public/logos/comven-logo-escuro-colorida.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-colorida-impressao-7dbe7.png',
    dest: 'public/logos/comven-logo-escuro-colorida-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-colorida-web-ea542.png',
    dest: 'public/logos/comven-logo-escuro-colorida-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-colorida-web2x-82373.png',
    dest: 'public/logos/comven-logo-escuro-colorida-web@2x.png',
  },

  // PACOTE 3 — Fundo claro · 1 cor azul
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-1cor-azul-b2543.svg',
    dest: 'public/logos/comven-logo-claro-1cor-azul.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-1cor-azul-impressao-7e25a.png',
    dest: 'public/logos/comven-logo-claro-1cor-azul-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-1cor-azul-web-441d2.png',
    dest: 'public/logos/comven-logo-claro-1cor-azul-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-claro-1cor-azul-web2x-a9367.png',
    dest: 'public/logos/comven-logo-claro-1cor-azul-web@2x.png',
  },

  // PACOTE 4 — Fundo escuro · 1 cor branca
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-1cor-branco-56cbc.svg',
    dest: 'public/logos/comven-logo-escuro-1cor-branco.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-1cor-branco-impressao-df2b3.png',
    dest: 'public/logos/comven-logo-escuro-1cor-branco-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-1cor-branco-web-cf709.png',
    dest: 'public/logos/comven-logo-escuro-1cor-branco-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-logo-escuro-1cor-branco-web2x-8e2fe.png',
    dest: 'public/logos/comven-logo-escuro-1cor-branco-web@2x.png',
  },

  // PACOTE 5 — Somente marca · Fundo claro colorida
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-claro-colorida-1e90d.svg',
    dest: 'public/logos/comven-wordmark-claro-colorida.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-claro-colorida-impressao-e547b.png',
    dest: 'public/logos/comven-wordmark-claro-colorida-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-claro-colorida-web-54994.png',
    dest: 'public/logos/comven-wordmark-claro-colorida-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-claro-colorida-web2x-fa214.png',
    dest: 'public/logos/comven-wordmark-claro-colorida-web@2x.png',
  },

  // PACOTE 6 — Somente marca · Fundo escuro colorida
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-colorida-da3ee.svg',
    dest: 'public/logos/comven-wordmark-escuro-colorida.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-colorida-impressao-cf02f.png',
    dest: 'public/logos/comven-wordmark-escuro-colorida-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-colorida-web-c32e3.png',
    dest: 'public/logos/comven-wordmark-escuro-colorida-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-colorida-web2x-0bed6.png',
    dest: 'public/logos/comven-wordmark-escuro-colorida-web@2x.png',
  },

  // PACOTE 7 — Somente marca · Fundo escuro 1 cor branca
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-1cor-branco-cac5c.svg',
    dest: 'public/logos/comven-wordmark-escuro-1cor-branco.svg',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-1cor-branco-impressao-84769.png',
    dest: 'public/logos/comven-wordmark-escuro-1cor-branco-impressao.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-1cor-branco-web-a39c4.png',
    dest: 'public/logos/comven-wordmark-escuro-1cor-branco-web.png',
  },
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-escuro-1cor-branco-web2x-c7078.png',
    dest: 'public/logos/comven-wordmark-escuro-1cor-branco-web@2x.png',
  },

  // PACOTE 8 — Somente marca · Fundo claro 1 cor azul (SVG)
  {
    url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/comven-wordmark-claro-1cor-azul-33f80.svg',
    dest: 'public/logos/comven-wordmark-claro-1cor-azul.svg',
  },
]

function getPngDimensions(buffer) {
  if (buffer.length < 24) return null
  if (
    buffer[0] !== 0x89 ||
    buffer[1] !== 0x50 ||
    buffer[2] !== 0x4e ||
    buffer[3] !== 0x47 ||
    buffer[4] !== 0x0d ||
    buffer[5] !== 0x0a ||
    buffer[6] !== 0x1a ||
    buffer[7] !== 0x0a
  ) {
    return null
  }
  const width = buffer.readUInt32BE(16)
  const height = buffer.readUInt32BE(20)
  return { width, height }
}

async function main() {
  const dir = path.resolve('public/logos')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  // 1. Baixar os 29 arquivos remotos (apenas se não existirem ou estiverem vazios)
  for (const item of filesToDownload) {
    const destPath = path.resolve(item.dest)
    if (!fs.existsSync(destPath) || fs.statSync(destPath).size === 0) {
      console.log(`[sync-logos] Baixando ${item.dest}...`)
      const res = await fetch(item.url)
      if (!res.ok) {
        throw new Error(`Falha ao baixar ${item.url}: status ${res.status}`)
      }
      const buf = Buffer.from(await res.arrayBuffer())
      fs.writeFileSync(destPath, buf)
    }
  }

  // 2. Mapear os 3 PNGs enviados em src/assets/
  const uploadedFiles = [
    'src/assets/comven-wordmark-claro-1cor-azul-web2x-6af39.png',
    'src/assets/comven-wordmark-claro-1cor-azul-impressao-1bad3.png',
    'src/assets/comven-wordmark-claro-1cor-azul-web-d0ec8.png',
  ]

  for (const p of uploadedFiles) {
    const srcPath = path.resolve(p)
    if (!fs.existsSync(srcPath)) continue
    const buf = fs.readFileSync(srcPath)
    const dims = getPngDimensions(buf)
    if (!dims) continue

    let targetName = ''
    if (dims.width >= 2000) {
      targetName = 'comven-wordmark-claro-1cor-azul-impressao.png'
    } else if (dims.width >= 1200) {
      targetName = 'comven-wordmark-claro-1cor-azul-web@2x.png'
    } else {
      targetName = 'comven-wordmark-claro-1cor-azul-web.png'
    }

    const destPath = path.resolve('public/logos', targetName)
    if (!fs.existsSync(destPath) || fs.statSync(destPath).size === 0) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`[sync-logos] Copiado ${targetName} (${dims.width}x${dims.height})`)
    }
  }

  // 3. Validação dos 32 arquivos
  const list = fs.readdirSync(dir)
  console.log(`[sync-logos] Concluído! ${list.length} arquivos em public/logos/`)
  for (const file of list.sort()) {
    const full = path.join(dir, file)
    const buf = fs.readFileSync(full)
    if (file.endsWith('.png')) {
      const d = getPngDimensions(buf)
      console.log(`  - ${file}: ${d?.width}x${d?.height} px (${buf.length} bytes)`)
    } else {
      console.log(`  - ${file}: SVG (${buf.length} bytes)`)
    }
  }
}

main().catch((err) => {
  console.error('[sync-logos] Erro:', err)
  process.exit(1)
})
