import { useState } from 'react';
import Cookies from 'js-cookie';

import Login from './components/Login';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';

function App() {
  const cookieToken = Cookies.get('token');
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    surname: "",
    email: "",
  });
  const [createProduct, setCreateProduct] = useState(false);

  if (cookieToken) {
    if (createProduct) {
      return (
        <CreateProduct setUserData={setUserData} userData={userData} setCreateProduct={setCreateProduct} />
      );
    }
    else {
      return (
        <Products setUserData={setUserData} userData={userData} setCreateProduct={setCreateProduct} />
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
