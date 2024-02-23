import { IpcRendererEvent } from "electron";
import { useState } from "react";
import { NavBar } from "./components/nav-bar/nav-bar";
import { ListPerson } from "./entities/person";
import { ScreenWrapper } from "./app.styles";
import { useNavigation } from "./hooks/use-navigation-hook";
function App(): JSX.Element {
  const { onMenuItemPress, renderScreen } = useNavigation();

  const [personList, setPersonList] = useState<ListPerson[]>([]);
  const ipcHandle = (): void =>
    window.electron.ipcRenderer.send("create-person", [
      { name: "Test", document: "123", telephone: "123", active: true },
    ]);

  const ipcHandle2 = (): void =>
    window.electron.ipcRenderer.send("list-person");

  window.electron.ipcRenderer.on(
    "list-person-reply",
    (event: IpcRendererEvent, personList: ListPerson[]) => {
      setPersonList([...personList]);
    },
  );

  return (
    <ScreenWrapper>
      <NavBar onPress={onMenuItemPress} />
      {renderScreen()}
    </ScreenWrapper>
  );
}

export default App;
