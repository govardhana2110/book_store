import logo from './logo.svg';
import './App.css';
import LoginComponent from './Modules/Login';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';
import RegisterComponent from './Modules/Register';
import RoutingModule from './Modules/Routing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RoutingModule></RoutingModule>
        {/* <LoginComponent /> */}
        {/* <RegisterComponent></RegisterComponent> */}
        {/* <FooterComponent /> */}
      </header>
    </div>
  );
}

export default App;
