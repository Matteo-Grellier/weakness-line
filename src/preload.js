const {contextBridge,ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("api",{

    getFileContent : (callback) => {
        ipcRenderer.send("get-file-content");
        ipcRenderer.once("file-content",(e,data) => {
            callback(data);
        });
    },
    createPresentation : (markdownFilePath, cssFilePath, env, title, authors, duration) => {
        ipcRenderer.send("create-presentation",{markdownFilePath, cssFilePath, env, title, authors, duration});
    },
    Unfullscreen : () => {
        ipcRenderer.send("unfullscreen");
    },

    openAssetsFolder: () => ipcRenderer.invoke("open-assets-folder"),
})