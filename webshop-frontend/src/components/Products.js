import CardGroup from "react-bootstrap/CardGroup";
import ProductCard from "./ProductCard.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container, FormControl } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [titleFilter, setTitleFilter] = useState("");

  const updateTitleFilter = (e) => setTitleFilter(e.target.value);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    let request = axios.get(
      `http://127.0.0.1:8000/api/items/?page_number=${pageNo}`
    );
    request.then((res) => {
      if (pageNo > 1) {
        let arr = [...products, ...res.data];
        setProducts(arr);
      } else {
        setProducts(res.data);
      }
    });
    request.catch((e) => {
      console.log(e);
    });
  };

  const scrollEvent = (e) => {
    console.log(pageNo);
    let bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (bottom) {
      let pg = pageNo + 1;
      setPageNo(pg);
      getProducts();
    }
  };

  return (
    <>
    <Container className="sign-up justify-content-lg-center mb-3">
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
        </Container>
      </div>
    </>
  );
};
export default Products;
