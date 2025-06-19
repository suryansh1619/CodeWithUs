import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

import Toast from "./Components/Toast.jsx"
import EditorLayout from "./Components/Editor/EditorLayout.jsx";
import HomePage from  "./Components/Home/HomePage.jsx"

function App() {
  return (
    <BrowserRouter>
      <Toast/>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path="/editor/:roomId" element={<EditorLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
