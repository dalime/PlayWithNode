'use strict';

const os = require('os');
const fs = require('fs');
const path = require('path');
const jsonFilePath = './data.json';
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//FULL CRUD APP

let $newFirstName;
let $newLastName;
let $newOccupation;
let $newBackground;

function addNewStudent() {
  $newFirstName = $('#iptFirstName').val();
  $newLastName = $('#iptLastName').val();
  $newOccupation = $('#iptOccupation').val();
  $newBackground = $('#iptBackground').val();
}

let newFirstName;
let newLastName;
let editFirstName;
let editLastName;
let deleteFirstName;
let deleteLastName;

function errorMessage(err) {
  return console.log("error: ", err);
}

fs.readFile(jsonFilePath, (err, data) => {
  if (err) errorMessage(err);
  console.log("Current directory: ", JSON.parse(data));
  let arr = JSON.parse(data);
  let obj = {};
  rl.question("Do you want to add a name to the directory? (Yes or no)", (yesNo) => {
    if (yesNo.toUpperCase() !== "YES") {
      rl.question("Do you want to edit a name? (Yes or no) ", (yesNo2) => {
        if (yesNo2.toUpperCase() !== "YES") {
          rl.question("Do you want to delete a name? (Yes or no) ", (yesNo3) => {
            if (yesNo3.toUpperCase() !== "YES") {
              console.log("Thank you for using this utility.")
              rl.close();
            } else {
              rl.question("Enter first name to delete. ", (answer) => {
                deleteFirstName = answer;
                rl.question("Enter last name to delete. ", (ans) => {
                  deleteLastName = ans;
                  let indexDeleteFirstName = findWithAttr(arr, "firstName", deleteFirstName);
                  let indexDeleteLastName = findWithAttr(arr, "lastName", deleteLastName);
                  if (indexDeleteFirstName === indexDeleteLastName) {
                    arr.splice(indexDeleteFirstName, 1);
                    let strArr = JSON.stringify(arr);
                    fs.writeFile(jsonFilePath, strArr, err2 => {
                      if (err2) errorMessage(err2);
                      console.log(arr);
                      console.log("Names deleted.");
                      rl.close();
                    })
                  } else {
                    console.log("No such match exists. Please try again later.");
                    rl.close();
                  }
                })
              })
            }
          })
        } else {
          rl.question("Enter first name to edit. ", (answer) => {
            editFirstName = answer;
            rl.question("Enter last name to edit. ", (ans) => {
              editLastName = ans;
              obj = {"firstName": editFirstName, "lastName": editLastName};
              let indexFirstName = findWithAttr(arr, "firstName", editFirstName);
              let indexLastName = findWithAttr(arr, "lastName", editLastName);
              if (indexFirstName === indexLastName) {
                rl.question("What do you want to change the first name to? ", (answer2) => {
                  editFirstName = answer2;
                  rl.question("What do you want to change the last name to? ", (ans2) => {
                    editLastName = ans2;
                    arr[indexFirstName]["firstName"] = editFirstName;
                    arr[indexLastName]["lastName"] = editLastName;
                    console.log("Updated directory: ", arr);
                    let strArr = JSON.stringify(arr);
                    fs.writeFile(jsonFilePath, strArr, err2 => {
                      if (err2) errorMessage(err2);
                      console.log("Names edited.");
                      fs.readFile(jsonFilePath, (err3, data2) => {
                        if (err3) errorMessage(err3);
                        let arr2 = JSON.parse(data2);
                        rl.question("Do you want to delete a name? (Yes or no) ", (yesNo3) => {
                          if (yesNo3.toUpperCase() !== "YES") {
                            console.log("Thank you for using this utility.")
                            rl.close();
                          } else {
                            rl.question("Enter first name to delete. ", (answer3) => {
                              deleteFirstName = answer3;
                              rl.question("Enter last name to delete. ", (ans3) => {
                                deleteLastName = ans3;
                                let indexDeleteFirstName = findWithAttr(arr2, "firstName", deleteFirstName);
                                let indexDeleteLastName = findWithAttr(arr2, "lastName", deleteLastName);
                                if (indexDeleteFirstName === indexDeleteLastName) {
                                  arr2.splice(indexDeleteFirstName, 1);
                                  let strArr2 = JSON.stringify(arr2);
                                  fs.writeFile(jsonFilePath, strArr2, err4 => {
                                    if (err4) errorMessage(err4);
                                    console.log(arr2);
                                    console.log("Names deleted.");
                                    rl.close();
                                  })
                                } else {
                                  console.log("No such match exists. Please try again later.");
                                  rl.close();
                                }
                              })
                            })
                          }
                        })
                      })
                    })
                  })
                })
              }
            })
          })
        }
      })
    } else {
      rl.question("First name to enter: ", (answer) => {
        console.log("First name: ", answer, "!");
        newFirstName = answer;
        rl.question("Last name to enter: ", (ans) => {
          console.log("Last name: ", ans, "!");
          newLastName = ans;
          obj = {"firstName": newFirstName, "lastName": newLastName};
          arr.push(obj);
          console.log("New directory: ", arr);
          let strArr  = JSON.stringify(arr);
          fs.writeFile(jsonFilePath, strArr, err => {
            if (err) return console.log("Could not add new name.");
            console.log("New name added.");
            fs.readFile(jsonFilePath, (err2, data2) => {
              if (err2) errorMessage(err2);
              let arr2 = JSON.parse(data2);
              let obj2 = {};
              rl.question("Do you want to edit a name? (Yes or no) ", (yesNo2) => {
                if (yesNo2.toUpperCase() !== "YES") {
                  rl.question("Do you want to delete a name? (Yes or no) ", (yesNo3) => {
                    if (yesNo3.toUpperCase() !== "YES") {
                      console.log("Thank you for using this utility.")
                      rl.close();
                    } else {
                      rl.question("Enter first name to delete. ", (answer2) => {
                        deleteFirstName = answer2;
                        rl.question("Enter last name to delete. ", (ans2) => {
                          deleteLastName = ans2;
                          let indexDeleteFirstName = findWithAttr(arr2, "firstName", deleteFirstName);
                          let indexDeleteLastName = findWithAttr(arr2, "lastName", deleteLastName);
                          if (indexDeleteFirstName === indexDeleteLastName) {
                            arr2.splice(indexDeleteFirstName, 1);
                            let strArr2 = JSON.stringify(arr2);
                            fs.writeFile(jsonFilePath, strArr2, err3 => {
                              if (err3) errorMessage(err3);
                              console.log(arr2);
                              console.log("Names deleted.");
                              rl.close();
                            })
                          } else {
                            console.log("No such match exists. Please try again later.");
                            rl.close();
                          }
                        })
                      })
                    }
                  })
                } else {
                  rl.question("Enter first name to edit. ", (answer2) => {
                    editFirstName = answer2;
                    rl.question("Enter last name to edit. ", (ans2) => {
                      editLastName = ans2;
                      obj2 = {"firstName": editFirstName, "lastName": editLastName};
                      let indexFirstName = findWithAttr(arr2, "firstName", editFirstName);
                      let indexLastName = findWithAttr(arr2, "lastName", editLastName);
                      if (indexFirstName === indexLastName) {
                        rl.question("What do you want to change the first name to? ", (answer3) => {
                          editFirstName = answer3;
                          rl.question("What do you want to change the last name to? ", (ans3) => {
                            editLastName = ans3;
                            arr2[indexFirstName]["firstName"] = editFirstName;
                            arr2[indexLastName]["lastName"] = editLastName;
                            console.log(arr2);
                            let strArr2 = JSON.stringify(arr2);
                            fs.writeFile(jsonFilePath, strArr2, err3 => {
                              if (err3) errorMessage(err3);
                              console.log("Names edited.");
                              fs.readFile(jsonFilePath, (err4, data3) => {
                                if (err4) errorMessage(err4);
                                let arr3 = JSON.parse(data3);
                                rl.question("Do you want to delete a name? (Yes or no) ", (answer4) => {
                                  if (answer4.toUpperCase() !== "YES") {
                                    console.log("Thank you for using this utility.")
                                    rl.close();
                                  } else {
                                    rl.question("Enter first name to delete. ", (answer5) => {
                                      deleteFirstName = answer5;
                                      rl.question("Enter last name to delete. ", (ans5) => {
                                        deleteLastName = ans5;
                                        let indexDeleteFirstName = findWithAttr(arr3, "firstName", deleteFirstName);
                                        let indexDeleteLastName = findWithAttr(arr3, "lastName", deleteLastName);
                                        if (indexDeleteFirstName === indexDeleteLastName) {
                                          arr3.splice(indexDeleteFirstName, 1);
                                          let strArr3 = JSON.stringify(arr3);
                                          fs.writeFile(jsonFilePath, strArr3, err5 => {
                                            if (err5) return console.log('error: ', err5);
                                            console.log(arr3);
                                            console.log("Names deleted.");
                                            rl.close();
                                          })
                                        } else {
                                          console.log("No such match exists. Please try again later.");
                                          rl.close();
                                        }
                                      })
                                    })
                                  }
                                })
                              })
                            })
                          })
                        })
                      }
                    })
                  })
                }
              })
            })
          })
        })
      });
    }
  })
});

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i++) {
    if (array[i][attr] === value) {
      return i;
    }
  }
}
