import { SavePerson } from '@renderer/entities/person'
import { useState } from 'react'

type UseSavePersonAction = {
  savePersonAction: (person: SavePerson) => void
  reply: boolean | undefined
}

export const useSavePersonAction = (): UseSavePersonAction => {
  const [reply, setReply] = useState<boolean | undefined>(undefined)

  function savePersonAction(person: SavePerson): void {
    window.electron.ipcRenderer.send('create-person', person)
  }

  window.electron.ipcRenderer.on('create-person-reply', (_event, reply: boolean) => {
    setReply(reply)
  })

  return {
    savePersonAction,
    reply
  }
}
