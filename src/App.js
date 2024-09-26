import logo from './logo.svg';
import './App.css';
import RoutingModule from './Modules/Routing';

function App() {
  return (
    <div className="App" >
      <header className="App-header" style={{backgroundImage:`url(/images/library.jpg)`}}>
        <RoutingModule></RoutingModule>
        {/* <LoginComponent /> */}
        {/* <RegisterComponent></RegisterComponent> */}
        {/* <FooterComponent /> */}
      </header>
    </div>
  );
}

export default App;
