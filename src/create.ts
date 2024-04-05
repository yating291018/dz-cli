
import inquirer from 'inquirer'
import downloadGitRepo from 'download-git-repo'
import ora from 'ora'
import spawn  from 'cross-spawn'


const installPackages = (loadTool: string, cwd: string, spinner: any) => {
  const toolMap: Record<string, string> = {
    npm: 'npm',
    cnpm: 'cnpm',
    yarn: 'yarn',
    pnpm: 'pnpm'
  }
  const spawnStu = spawn(toolMap[loadTool], ['install'], { cwd })
  spawnStu.on('close', (code: number) => {
    spinner.succeed('npm load ends')
    console.log(`child_process exits, exit code is: ${code}`)
  })
}

export const getProjectRalateInfo = async (projectName: string) => {
  const inquirerOpts = [
    {
      type: 'list',
      message: 'choose Vue version',
      name: 'vueVersion',
      choices: [
        'Vue2',
        'Vue3'
      ]
    },
    {
      type: 'list',
      message: 'choose version of pack tool',
      name: 'packVersion',
      choices: [
        'webpack5',
        'Vite'
      ]
    },
    {
      type: 'list',
      message: 'Please choose version of download tool',
      name: 'download_tool',
      choices: [
        'npm',
        'cnpm',
        'yarn',
        'pnpm'
      ]
    }
  ]
  const res = await inquirer.prompt(inquirerOpts)
  const currentPath = process.cwd()
  const spinner = ora('start to load git-repo').start()
  const download = await downloadGitRepo('github:yating291018/Bvue-template', currentPath + '/temp/', (err: any) => {
    if (!err) {
      spinner.succeed('git-load is successful')
      const npmSpinner = ora('start to load packages').start()
      installPackages(res.download_tool, currentPath + '/temp/', npmSpinner)
      return false
    }
    console.log('git-load is error', err)
  })
}