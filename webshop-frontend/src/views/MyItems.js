import { Container } from "react-bootstrap";
import Header from "../components/Header";
import AddItemModal from "../components/Modals/AddItemModal";
import OnSale from "../components/my_items/onSale";
import Sold from "../components/my_items/Sold";
import Purchased from "../components/my_items/Purchased";
const MyItems = () => {
  /*
  see items on sale, sold and purchased
  filter items
  
  */
  return (
    <Container className="container-fluid">
      <Header text="My items" />
      <AddItemModal />
      <OnSale/>
      <Sold/>
      <Purchased/>
    </Container>
  );
};
export default MyItems;
