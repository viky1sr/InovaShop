import Footer from './resources/components/FooterComponent';
import Header from './resources/components/HeaderComponent';
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

function App() {
  return (
    <Router>
        <Header />
        <main className="py-3">
            <Container>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/product/:id" component={ProductScreen}  />
                <Route path="/profile" component={ProfileScreen}  />
                <Route path="/login" component={LoginScreen}  />
                <Route path="/register" component={RegisterScreen}  />
                <Route path="/cart/:id?" component={CartScreen} />
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
