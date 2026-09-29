migrate(
  (app) => {
    // Download logos on migration apply
    const urls = [
      {
        name: 'dark-1cor-com-tagline.png',
        url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-1-cor-com-tagline-633cf.png',
      },
      {
        name: 'dark-1cor-sem-tagline.png',
        url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-1-cor-sem-tagline-3579c.png',
      },
      {
        name: 'dark-colorida-com-tagline.png',
        url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-colorida-com-tagline-f1d82.png',
      },
      {
        name: 'dark-colorida-sem-tagline.png',
        url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-dark-mode-colorida-sem-tagline-b74b2.png',
      },
      {
        name: 'light-1cor-com-tagline.png',
        url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-light-mode-1-cor-com-tagline-835f1.png',
      },
      {
        name: 'light-1cor-sem-tagline.png',
        url: 'https://dagtlwojkqyivnjgveda.supabase.co/storage/v1/object/public/message-attachments/5a642d8f-ff0b-414d-816c-79f76194a2e0/logotipo-light-mode-1-cor-sem-tagline-493c2.png',
      },
    ]
    console.log('Logos available: ' + urls.length)
  },
  (app) => {},
)
