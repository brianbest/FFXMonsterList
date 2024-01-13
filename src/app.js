import MonsterLocationController from "./MonsterLocationController.js";
import $ from "jquery";
import data from "./MonsterData.js";
import MonsterListControllerContext from './MonsterListControllerContext.js';
import LocationList from './view/LocationList.jsx';
import "./app.scss";

import React from "react";
import ReactDOM from "react-dom";

const mlc = new MonsterLocationController();
data.forEach(({ name, monsters }) => {
  mlc.setLocation(name, monsters);
});

ReactDOM.render(
<MonsterListControllerContext.Provider value={mlc}>
      <LocationList/>
</MonsterListControllerContext.Provider>
, $('#app')[0]);

