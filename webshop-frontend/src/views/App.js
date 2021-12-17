import Shop from "../views/Shop";
import SignUp from "../views/SignUp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar.js"
import SignIn from "./SignIn";

const App = () => {
  return (
    <>
      <Router>
      <Navbar />
        <div>
          <Routes>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route exact path="/" element={<Shop/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
};
export default App;
