#!/usr/bin/env node
// import pkg from '../package.json'
import { Command } from 'commander'
import { getProjectRalateInfo } from './create'
import { createPage } from './createPage'

const program = new Command()
program.version('0.0.1')

program.option('create', '-c', 'write the name of project and then begin to create your project')

program.on('--help', () => {
  console.log('-----')
})

program.command('create <projectName>')
  .action((projectName, opts) => {
    console.log('projectName', projectName)
    getProjectRalateInfo(projectName)
  })
program.command('createPage <t> <pageName>')
  // .option('-t', '--type', 'set a name of single page')
  .action((type: string, pageName: string) => {
    console.log('type', type, pageName)
    createPage(type, pageName)
  })
program.parse(process.argv)
