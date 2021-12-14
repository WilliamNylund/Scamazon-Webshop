import Navbar from "../components/navbar"
import Products from "../components/products";
const Shop = () => {
  return (
    <div className="shop">
      <Navbar/>
      <div className='product-container'>
          <Products/>
      </div>
    </div>
  );
}
export default Shop;
