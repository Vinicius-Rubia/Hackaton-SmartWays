import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Router } from "./routes/router";

function App() {
  return (
    <Provider store={store}>
      <Router />
      <Toaster />
    </Provider>
  );
}

export default App;
