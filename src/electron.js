const { app, BrowserWindow, dialog, protocol } = require('electron')
const {readdir, readFile, writeFile} = require("fs/promises");
const path = require('path')
const md = require('markdown-it')();
const fs = require('fs'); 

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "./src/logo.ico", 
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // enableRemoteModule: true,
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

    var mdFileContent = null;
    files.forEach( (item) => {
      if(item.path == "presentation.md" ) {
        mdFileContent = item.data.toString();
      }
    })
    
    var fixedPathContent = mdFileContent.replaceAll('./assets/', 'atom://' + tempFilePath + '/assets/');

    const fullMatchRGXP = new RegExp( /\[Code\]\(.*?\)/ , 'gmi');
    const insideParenthesesRGXP = new RegExp(/(?<=\[Code\]\()(.*?)(?=\))/, 'gmi');

    await fixedPathContent.match(fullMatchRGXP).forEach((match) => {
      const parentesisContent = match.match(insideParenthesesRGXP).toString().split('#');

      const filePath = parentesisContent[0].replace("atom://", "");
      const fileExt = filePath.split('.')[1];
      const lines = parentesisContent[1].split("-");

      console.log("filePath = " + filePath);
      console.log("fileExt = " + fileExt);
      console.log("lines = " + lines);

      var fileContent = '\`\`\`' + fileExt + "\n";
      fs.readFile( filePath, (err, data) => {
        if (err) { 
          fileContent = null;
          return;
        }
        fileContent += data + '\`\`\` \n';
        if (fileContent != null) {
          const fileContentToMd =  md.render(fixedPathContent.replace(match, fileContent)).split("<hr>");
          win.webContents.send("file-content", fileContentToMd);
        }
      });
    })
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