import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Dashboard, Login } from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
   <div>
    <Toaster position="top-right"/>
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    </BrowserRouter>
   </div>
  );
}
export default App;
