import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "./Pages/Layout";
import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
