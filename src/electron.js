const { app, BrowserWindow, dialog } = require('electron')
const {readdir, readFile, writeFile} = require("fs/promises");
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./src/logo.ico", 
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  win.webContents.ipc.on("get-file-content", async () => {
    const openDialogResult = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
      title : "Open file ...",
      buttonLabel : "Open",
      properties : [
        "openFile",
      ],
      filters : [
        { name: 'codeprez', extensions: ['codeprez'] },
      ],
    });

    const decompress = require('decompress');
    const files = await decompress(openDialogResult.filePaths[0], "../presentation");
    // const content = await readFile(files[2].data.toString() ,{encoding : "utf-8"});

    files.forEach( (item) => {
      if(item.path == "presentation.md" ) {
        const content = files[6].data.toString();
        win.webContents.send("file-content", content);
      }
    })

  });

  win.loadURL('http://localhost:3000/%27')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})