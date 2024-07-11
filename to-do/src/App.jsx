import "./App.css";
import { useState, useRef, useReducer, useCallback } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";

const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "야구 보기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  //useReducer(상태 변화를 실제로 처리할 함수, 초기값)
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  //useCallback
  //인수: 최적화하고 싶은 함수(=불필요하게 재생성되지 않도록 방지하고 싶은 함수), deps
  //첫 번째 인수로 전달한 함수를 생성해서 반환함
  //가장 처음 mount 되었을 때만 딱 한 번 생성이 되고 그 이후 리렌더링이 되어도 재생성되지 않음
  //const func = useCallback(()=>{}, [])
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: Number(idRef.current++),
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List
        todos={todos}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App;
