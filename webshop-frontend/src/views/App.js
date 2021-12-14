import Navbar from "../components/navbar";
import Carousel from "../components/carousel";
import Info from "../components/info";
import Shop from "../views/shop";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="main">
      <Router>
        <div>
          <Routes>
            <Route path="/shop" element={<Shop/>}/>
            <Route exact path="/" element={<Shop/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
};
export default App;
