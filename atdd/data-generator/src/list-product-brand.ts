import fs from 'fs'
import path from 'path'
import { RowDataPacket } from 'mysql2'
import { createConnection } from './db'

export async function listProductBrand(): Promise<string[]> {
  const connection = createConnection()

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err)
        return
      }

      connection.query(
        'SELECT DISTINCT product_brand FROM products ORDER BY product_brand',
        (error, results: RowDataPacket[]) => {
          connection.end()

          if (error) {
            reject(error)
            return
          }

          const brands = results.map((row) => row.product_brand as string)
          const outputDir = path.join(process.cwd(), 'output')

          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
          }

          const outputPath = path.join(outputDir, 'product-brands.json')
          fs.writeFileSync(outputPath, JSON.stringify(brands, null, 2))
          console.log(`Saved ${brands.length} brand(s) to ${outputPath}`)

          resolve(brands)
        }
      )
    })
  })
}
