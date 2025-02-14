import { app, BrowserWindow } from "electron";
import { expressServer } from "../server/app.js";
import express from "express";
import * as path from "path";

const server = new expressServer(express());

function createWindow() {
  const win = new BrowserWindow({
    width: 850,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      devTools: true,
      allowRunningInsecureContent: true,
      webSecurity: false,
    },
    icon: "../favicon.ico",
  });
  win.loadURL(process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../../client/dist/index.html')}`);
}

app.whenReady().then(() => {
  createWindow();
  server.run();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    server.close();
  }
});
