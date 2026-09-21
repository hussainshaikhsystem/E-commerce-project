import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import store from "./redux/store.js";
import App from "./App.jsx";
import { AuthProvider } from "./context/authcontext.jsx";
import { Provider } from "react-redux";
import './styles/global.css'
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthProvider>
  </Provider>,
);
