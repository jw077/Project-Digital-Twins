// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./i18n";
import initIcons from "./services/IconService/IconService";

import App from "./App";
import "./index.scss";

import { Provider } from 'react-redux';
import store from './store/index';

initIcons();

ReactDOM.render(
  <Suspense fallback={<>Loading...</>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,
  document.getElementById("root")
);
