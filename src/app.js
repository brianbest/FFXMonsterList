import MonsterLocationController from "./MonsterLocationController";
import $ from "jquery";
import data from "./MonsterData";

const mlc = new MonsterLocationController();


$('#app').html("Hello There");

data.forEach(([name, monsters]) => {
  mlc.setLocation(name, monsters);
})

mlc.getLocations().forEach((location) => {
  $('#app').append(`<h1>${location.getName()}</h1>`);
  const listElement = $("<ul></ul>");
  location.getMonsters().forEach((monster) => {
    listElement.append(`<li>${monster}</li>`);
  })
  $('#app').append(listElement);
})
