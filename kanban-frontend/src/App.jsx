import client from "./graphql/apolloClient";
import Header from "./components/Header";
import DndComponent from "./components/DndComponent";
import { AppProvider } from "./components/apicontext";
import { ApolloProvider } from "@apollo/client";

import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Header />
        <DndComponent />
      </AppProvider>
    </ApolloProvider>
  );
}

export default App;
