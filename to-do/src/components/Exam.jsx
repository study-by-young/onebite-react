import { useReducer } from "react";

//reducer: 상태를 실제로 변환시키는 변환기 역할
//1. dispatch를 호출하면 reducer가 호출이 되고 액션 객체가 매개변수로 전달됨
//2. reducer에서 반환한 값을 useReducer가 불러와서 state의 값을 변경함
function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  //dispatch(발송하다, 급송하다): 상태 변화가 있어야 한다는 사실을 알리는 함수
  //dispatch가 상태 변화를 요청하면 useReducer가 상태 변화를 실제로 처리할 함수를 호출
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    //인수: 상태가 어떻게 변화되기를 원하는지(액션 객체)
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      <h3>useReducer Exam</h3>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
