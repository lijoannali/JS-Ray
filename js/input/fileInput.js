//Source: https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file-in-the-browser

function setUpScene(fileName){ 
  fetch(fileName)
    .then((res) => res.text())
    .then((text) => {
      inputLines = parseString(text); 
      renderer.render();
     })
    .catch((e) => console.error(e));
}

function parseString(input) { 
  let inputToString = input.split("\n");
  for(line of inputToString){ 
    line = line.split(" "); 
    switch(line[0]){ 
      case "Phong": 
        materials.push(new phongMaterial([parseFloat(line[1]),parseFloat(line[2]), parseFloat(line[3]), parseFloat(line[4])], [parseFloat(line[5]),parseFloat(line[6]),parseFloat(line[7])], parseFloat(line[8]))); 
      break; 
      case "Sphere": 
        objects.push(new Sphere([parseFloat(line[1]),parseFloat(line[2]),parseFloat(line[3])], parseFloat(line[4]), materials[parseFloat(line[5])])); //big blue in back); 
      break; 
      case "PointLight": 
        lights.push(new PointLight([parseFloat(line[1]),parseFloat(line[2]), parseFloat(line[3])], [parseFloat(line[4]), parseFloat(line[5]),parseFloat(line[6])], parseFloat(line[7]))); 

      break;
      default: 
      console.log("Not valid"); 
    }
  }
}