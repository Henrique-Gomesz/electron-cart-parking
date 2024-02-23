import { IpcRendererEvent } from 'electron'
import { useState } from 'react'
import { NavBar } from './components/nav-bar/nav-bar'
import { ListPerson } from './entities/person'
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
  

  return (
    <>
      <NavBar />
    </>
  )
}

export default App
