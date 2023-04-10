const { app, BrowserWindow, dialog, protocol, ipcMain } = require('electron')
const {readdir, readFile, writeFile} = require("fs/promises");
const path = require('path')
const md = require('markdown-it')();
const archiver = require('archiver');
const fs = require('fs'); 

let assetsFolderPath = null;

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
    var cssFileContent = null;
    var JsonConfigContent = null;
    files.forEach( (item) => {
      switch (item.path) {
        case "presentation.md" :
          mdFileContent = item.data.toString();
          break;
        case "style.css" :
          cssFileContent = item.data.toString();
          break;
        case "config.json" :
          JsonConfigContent = JSON.parse(item.data.toString());
          break;
      }
    })
    
    var fixedPathContent = mdFileContent.replaceAll('./assets/', 'atom://' + tempFilePath + '/assets/');

    const fullMatchRGXP = new RegExp( /\[Code\]\(.*?\)/ , 'gmi');
    const insideParenthesesRGXP = new RegExp(/(?<=\[Code\]\()(.*?)(?=\))/, 'gmi');

    var jenPeutPlusDeLasynchrone = new Promise(  (resolve, reject) => {

      fixedPathContent.match(fullMatchRGXP).forEach( (match, index) => {
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
          var selectedLinesOfFile ="";
          data.toString().split("\n").forEach( (match, index) => {
            if( index >= lines[0] - 1  && index <= lines[1] - 1) {
              selectedLinesOfFile += match + "\n";
            }
          });
          fileContent += selectedLinesOfFile + '\`\`\` \n';
          if (fileContent != null) {
            fixedPathContent = fixedPathContent.replace(match, fileContent);
            // const fileContentToMd =  md.render(fixedPathContent).split("<hr>");
            // win.webContents.send("file-content", fileContentToMd);
            resolve();
          }
        });
      })
    })
    jenPeutPlusDeLasynchrone.then( () => {
      const fileContentToMd =  md.render(fixedPathContent).split("<hr>");
      win.webContents.send("file-content", { md: fileContentToMd, css: cssFileContent, config: JsonConfigContent});
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
    
  ipcMain.handle("open-assets-folder", async () => {
    const openDialogResult = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        title: "Open folder ...",
        buttonLabel: "Open",
        properties: [
            "openDirectory",
        ],
    });
    assetsFolderPath = openDialogResult.filePaths[0];
    return assetsFolderPath;
  });

  // Récupérer les fichiers et dossiers et les archiver dans un zip que l'utilisateur pourra sauvegarder sur son ordinateur en renommant le .zip en .codeprez
  ipcMain.on("create-presentation", async (event, { markdownFilePath, cssFilePath }) => {
      const openDialogResult = await dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
          title: "Save presentation ...",
          buttonLabel: "Save",
          filters: [
              { name: 'codeprez', extensions: ['codeprez'] },
          ],
      });
      

      const archive = archiver("zip", {
          zlib: { level: 9 } // Sets the compression level.
      });

      const output = fs.createWriteStream(openDialogResult.filePath);
      archive.pipe(output);

      archive.file(markdownFilePath, { name: path.basename(markdownFilePath) });
      archive.file(cssFilePath, { name: path.basename(cssFilePath) });

      const files = await readdir(assetsFolderPath);
      for (const file of files) {
          const filePath = path.join(assetsFolderPath, file);
          archive.file(filePath, { name: `assets/${file}` });
      }
      

      archive.finalize();

      // rename the file to namefile.codeprez
      fs.rename(openDialogResult.filePath, openDialogResult.filePath + ".codeprez", (err) => {
          if (err) {
              console.log(err);
          }
      }
      );
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