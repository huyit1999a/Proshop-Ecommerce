import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../actions/categoryActions";

const CategoryScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, category } = categoryList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategory());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (onEdit) {
      dispatch(updateCategory({ _id: id, name }));
    } else {
      await dispatch(createCategory(name));
      dispatch(listCategory());
    }
    setOnEdit(false);
    setName("");
  };

  const editCategory = (id, name) => {
    setID(id);
    setName(name);
    setOnEdit(true);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Category</h1>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={3}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Category Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                {onEdit ? "UPDATE" : "CREATE"}
              </Button>
            </Form>
          </Col>
          <Col md={3}></Col>
          <Col md={6}>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {category.map((cate, index) => (
                  <tr key={cate._id}>
                    <td>{index + 1}</td>
                    <td>{cate.name}</td>
                    <td>
                      <Button
                        variant="light"
                        className="btn-sm"
                        onClick={() => editCategory(cate._id, cate.name)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(cate._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CategoryScreen;
