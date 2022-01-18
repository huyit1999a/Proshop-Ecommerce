import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import PaginateCategory from "../components/PaginateCategory";
import Meta from "../components/Meta";
import { listProductCategories } from "../actions/productActions";

const ProductByCategoryScreen = ({ match }) => {
  const categoryId = match.params.id;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading, error, category } = productCategoryList;

  const categoryList = useSelector((state) => state.categoryList);
  const { category: categoryName } = categoryList;

  useEffect(() => {
    dispatch(listProductCategories(categoryId, pageNumber));
  }, [dispatch, categoryId, pageNumber]);

  return (
    <>
      <Meta />
      <h1>
        {categoryName &&
          categoryName.map((cate) =>
            cate._id === categoryId ? cate.name : ""
          )}
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {category &&
              category.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <PaginateCategory
            pages={category.pages}
            page={category.page}
            categoryId={categoryId}
          />
        </>
      )}
    </>
  );
};

export default ProductByCategoryScreen;
