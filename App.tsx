/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from "react";
import { memo } from "react";
import { MyApp } from "@true/components";
import { store, persistor } from "@/store";
import { Routes } from "@/Routes";
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = memo(() => {
  return (
    <MyApp store={store} persistor={persistor} primaryColor={"#0099ff"}>
      <Routes />
    </MyApp>
  );
});

export default App;
