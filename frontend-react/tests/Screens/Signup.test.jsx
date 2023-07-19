import {render, screen } from "@testing-library/react";
import Signup from "../../src/screens/Signup/Signup";
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

describe("Signup", () => {
  it("renders Signup component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );
    const title = screen.getAllByText(/sign up/i);
    expect(title.length).toBe(2);

    const fields = screen.getAllByRole("textbox");
    expect(fields.length).toBe(2);
  });

  it("Provides the signup button", () => {
    render(
      <Provider store={store}>
        <Router>
          <Signup />
        </Router>
      </Provider>
    );

    const btn = screen.getAllByRole("button")
    expect(btn.length).toBeGreaterThan(0)
  });
});
