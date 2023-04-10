const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const { readdir } = require("fs/promises");
const path = require('path')
const archiver = require('archiver');
const fs = require('fs');

let assetsFolderPath = null;

function createWindow() {
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
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, 'index.html'))
    } else {
        win.loadURL('http://localhost:3000')
    }
    

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
    ipcMain.on("create-presentation", async (event, { markdownFilePath, cssFilePath, env, title, author, duration }) => {
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

        // env is an array of path, create a env folder and put all the files in it
        for (const envFilePath of env) {
            archive.file(envFilePath, { name: `env/${path.basename(envFilePath)}` });
        }

        const files = await readdir(assetsFolderPath);
        for (const file of files) {
            const filePath = path.join(assetsFolderPath, file);
            archive.file(filePath, { name: `assets/${file}` });
        }

        archive.append(JSON.stringify({ title, author, duration }), { name: "config.json" });
        archive.finalize();

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
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})