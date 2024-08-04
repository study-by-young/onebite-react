import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

import Button from "./components/Button";
import Header from "./components/Header";

/* 
  1. "/" : 모든 일기를 조회하는 Home 페이지
  2. "/new" : 새로운 일기를 작성하는 New 페이지
  3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
  4. "/edit" : 일기를 수정하는 Edit 페이지
*/
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
