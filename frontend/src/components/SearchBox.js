import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

// const SearchBox = ({ history }) => {
//   const [keyword, setKeyword] = useState("");

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       history.push(`/search/${keyword}`);
//     } else {
//       history.push("/");
//     }
//   };

//   return (
//     <Form onSubmit={submitHandler} inline className="ml-auto">
//       <Form.Control
//         type="text"
//         name="q"
//         onChange={(e) => setKeyword(e.target.value)}
//         placeholder="Search Products..."
//         className="mr-sm-2 ml-sm-5"
//       ></Form.Control>
//       <Button type="submit" variant="outline-success" className="p-2">
//         Search
//       </Button>
//     </Form>
//   );
// };

const SearchBox = (props) => {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
  return (
    <Form onSubmit={submitHandler} inline className="">
      <Form.Control
        type="text"
        name="q"
        id="q"
        onChange={(e) => setName(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button variant="outline-success" type="submit" className="p-2 pl-3 pr-3">
        <i className="fa fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;
