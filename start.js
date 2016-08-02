'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const jsonFilePath = './data.json';

//Clearly display system information
console.log('System Info:')
console.log('Architecture: ', os.arch());
console.log('CPUs: ', os.cpus());
console.log('Free System Memory: ', os.freemem());
console.log('Host Name: ', os.hostname());
console.log('Average Loads in Min: ', os.loadavg());
console.log('Platform: ', os.platform());
console.log('Release: ', os.release());
console.log('OS Type: ', os.type());

//Node script that requires all files in a given diretory
let jsFilePath = path.join(__dirname, "Required");

let jsFiles = [];

fs.readdirSync(jsFilePath).forEach(function(file) {
  let requireFile = require("./Required/" + file);
  var obj = {};
  var fileName = file.toString();
  obj[fileName] = (requireFile.gimme).toString();
  jsFiles.push(obj);
})

console.log(jsFiles);

//Automatically generate given folder structure
let newFilePath = path.join("NewFolder", "NewFile.js");
let thisFilePath = path.join(__dirname);
let newDirPath = path.join(__dirname, 'NewFolder');

fs.mkdir(newDirPath, function (err, folder) {
  if (err) {
    console.error("Failed to create new directory:", err);
  } else {
    console.log("New directory created");
    fs.writeFile(newDirPath + "/temp.txt", "a.js", function (err) {
      if (err) {
        console.log("Failed to write file:", err);
      } else {
        console.log("Write file success.");
      }
    })
  }
})
