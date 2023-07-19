import { fireEvent, render, screen, waitFor} from "@testing-library/react";
import Login from "../../src/screens/Login/Login";
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

import authReducer from '../../src/store/index'

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

describe("Login", () => {
  it("renders login component", () => {
    render(
      <Provider store={store}>
        <Router><Login/></Router>
      </Provider>
    );
    const title = screen.getAllByText(/log in/i);
    expect(title.length).toBe(2);

    const fields = screen.getAllByRole("textbox")
    expect(fields.length).toBe(1);
  });

  it("logs a user in", async ()=>{
    render(
      <Provider store={store}>
        <Router><Login/></Router>
      </Provider>
    );
    const emailinp = screen.getByTestId("emailinp")
    const passinp = screen.getByTestId("passinp")

    fireEvent.change(emailinp, {target : {value : "rlshah03@gmail.com"}})
    fireEvent.change(passinp, {target : {value : "rohit123"}})
    
    const btn = screen.getByRole("button")
    fireEvent.click(btn)

    const spinner = screen.getByTestId("spinner")
    await waitFor(()=>{
      expect(spinner).not.toBeInTheDocument();
    })
  })
});
