import EditorComponent from "../Editor/EditorComponent";
import Sidebar from "../Sidebar";
import SplitterComponent from "../SplitterComponent"

export default function EditorPage() {
  return (
    <SplitterComponent>
      <Sidebar/>
      <EditorComponent/>
    </SplitterComponent>
  )
}
