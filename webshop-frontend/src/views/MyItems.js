import { Container, FormCheck, Row } from 'react-bootstrap';
import Header from '../components/Header';
import OnSale from '../components/my_items/onSale';
import Sold from '../components/my_items/Sold';
import Purchased from '../components/my_items/Purchased';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const MyItems = () => {
  const [showOnSale, setShowOnSale] = useState(true);
  const [showSold, setShowSold] = useState(true);
  const [showPurchased, setShowPurchased] = useState(true);
  const { user } = useContext(UserContext);

  const onSaleChanged = (e) => setShowOnSale(!showOnSale);
  const soldChanged = (e) => setShowSold(!showSold);
  const purchasedChanged = (e) => setShowPurchased(!showPurchased);

  if (!user) {
    return (
      <Container className="form-input justify-content-md-center">
        <h4>Please log in before accessing this page.</h4>
      </Container>
    );
  }

  return (
    <Container className="container-fluid">
      <Header text="My items" />
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
