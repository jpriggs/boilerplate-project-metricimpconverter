/*
*
*
*       Complete the handler logic below
*       
*       
*/
function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    //Capture any positive/negative numerical digit, decimal point, and fraction slash
    var re = /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/g;
    let regexResult = input.match(re);
    
    //Check if a valid number was entered
    if(regexResult !== null) {
      result = 0;
      regexResult.forEach(function(val) {
        //Check if value has either a fraction slash or a decimal point
        if(val.indexOf('/') > -1 || val.indexOf('.') > -1) {
          //Process if value only contains a decimal point
          if(val.includes('.') && !val.includes('/')) {
            let decimal = Number(val);
            result += decimal;
          }
          //Process any combination of whole numbers, floats, and fractions
          else {
            let fracVals = val.split('/');
            if(fracVals.length > 1) {
              let fracToDec = Number(fracVals[0]);
              for(let i = 1; i < fracVals.length; i++) {
                fracToDec /= fracVals[i];
              }
              result += fracToDec;
            }
            else {
              result = 'invalid number';
            }
          }
        }
        //Process whole number only
        else {
          let wholeNumber = Number(val);
          result += wholeNumber;
        }
      });
    }
    //Default to 1 if no number was entered
    else {
      result = 1;
    }
    //console.log('init num: ' + result + ', ' + typeof result);
    return result;
  };
  
  this.getUnit = function(input) {
    
    var result = '';
    let validUnit = ['gal','l','mi','km','lbs','lb','kg','GAL','L','MI','KM','LBS','LB', 'KG'];
    
    //Strip all numbers from input
    var re = /[^a-z]/gi;
    input = input.replace(re, '');
    
    //Compare input against valid units
    for(let i = 0; i < validUnit.length; i++) {
      if(validUnit[i] === input) {
        result = validUnit[i];
      }
    }
    
    //Convert lb to lbs
    if(result === 'lb') {
      result = 'lbs';
    }
    else if(result === 'LB') {
      result = 'LBS';
    }
    
    //If input doesn't match a valid unit, return an empty string
    if(result === '') {
      result = 'invalid unit';
    }
    //console.log('init unit: ' + result + ', ' + typeof result);
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    let units = {
      gal: 'l',
      mi: 'km',
      lbs: 'kg',
      l: 'gal',
      km: 'mi',
      kg: 'lbs'
    };
    
    //Sanitize input to lowercase to match keys
    initUnit = initUnit.toLowerCase();
    
    if(units.hasOwnProperty(initUnit)) {
      //Return the matching key's value
      result = units[initUnit];
    }
    else {
      result = 'invalid unit';
    }
    //console.log('return unit: ' + result + ', ' + typeof result);
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    let names = {
      gallon: 'gal',
      liter: 'l',
      litre: 'l',
      pound: 'lbs',
      kilogram: 'kg',
      mile: 'mi',
      kilometer: 'km'
    };
    
    //Sanitize input to lowercase to match key
    unit = unit.toLowerCase();
    
    //Trim off any unit pluralization
    if(unit.slice(-1) === 's') {
      unit = unit.slice(0, -1);
    }
    
    //Return full word abbreviation value
    result = names[unit];
    //console.log('spellout result: ' + result + ', ' + typeof result);
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    let units = {
      gal: 'galToL',
      mi: 'miToKm',
      lbs: 'lbsToKg',
      l: 'lToGal',
      km: 'kmToMi',
      kg: 'kgToLbs'
    };
    let conversions = {
      galToL: 3.78541,
      lToGal: 0.264172,
      lbsToKg: 0.453592,
      kgToLbs: 2.20462,
      miToKm: 1.60934,
      kmToMi: 0.621371
    };
    
    //Sanitize unit to lowercase to match key
    initUnit = initUnit.toLowerCase();
    //Check if valid unit user unit was entered
    if(!units.hasOwnProperty(initUnit)) {
      result = 'invalid number';
    }
    else {
      //Get input unit's conversion method
      let conversionUnit = units[initUnit];
      //Use the method to get the key's conversion number
      let conversionResult = conversions[conversionUnit] * initNum;

      //Return the conversion number multiplied by the user's input number
      result = conversionResult;
    }
    //console.log('return num: ' + result + ', ' + typeof result);
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    let outputStr = '';
    let spelledOutInput = spellOutUnit(initUnit);
    let spelledOutOutput = spellOutUnit(returnUnit);
    
    //Pluralize units more than 1
    if(spelledOutOutput !== 'invalid unit' && initNum != 1.0) {
      spelledOutInput = spelledOutInput + 's';
    }
    if(returnNum !== 'invalid number' && returnNum != 1.0) {
      spelledOutOutput = spelledOutOutput + 's';
    }
    
    //Truncate valid return number results
    if(typeof returnNum === 'number') {
      returnNum = returnNum.toFixed(5);
      console.log(returnNum);
    }
    
    //Set output string
    if(returnUnit == 'invalid unit' && typeof initNum == 'number') {
      outputStr = 'invalid unit';
    }
    else if(initNum == 'invalid number' && returnNum == 'invalidNUmber') {
      outputStr = 'invalid number';
    }
    else if(returnNum == 'invalid number' && returnUnit == 'invalid unit') {
      outputStr = 'invalid number and unit';
    }
    else {
      outputStr = `${initNum} ${spelledOutInput} converts to ${returnNum} ${spelledOutOutput}`;
    }
    
    //Return output string
    result = outputStr;
    //console.log('string result: ' + result);
    return result;
  };
  
}
function spellOutUnit(unit) {
  var result;
  let names = {
    gal: 'gallon',
    l: 'liter',
    lbs: 'pound',
    kg: 'kilogram',
    mi: 'mile',
    km: 'kilometer'
  };
  
  //Sanitize user input unit to lowercase
  unit = unit.toLowerCase();
  
  //Check if unit matches then name
  if(!names.hasOwnProperty(unit)) {
    result = 'invalid unit';
  }
  else {
    //Return full word abbreviation value
    result = names[unit];
  }
  
  return result;
}
module.exports = ConvertHandler;

