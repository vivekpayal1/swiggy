import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import store from "./services/store/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      <Toaster />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);
