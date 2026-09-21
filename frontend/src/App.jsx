import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import ReturnPolicy from './pages/ReturnPolicy.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
const App = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/disclaimer' element={<Disclaimer/>}></Route>
        <Route path='/return' element={<ReturnPolicy/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/products/:id' element={<ProductDetail/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/shop' element={<Shop/>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;