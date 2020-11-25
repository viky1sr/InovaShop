import FooterComponent from './resources/components/FooterComponent';
import HeaderComponent from './resources/components/HeaderComponent';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './resources/screens/HomeScreen';
import ProductScreen from './resources/screens/ProductScreen';
import CartScreen from "./resources/screens/CartScreen";
import LoginScreen from "./resources/screens/LoginScreen";
import RegisterScreen from "./resources/screens/RegisterScreen";
import ProfileScreen from "./resources/screens/ProfileScreen";
import ShippingScreen from "./resources/screens/ShippingScreen";
import PaymentScreen from "./resources/screens/PaymentScreen";
import PlaceOrderScreen from "./resources/screens/PlaceOrderScreen";
import OrderScreen from "./resources/screens/OrderScreen";
import UserListScreen from "./resources/screens/UserListScreen";

function App() {
  return (
    <Router>
        <HeaderComponent />
        <main className="py-3">
            <Container>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/product/:id" component={ProductScreen}  />
                <Route path="/profile" component={ProfileScreen}  />
                <Route path="/login" component={LoginScreen}  />
                <Route path="/register" component={RegisterScreen}  />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/admin/user-list" component={UserListScreen} />
            </Container>
        </main>
        <FooterComponent />
    </Router>
  );
}

export default App;
