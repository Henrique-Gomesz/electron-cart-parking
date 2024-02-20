import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import mongoose from 'mongoose'

mongoose
  .connect('mongodb://127.0.0.1:27017/parking_database')
  .then((connection) => console.log(connection))
  .catch((error) => console.log(error))

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
