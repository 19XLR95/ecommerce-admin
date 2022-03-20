import { useState } from 'react';
import Cookies from 'js-cookie';

import Login from './components/Login';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';

function App() {
  const cookieToken = Cookies.get('token');
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    surname: "",
    email: "",
  });
  const [createProduct, setCreateProduct] = useState(false);
  const [editProduct, setEditProduct] = useState({
    active: false,
    productData: undefined
  });

  if (cookieToken) {
    if (createProduct) {
      return (
        <CreateProduct setUserData={setUserData} userData={userData} setCreateProduct={setCreateProduct} />
      );
    }
    else if (editProduct.active && editProduct.productData) {
      return (
        <EditProduct setEditProduct={setEditProduct} setUserData={setUserData} userData={userData} productData={editProduct.productData} />
      );
    }
    else {
      return (
        <Products setUserData={setUserData} userData={userData} setCreateProduct={setCreateProduct} setEditProduct={setEditProduct} />
      );
    }
  }
  else {
    return (
      <Login setUserData={setUserData} />
    );
  }
}

export default App;
