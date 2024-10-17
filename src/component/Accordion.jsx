import React from "react";
import data from "./data";
import { useState } from "react";
import "./styles.css";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [multiSelect, setMultiSelect] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingle = (currentId) => {
    setSelected(currentId === selected ? null : currentId);
  };

  const handleMulti = (currentId) => {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(currentId);
    if(findIndexOfCurrentId === -1) copyMultiple.push(currentId)
        else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }
  console.log(multiple);

  return (
    <div className="wrapper">
      <button onClick={() => {
        setMultiSelect(!multiSelect);
        setSelected(null);
        setMultiple([]);
        }}>
        {multiSelect ? "Disable" : "Enable"} Multi Select
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => (
            <div
              onClick={multiSelect ? () => handleMulti(item.id) : () => handleSingle(item.id)}
              className="item"
              key={item.id}
            >
                <div className="title">
                    <h3 >{item.title} </h3>
                    <h3 >+</h3>
                </div>
             
              {multiSelect ? multiple.indexOf(item.id) !== -1 &&  <p className="content">{item.content}</p> : item.id === selected &&  <p className="content">{item.content}</p>}
              
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
