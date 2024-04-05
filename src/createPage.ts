
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const filenameNew = fileURLToPath(import.meta.url) // 当前执行文件的地址
console.log('filenameNew', filenameNew)
const dirname = path.dirname(filenameNew)

export const createPage = async (pageType: string, pageName: string) => {
  try {
    // console.log('dirname', dirname)
    const fileContent = await fs.readFileSync(path.resolve(dirname, '../template/vue2Template.vue'))
    const currentPath = process.cwd()
    // console.log('currentPath', currentPath)
    await fs.writeFileSync(path.resolve(currentPath, pageName + '.vue'), fileContent.toString())
  } catch (e) {
    throw e
  }
}