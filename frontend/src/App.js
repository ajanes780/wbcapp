import Footer from '../src/Components/Footer';
import Header from '../src/Components/Header';
import HomeScreen from '../src/Screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/loginScreen';
import RegisterScreen from './Screens/registerScreen';
import ProfileScreen from './Screens/profileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/paymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UsersListScreen from './Screens/UsersListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';
import LandingPage from './Screens/LandingPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/admin/userslist' component={UsersListScreen} />
          <Route exact path='/admin/productlist' component={ProductListScreen} />
          <Route exact path='/admin/productlist/:pageNumber' component={ProductListScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/cart/:id?' component={CartScreen} />

          <Route exact path='/search/:keyword' component={HomeScreen} />
          <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/store' component={HomeScreen} />
          <Route exact path='/' component={LandingPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
