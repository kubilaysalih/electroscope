#!/usr/bin/env node
import { spawn, ChildProcess } from 'child_process'
import { join } from 'path'
import { green } from 'chalk'

const getElectronPath = () => {
  const platform = process.platform
  switch (platform) {
    case 'darwin':
      return 'Electron.app/Contents/MacOS/Electron'
    case 'freebsd':
    case 'linux':
      return 'electron'
    case 'win32':
      return 'electron.exe'
  }
}

let electronProcess: ChildProcess
const electronPath = join(process.cwd(), './node_modules/electron/dist/', getElectronPath())

console.log(green('Starting electron...'))

const randomizer = ((new Date().getTime()).toString(36))

const processManager = () => {
  if (electronProcess) electronProcess.kill()
  electronProcess = spawn((electronPath || 'electron'), [...process.argv.slice(2, (process as any).argc), randomizer])
  electronProcess.on('error', () => {
    throw new Error('It seems there is no electron :(')
  })
  electronProcess.stdout.on('data', (data) => {
    const out = data.toString('utf8').trim()
    if (out === randomizer) {
      console.log(green('Restarting electron...'))
      processManager()
    } else if (out) {
      console.log(out)
    }
  })
  return electronProcess
}

processManager()
