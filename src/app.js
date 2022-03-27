import MonsterLocationController from "./MonsterLocationController.js";
import $ from "jquery";
import data from "./MonsterData.js";

import React from "react";
import ReactDOM from "react-dom";

const mlc = new MonsterLocationController();

class MyComponent extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

ReactDOM.render(<MyComponent />, $('#app')[0]);

data.forEach(({ name, monsters }) => {
  mlc.setLocation(name, monsters);
})

// mlc.getLocations().forEach((location) => {
//   $('#app').append(`<h1>${location.getName()}</h1>`);
//   const listElement = $("<ul></ul>");
//   location.getMonsters().forEach((monster) => {
//     listElement.append(`<li>${monster.getName()}</li>`);
//   })
//   $('#app').append(listElement);
// })
