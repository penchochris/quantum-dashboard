import "./App.css";
import { Provider } from "react-redux";
import { store } from "./domain/store";
import Home from "./pages/Home";

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;
