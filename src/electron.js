const { app, BrowserWindow, dialog, protocol } = require('electron')
const {readdir, readFile, writeFile} = require("fs/promises");
const path = require('path')
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

  const tempFilePath = path.join(app.getPath('temp'), "/weaknessLine").replaceAll('\\', '/');

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
    const files = await decompress(openDialogResult.filePaths[0], tempFilePath);
    // console.log("HERE", tempFilePath);

    files.forEach( (item) => {
      if(item.path == "presentation.md" ) {
        const content = item.data.toString();
        win.webContents.send("file-content", [content, tempFilePath]);
      }
    })

  });

  win.webContents.ipc.on("get-code-file-content", async (filename) => {
    await fs.readFile(tempFilePath + "/assets/" + filename , 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      win.webContents.send("code-file-content", data);
    });
  });

  win.on('close', function() {
    if (fs.existsSync(tempFilePath)) {
      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.log('could not clear temp file ', err)
          return;
        }
        console.log("sucessfully cleared temp file");
      });
    } else {
      console.log('could not clear temp file, ', tempFilePath,  ' does not exist');
    }
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

  protocol.registerFileProtocol('atom', (request, callback) => {
    console.log(request.url);
    const url = request.url.substring(7);
    callback({ path: url });
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})