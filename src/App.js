import logo from './logo.svg';
import './App.css';
import LoginComponent from './Modules/Login';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginComponent />
        {/* <FooterComponent /> */}
      </header>
    </div>
  );
}

export default App;
