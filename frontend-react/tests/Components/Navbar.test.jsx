import { render, screen } from "@testing-library/react";
import Navbar from "../../src/components/Navbar/Navbar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { MemoryRouter as Router } from "react-router-dom";

import authReducer from "../../src/store/index";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

describe("Navbar", () => {
  it("renders a button", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("renders the wizard logo", () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const logo = screen.getByTestId("wizlogo");
    expect(logo).toBeInTheDocument();
  });
});
