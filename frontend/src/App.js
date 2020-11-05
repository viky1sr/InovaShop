import Footer from './resources/components/FooterComponent';
import Header from './resources/components/HeaderComponent';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './resources/screens/HomeScreen';
import ProductScreen from './resources/screens/ProductScreen';
import CartScreen from "./resources/screens/CartScreen";

function App() {
  return (
    <Router>
        <Header />
        <main className="py-3">
            <Container>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/product/:id" component={ProductScreen}  />
                <Route path="/cart/:id?" component={CartScreen} />
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
