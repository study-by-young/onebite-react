import "./List.css";
import ToDoItem from "./ToDoItem";

const List = () => {
  return (
    <div className="List">
      <h4>💙투두리스트💙</h4>
      <input placeholder="검색어를 입력하세요" />
      <div className="todos_wrapper">
        <ToDoItem />
        <ToDoItem />
        <ToDoItem />
      </div>
    </div>
  );
};

export default List;
