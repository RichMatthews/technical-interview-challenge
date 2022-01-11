import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "components/Home";
import { ContentPage } from "components/ContentPage";
import { Add } from "components/Add";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":dogId" element={<ContentPage />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
  );
};
