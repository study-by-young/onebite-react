import "./Editor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  //useContext: 인수로 전달한 Context로부터 공급된 데이터를 반환하는 함수
  const { onCreate } = useContext(TodoDispatchContext);
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onKeyDown = (e) => {
    //사용자가 키보드를 누를 때 발생하는 이벤트 처리
    //keyCode 13: Enter
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    //내용을 작성하지 않으면 onCreate가 실행되지 않도록 조건 처리
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent(""); //투두 추가 후 input 비우기
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeyDown}
        onChange={onChangeContent}
        placeholder="새로운 투두..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
