const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const {readdir, readFile, writeFile} = require("fs/promises");
const path = require('path')
const archiver = require('archiver');
const fs = require('fs');

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
    ipcMain.on('create-presentation', (event, data) => {
        // Create a new archive
        const outputFilePath = path.join(__dirname, 'presentation.zip');
        const output = fs.createWriteStream(outputFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });
      
        // Add the Markdown file to the archive
        archive.append(fs.createReadStream(data.markdownFile.path), { name: 'presentation.md' });
      
        // Add the CSS file to the archive
        archive.append(fs.createReadStream(data.cssFile.path), { name: 'style.css' });
      
        // Add the assets folder to the archive
        archive.directory(data.assetsFolder.path, 'assets');
      
        // Finalize the archive
        archive.pipe(output);
        archive.finalize();
      
        // When the archive is finished, send a message back to the renderer process
        output.on('close', () => {
          event.sender.send('presentation-created', outputFilePath);
        });
      });
      

    const content = await readFile(openDialogResult.filePaths[0] ,{encoding : "utf-8"});

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