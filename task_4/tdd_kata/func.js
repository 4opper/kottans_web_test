// "use strict"

(function () {


    add = function (a) {
      var res = 0;
      var delimiter = ',';
      var error = 'negatives not allowed';
      var hasNegative = false;
      if (a == "") {
        return 0
      }

// Will work correctly even if new delimeter is not one symbol
      if (a.indexOf('//') !== -1) {
        delimiter = a.substr(a.indexOf('//') + 2, a.indexOf('\n') - 2);
        var a = a.substr(a.indexOf('\n') + 1, a.length);
      }

// Replace all new lines with delimiter and split string by array
      var numbers = a.replace(/[/\n/]/g, delimiter).split(delimiter);

// Sums all items of number array. If it contains non number values it will throw an error
// Such situation can happen when there are two or more delimiters in a row
      for (var i = 0; i < numbers.length; i++) {
        if (numbers[i] !== "") {
          if (Number(numbers[i]) >= 0) {
            res += Number(numbers[i]) || 0
          } else if (Number(numbers[i]) < 0) {
            hasNegative = true;
            error += ' ' + Number(numbers[i]);
          }
          
        } else {
          return 'invalid input'
        } 
      }

      if (hasNegative) {
        return error
      }

      return res
    }
})()