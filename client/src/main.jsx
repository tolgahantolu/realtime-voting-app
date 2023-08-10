import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import client from "./apolloClient.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
