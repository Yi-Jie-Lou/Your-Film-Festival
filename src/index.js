import App from "./App";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "./css/index.css";

const root = createRoot(document.getElementById("root"));
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
