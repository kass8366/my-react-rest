import MainPage from '../../pages/main-page/main-page';
import Auth from '../auth/auth';
import CartPage from '../../pages/cart-page/cart-page';
import DescrProducts from '../descr-products/descr-products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { reducer } from '../../store';
import { Provider } from 'react-redux';
import { configureStore} from '@reduxjs/toolkit';


function App() {
  const store = configureStore({reducer}) 
  return (
    <>
    <Provider store = {store}>
      <Router>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/descrP' element={<DescrProducts/>}/>
        </Routes>
      </Router>
      </Provider>
    </>
  );
}

export default App;
