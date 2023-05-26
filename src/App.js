import { Route, Routes } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/Signup";

import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
import Private from "./PrivateRoute/Private.jsx";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Private>
              <Home />
              <Transaction />
            </Private>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
