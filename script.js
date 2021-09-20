// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//////////////////
// Student Code //
//////////////////

// Main data-structure and info regarding algorithm
const pwdLenMin = 8;
const pwdLenMax = 128;

var passwordPerms = {
  length: pwdLenMin,
  charTypes: [
    {
      name: "lowerCase",
      include: false,
      values: "abcdefghijklmnopqrstuvwxyz"
    },
    {
      name: "upperCase",
      include: false,
      values: ("abcdefghijklmnopqrstuvwxyz").toUpperCase()
    },
    {
      name: "numeric",
      include: false,
      values: "1234567890"
    },
    {
      name: "specialChars",
      include: false,
      values: ` !"#$%&'()*+,-./:;<=>?@[]^_{|}~` + "`" + "\\"
    }]
}

// Gets the 'charType' (set of characters allowed) by the name of the charType
function charTypeByName(name) {
  var charTypes = passwordPerms.charTypes;
  for (var i = 0; i < charTypes.length; i++)
    if (name == charTypes[i].name)
      return charTypes[i];
}

// Not used but a shorthand version of charTypeByName
var charTypeByNameFancy = (name) => arr.filter((item) => { return item.name === name; });

function random(min, max) {
  return Math.floor(Math.random() * ((max) - min) + min);
}

// Another shorthand version that goes beyond the scope of the assignment
var randomFancy = (min, max) => Math.floor(Math.random() * ((max) - min) + min);

// Takes acceptable values and generates password based on those values
function buildPassword() {

  // Build acceptable values to include in password
  var charTypes = passwordPerms.charTypes;
  var values = ""

  for (var i = 0; i < charTypes.length; i++)
    if (charTypes[i].include)
      values += charTypes[i].values

  // Generate password based on values list
  var password = ""

  if (values.length != 0) {
    var length = passwordPerms.length;
    for (var i = 0; i < length; i++) {
      password += values[random(0, values.length)]
    }
  } else {// No settings used (cancel selected evert prompt)
    alert("No setting were selected so no meaningful password could be generated.");
    password = "no settings";
  }

  return password;
}

// Prompt user for info about password
function setPwdSettings() {

  var value;

  do { // Error checking (must be in between 8 and 128)
    value = parseInt(prompt("Insert password length (8-128):"));
  } while (isNaN(value) || value < pwdLenMin || value > pwdLenMax);

  passwordPerms.length = value;

  // Prompt to include characters
  charTypeByName("lowerCase").include = confirm("Include lower-case values?");
  charTypeByName("upperCase").include = confirm("Include upper-case values?");
  charTypeByName("numeric").include = confirm("Include numeric values?");
  charTypeByName("specialChars").include = confirm("Include special values?");

  alert("Password generated!")
}

function generatePassword() {

  setPwdSettings();

  return buildPassword();
  
}
