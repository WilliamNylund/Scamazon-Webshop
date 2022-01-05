import ProductCard from "./ProductCard.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, FormControl, Alert } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [titleFilter, setTitleFilter] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  useEffect(() => {
    getProducts(pageNo, titleFilter)
      .then((res) => {
        if (res.data.length > 0) {
          setProducts(res.data);
        } else {
          setAlertMsg("No products available");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const updateTitleFilter = (e) => {
    setTitleFilter(e.target.value);
    setPageNo(1)
    getProducts(1, e.target.value)
      .then((res) => {
        setProducts([]);
        if (res.data.length > 0) {
          console.log("yes exists");
          setProducts(res.data);
        } else {
          console.log("no does not exists");
          setAlertMsg("No products available with that filter");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const scrollEvent = (e) => {
    let bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (bottom) {
      let pg = pageNo + 1;
      setPageNo(pg);
      getProducts(pg, titleFilter)
        .then((res) => {
          if (res.data.length > 0) {
            setProducts([...products, ...res.data]);
          } else {
            setAlertMsg("No more products available");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <>
      <Container className="form-input justify-content-center mb-3">
        <FormControl
          size="sm"
          type="text"
          placeholder="Search"
          name="titleFilter"
          onChange={updateTitleFilter}
        />
      </Container>

      <div onScroll={scrollEvent} className="products">
        <Container>
          <Row xs={1} md={2} className="g-4">
            {products.map((product, index) => (
              <Col key={product.id.toString()}>
                <ProductCard key={product.id.toString()} product={product} />
              </Col>
            ))}
          </Row>
          {alertMsg && (
            <Row className="justify-content-center mt-4">
              <Col md="auto">
                {alertMsg}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
};
export default Products;

const getProducts = async (pageNo, titleFilter) => {
  let request = axios.get(
    `http://127.0.0.1:8000/api/items/?pageNumber=${pageNo}&titleFilter=${titleFilter}`
  );
  return request;
};
