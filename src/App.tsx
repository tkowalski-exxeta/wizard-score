import { Provider } from "react-redux";
import { store } from "./model/root-state";
import { MainPage } from "./pages/main-page";

export function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}
