import { SignIn } from "./components/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Browser from "./components/Browser";
import store from "./utils/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path= "/" Component={SignIn} />
          <Route path = "/browse" Component = {Browser} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;