import "./ToDoItem.css";
import { memo } from "react";

const ToDoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="ToDoItem">
      <input
        onChange={onChangeCheckbox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

//고차 컴포넌트(HOC, Higher Order Component)
//컴포넌트를 인수로 받아서 해당 컴포넌트에 추가 기능을 덧붙여서 기능이 추가된 새로운 컴포넌트를 반환하는 메서드
//한 번 호출하는 것만으로도 컴포넌트에 새로운 기능을 부여할 수 있음
export default memo(ToDoItem, (prevProps, nextProps) => {
  //변환값에 따라 props 변경 여부 판단
  //True -> props 바뀌지 않음 -> 리렌더링 X
  //False -> props 바뀜 -> 리렌더링 O
  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;
  return true;
});
