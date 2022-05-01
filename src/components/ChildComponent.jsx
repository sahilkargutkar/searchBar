import React from "react";

const ChildComponent = ({ childrenArray, setChildrenArray }) => {
  const addChildren = () => {
    const temp = [...childrenArray];

    temp.push({ age: 6 });

    setChildrenArray(temp);
  };

  const removeChildren = () => {
    const temp = [...childrenArray];

    temp.pop();
    setChildrenArray(temp);
  };

  const updateAge = (index) => {
    const temp = [...childrenArray];

    temp[index].age += 1;

    setChildrenArray(temp);
  };

  const decrementAge = (index) => {
    const temp = [...childrenArray];

    temp[index].age -= 1;

    setChildrenArray(temp);
  };

  return (
    <div>
      Child: <button onClick={removeChildren}>Delete</button>
      {childrenArray.length}
      <button onClick={addChildren}>Add</button>
      <div>
        {childrenArray.map((data, index) => (
          <div>
            child{index + 1}'s Age :{" "}
            <button onClick={() => decrementAge(index)}>-</button>
            {data.age}
            <button onClick={() => updateAge(index)}>+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChildComponent;
