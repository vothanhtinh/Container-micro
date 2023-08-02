import ReactDOM from "react-dom/client";
import App from "./App";

// Store
import { Provider } from "react-redux";
import { store } from "./store/configStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Store
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
