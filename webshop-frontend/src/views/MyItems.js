import { Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import AddItemModal from "../components/Modals/AddItemModal";
const MyItems = () => {
  /*
  see items on sale, sold and purchased
  filter items
  
  */
  return (
    <Container className="container-fluid">
      <Header text="My items" />
      <AddItemModal />
    </Container>
  );
};
export default MyItems;
