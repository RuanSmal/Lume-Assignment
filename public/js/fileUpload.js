function handleFileSelect() {
    var file = document.getElementById("csvFile").files[0];
    var reader = new FileReader();
    var link_reg = /(http:\/\/|https:\/\/)/i;

    reader.onload = function (file) {

      var content = file.target.result; //not needed
      var mixedArray = file.target.result.split(/[\r\n|\n]+/);

      mixedArray.shift(); //Remove Name and Gender headings

      console.log("content");
      console.log(content);
      console.log("rows");
      console.log(mixedArray);

      //Split gender into 2 arrays

      var femaleArr = [];
      var maleArr = [];

      var matchResults = "";

      //Don't include last empty element - due to shift function - -2
      for (var i = 0; i < mixedArray.length - 2; i++) {

        person = mixedArray[i];

        gender = person.charAt(person.length - 1);

        var name = person.length - 2;

        if (gender.toLowerCase() === "f") {
          if (!femaleArr.includes(name)) {
            femaleArr.push(person.slice(0, name));
          }
        } else {
          if (!maleArr.includes(name)) {
            maleArr.push(person.slice(0, name));
          }
        }
      }

      for (var f = 0; f < femaleArr.length; f++) {
        var female = femaleArr[f];

        for (var m = 0; m < maleArr.length; m++) {
          var male = maleArr[m];
          var percentage = percentageCalc(countString(female + "matches" + male));
          var rating = " ,bad match!";

          if (percentage >= 80) {
            matchResults += female + " matches " + male + " " + percentage + " ,good match!" + "\n";
          } else if (percentage >= 60 || percentage <= 79) {
            matchResults += female + " matches " + male + " " + percentage + " ,average match!" + "\n";
          }
        }
      }

      var matchLink = document.getElementById("macthLink");

      matchLink.setAttribute("download", "output.txt");
      matchLink.innerHTML = "Download link here, to view matches <3";
      matchLink.href = makeTextFile(matchResults);
  };

  reader.readAsText(file);

  var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], { type: "text/plain" });

      // If we are replacing a previously generated file we need to
      // manually revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      // returns a URL you can use as a href
      return textFile;
    };
}
document
  .getElementById("csvForm")
  .addEventListener("submit", handleFileSelect, false);
document.getElementById("csvFile").addEventListener("change", fileInfo, false);
