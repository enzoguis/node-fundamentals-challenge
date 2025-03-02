import fs from 'fs'
import { parse } from 'csv-parse'

const filePath = new URL('./tasks.csv', import.meta.url)

const processFile = async () => {
  const parser = fs.createReadStream(filePath).pipe(
    parse({
      delimiter: ',',
      fromLine: 2,
    })
  )
  for await (const record of parser) {
    const [title, description] = record

    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
  }
}

processFile()
