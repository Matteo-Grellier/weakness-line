const {BrowserWindow, app} = require("electron")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
    });
    if(process.env.NODE_ENV == "production"){
        win.loadFile("dist/index.html");
    } else {
        win.loadURL("http://localhost:5173");
    }
    win.once("ready-to-show", () => {
        win.show();
    });
    return win;
};

const initialize = async () => {
    await app.whenReady();
    createWindow();
}

initialize();

app.invalidateCurrentActivity("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});

app.on("activate", () => {
    createWindow()
});