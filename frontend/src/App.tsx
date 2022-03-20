import { useState } from 'react';

import Login from './components/Login';
import Products from './components/Products';
import Cookies from 'js-cookie';

function App() {
  const cookieToken = Cookies.get('token');
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    surname: "",
    email: "",
  });

  if (cookieToken) {
    return (
      <Products />
    );
  }
  else {
    return (
      <Login setUserData={setUserData} />
    );
  }
}

export default App;
