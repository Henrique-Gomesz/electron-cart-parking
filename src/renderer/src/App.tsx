import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

import { IpcRendererEvent } from 'electron'
import { ListPerson } from './entities/person'
import { useState } from 'react'
function App(): JSX.Element {
  const [personList, setPersonList] = useState<ListPerson[]>([])
  const ipcHandle = (): void =>
    window.electron.ipcRenderer.send('create-person', [
      { name: 'Test', document: '123', telephone: '123', active: true }
    ])

  const ipcHandle2 = (): void => window.electron.ipcRenderer.send('list-person')

  window.electron.ipcRenderer.on(
    'list-person-reply',
    (event: IpcRendererEvent, personList: ListPerson[]) => {
      setPersonList([...personList])
    }
  )
  console.log('retrigando')

  return (
    <>
      <p>{personList.map((person) => `${person.createdAt}`)}</p>
      <div className="action">
        <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
          Send IPC
        </a>
        <a target="_blank" rel="noreferrer" onClick={ipcHandle2}>
          Get person
        </a>
      </div>

      <Versions></Versions>
    </>
  )
}

export default App
