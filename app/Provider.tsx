"use client";

import { Provider } from "react-redux";

import { store } from "./lib/redux/store";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default Providers;
