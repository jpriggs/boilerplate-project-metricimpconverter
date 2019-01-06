/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '2.2lb';
      assert.equal(convertHandler.getNum(input), 2.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/4cup';
      assert.equal(convertHandler.getNum(input), 3/4);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '5.0/7.8734';
      assert.equal(convertHandler.getNum(input), 0.635049660883481);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '1/2/2lb';
      assert.equal(convertHandler.getNum(input), 0.25);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'lb';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.include(convertHandler.getUnit(ele), ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = ['gallon', 'liter', 'litre', 'hyn', 'eee', 'XYZ', 'ABC', 'POR', 'HYN', 'EEE'];
      input.forEach(function(ele) {
        assert.include(convertHandler.getUnit(ele), 'invalid unit');
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gallon', 'liter', 'litre', 'miles', 'kilometers', 'pounds', 'kilograms', 'GALLONS'];
      var expect = ['gal', 'l', 'l', 'mi', 'km', 'lbs', 'kg', 'gal'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [22, 'l'];
      var expected = 5.81179;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [10, 'mi'];
      var expected = 16.0934;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [58, 'km'];
      var expected = 36.0395;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [185, 'lbs'];
      var expected = 83.9146;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [61, 'kg'];
      var expected = 134.482;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});