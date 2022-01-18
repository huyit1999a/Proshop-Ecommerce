import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import { Row, Col, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";

const SearchScreen = (props) => {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { category: categories } = categoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        category: category !== "all" ? category : "",
        name: name !== "all" ? name : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <Row>
        <Col sm={3}>
          <div>
            <h3>Category</h3>
            <ul>
              <li>
                <Link
                  className={"all" === category ? "active" : ""}
                  to={getFilterUrl({ category: "all" })}
                >
                  Any
                </Link>
              </li>
              {categories &&
                categories.map((cate) => (
                  <li key={cate._id}>
                    <Link
                      to={getFilterUrl({ category: cate._id })}
                      className={cate._id === category ? "active" : ""}
                    >
                      {cate.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating
                      caption={" & up"}
                      rating={r.rating}
                      value={r.rating}
                    ></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col sm={9}>
          {loading ? (
            <Loader></Loader>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>Products</h3>
                {loading ? (
                  <Loader></Loader>
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : (
                  ""
                )}
                <div>
                  <Form.Control
                    as="select"
                    value={order}
                    onChange={(e) => {
                      props.history.push(
                        getFilterUrl({ order: e.target.value })
                      );
                    }}
                    style={{ width: "200px" }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </Form.Control>
                </div>
              </div>

              {products.length === 0 && <Message>No Product Found</Message>}
              <Row>
                {products.map((product, index) => (
                  <Col sm={4} key={index}>
                    <Product key={product._id} product={product}></Product>
                  </Col>
                ))}
              </Row>
              <Row></Row>
            </>
          )}
          {pages > 1
            ? [...Array(pages).keys()].map((x) => (
                <Link
                  className={
                    x + 1 === page ? "page-active page-link" : "page-link"
                  }
                  key={x + 1}
                  to={getFilterUrl({ page: x + 1 })}
                >
                  {x + 1}
                </Link>
              ))
            : ""}
        </Col>
      </Row>
    </div>
  );
};

export default SearchScreen;
