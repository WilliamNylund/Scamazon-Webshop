import Shop from "../views/Shop";
import SignUp from "../views/SignUp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import SignIn from "./SignIn";
import { useState, useMemo, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    //Check for existing tokens at initial render
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("http://127.0.0.1:8000/api/users/me", {
        headers: {
          Authorization: `Token ${token}`,
        },
      }).then((res) => {
        setUser(res.data);
      }).catch((e) => {
        console.log('Couldnt find user');
      })
    }
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={value}>
          <Navbar />
          <div>
            <Routes>
              <Route path="/shop" element={<Shop />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route exact path="/" element={<Shop />} />
            </Routes>
          </div>
        </UserContext.Provider>
      </Router>
    </>
  );
};
export default App;
