import { Container, FormCheck, Row } from 'react-bootstrap';
import Header from '../components/Header';
import AddItemModal from '../components/Modals/AddItemModal';
import OnSale from '../components/my_items/onSale';
import Sold from '../components/my_items/Sold';
import Purchased from '../components/my_items/Purchased';
import { useState } from 'react';
const MyItems = () => {
  const [showOnSale, setShowOnSale] = useState(true);
  const [showSold, setShowSold] = useState(true);
  const [showPurchased, setShowPurchased] = useState(true);

  const onSaleChanged = (e) => setShowOnSale(!showOnSale);
  const soldChanged = (e) => setShowSold(!showSold);
  const purchasedChanged = (e) => setShowPurchased(!showPurchased);

  return (
    <Container className="container-fluid">
      <Header text="My items" />
      <AddItemModal />
      <hr />
      <FormCheck
        inline
        checked={showOnSale}
        type="switch"
        label="Show on sale items"
        onClick={onSaleChanged}
      />
      <FormCheck
        inline
        checked={showSold}
        type="switch"
        label="Show sold items"
        onClick={soldChanged}
      />
      <FormCheck
        inline
        checked={showPurchased}
        type="switch"
        label="Show purchased items"
        onClick={purchasedChanged}
      />
      {showOnSale && <OnSale />}
      {showSold && <Sold />}
      {showPurchased && <Purchased />}
    </Container>
  );
};
export default MyItems;
