declare const process: any
const p = process
  ? Object.keys(process.env).filter(
      (k) =>
        k.includes('ATTACHMENT') || k.includes('FILE') || k.includes('URL') || k.includes('ASSET'),
    )
  : []
throw new Error('DEBUG_ENV: ' + JSON.stringify(p))
