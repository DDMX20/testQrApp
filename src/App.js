import logo from "./logo.svg";
import QrCodeReader from "./Components/QrCodeReader/QrCodeReader";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Router, Route, Switch } from "react-router";
import Home from "./Components/Home/Home";
import QrCodeGenerator from "./Components/QrCodeGenerator/QrCodeGenerator";

function App() {
  return (
    <div className="App row  h-100">
      <Switch>
        {/* <Route path="/dashboard">
          <WebLayout component={<Dashboard />} />
        
        </Route> */}

        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/reader">
          <QrCodeReader />
        </Route>
        <Route path="/maker">
          <QrCodeGenerator />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
