import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

const RadioBox = (props) => {
  const [value, setValue] = useState("0");

  const handleChange = (e) => {
    setValue(e.target.value);

    props.handleFilters(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={handleChange} value={value}>
        {props.list.map((value) => (
          <Radio key={value._id} value={`${value._id}`}>
            {value.name}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );
};

export default RadioBox;
