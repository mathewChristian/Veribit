const {app, Menu, Tray } = require('electron')
const novi = require('novi-server')
const open = require('open')
let tray = null
const init = () => {
  const homedir = require('os').homedir();
  novi({ db: homedir + "/.novi" })
  createTray()
  open("http://localhost:21000")
}
const createTray = () => {
  tray = new Tray(process.resourcesPath)
  const contextMenu = Menu.buildFromTemplate([{
    label: 'Dashboard',
    click: () => {
      open("http://localhost:21000")
    }
  }, {
    label: 'Exit',
    click: () => {
      app.quit()
    }
  }])
  if (process.platform === 'win32') {
    tray.on('click', () => {
      tray.popUpContextMenu(contextMenu)
    })
  }
  tray.setToolTip('Novi')
  tray.setContextMenu(contextMenu)
}
app.whenReady().then(() => {
  init()
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
if (app.dock) app.dock.hide()
