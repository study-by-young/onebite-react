import "./App.css";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";
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

//컴포넌트 외부에 Context 선언
//App 컴포넌트가 호출될 때마다 리렌더링 될 필요가 없기 때문
//컴포넌트 최적화를 위해 변하는 값을 다루는 Context와 변하지 않는 값을 다루는 Context 분리
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

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

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
