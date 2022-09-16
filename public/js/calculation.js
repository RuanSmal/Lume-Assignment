function combineFields() {
  console.log(document.getElementById("csvFile"));

  var name = document.getElementById("fname").value;
  var lastname = document.getElementById("lname").value;
  var str = name + "matches" + lastname;
  var nameTotals = countString(str);
  document.getElementById("stringReturn").innerHTML = nameTotals;

  var matchPercentage = 0;
  var rating = " bad match!";
  var resultDiv = document.getElementById("stringReturn");

  if (name.toLowerCase() === lastname.toLowerCase()) {
    matchPercentage = 100;
  } else {
    matchPercentage = percentageCalc(nameTotals);
  }

  if (matchPercentage >= 80) {
    rating = " good match!";
    resultDiv.classList.add("alert-success");
  } else if (matchPercentage >= 60 || matchPercentage <= 79) {
    rating = " fair match!";
    resultDiv.classList.add("alert-warning");
  }

  document.getElementById("stringReturn").innerHTML =
    name[0].toUpperCase() +
    name.slice(1, name.length) +
    " matches " +
    lastname[0].toUpperCase() +
    lastname.slice(1, lastname.length) +
    " " +
    matchPercentage +
    "%," +
    rating;
}

function countString(str) {
  var count = 0;
  var stringTotal = "";
  while (str.length !== 0) {
    count = 0;
    firstLoop = str.charAt(0);
    for (var j = 0; j < str.length; j++) {
      var secondLoop = str.charAt(j);
      if (firstLoop === secondLoop) {
        count++;
      }
    }
    //console.log(firstLoop + " = " + count)
    str = str.replaceAll(firstLoop, "");
    //console.log(str.length + " length");
    stringTotal += count.toString();
  }
  return stringTotal;
}

function percentageCalc(digits) {
  var answer = "";
  var firstDigit = 0;
  var lastDigit = 0;
  var plus = 0;
  var append = "";

  var testAnswer = 0;

  var stop = false;

  while (digits.length > 0 || stop === false) {
    firstDigit = digits.charAt(0);
    lastDigit = digits.charAt(digits.length - 1);

    if (digits.length < 2) {
      append = digits.charAt(0);

      testAnswer = answer.toString() + append.toString();

      if (digits.length === 1 && testAnswer.length === 2) {
        break;
      }

      digits = testAnswer;
      answer = "";
    } else {
      plus = parseInt(firstDigit) + parseInt(lastDigit);
      answer += plus.toString();
      digits = digits.slice(1, digits.length - 1);
    }

    if (answer.length < 3) {
      stop = true;
    } else {
      stop = false;
    }
  }
  return testAnswer;
}
