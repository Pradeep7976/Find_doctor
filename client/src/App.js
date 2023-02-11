import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";

import Home from "./pages/Home/Home";
import LoginP from "./pages/loginP/Loginp";
import Prescs from "./pages/Prescriptions/Presc";
import PReg from "./pages/PReg/PReg";
import Prescadd from "./pages/Prescadd/Prescadd";
import Prescdetail from "./pages/Prescdetail/Prescdetail";
import NoMatch from "./pages/Nomatch/NoMatch";

import "./App.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        {/* <Nav /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/presc" element={<Prescs />} />
            <Route path="/Preg" element={<PReg />} />
            <Route path="/prescadd" element={<Prescadd />} />
            <Route path="/details/:prescid" element={<Prescdetail />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
