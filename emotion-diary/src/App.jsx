import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";

/* 
  1. "/" : 모든 일기를 조회하는 Home 페이지
  2. "/new" : 새로운 일기를 작성하는 New 페이지
  3. "/diary" : 일기 상세조회 Diary 페이지
*/
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/new"
        element={<New />}
      />
      <Route
        path="/diary"
        element={<Diary />}
      />
      <Route
        path="*"
        element={<Notfound />}
      />
    </Routes>
  );
}

export default App;
