const {contextBridge,ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("api",{
    // setupFileListHandler(callback){
    //     ipcRenderer.on("file-list",(e,data) => {
    //         callback(data.folder,data.files);
    //     })
    // },
    getFileContent : (callback) => {
        ipcRenderer.send("get-file-content");
        ipcRenderer.once("file-content",(e,data) => {
            callback(data);
        });
    },
    // updateFileContent : (folder,file,content) => {
    //     ipcRenderer.send("update-file-content",{folder,file,content});
    // },
    // setupReadyToSave : (callback) => {
    //     ipcRenderer.once("ready-to-save",(e,data) => {
    //         callback(data.folder,data.file);
    //     })
    // },
    // setupUpdateContent : (callback) => {
    //     ipcRenderer.on("update-content",(e,data) => {
    //         callback(data.file,data.content);
    //     });
    // }
    createPresentation : (markdownFilePath, cssFilePath, env, title, authors, duration) => {
        ipcRenderer.send("create-presentation",{markdownFilePath, cssFilePath, env, title, authors, duration});
    },

    openAssetsFolder: () => ipcRenderer.invoke("open-assets-folder"),
})