import "./List.css";
import ToDoItem from "./ToDoItem";
import { useState, useMemo } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData(); //List 컴포넌트가 리렌더링 될 때마다 호출

  // const getAnalyzedData = () => {
  //   console.log("getAnalyzedData 호출!");
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   const notDoneCount = totalCount - doneCount;

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount,
  //   };
  // };

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  //useMemo(콜백함수, 의존성배열(deps))
  //특정 조건이 만족했을 때에만 함수를 수행하도록 제어할 수 있는 Hook
  //deps에 들어가는 값이 바뀌면 콜백함수를 다시 실행
  //-deps에 빈 배열을 넣어주면 컴포넌트가 최초 렌더링 되었을 때만 함수 수행
  //-deps에 todos를 넣어주면 todos가 변경될 때 함수 수행
  //콜백함수에 메모이제이션 하고 싶은 함수 작성
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData 호출!");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="List">
      <h4>💙투두리스트💙</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>not done: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <ToDoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
