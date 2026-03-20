import { Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import Login from "./component/pages/Login";
import Signup from "./component/pages/Signup";
import UploadCV from "./component/pages/Upload";
import Dashboard from "./component/pages/Dashboard";
import Profile from "./component/pages/Profile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/upload" element={<UploadCV/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
  );
}

export default App;