var express = require('express');
var router = express.Router();
var aes = require('./../modules/aes.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  aes.aesEncryptBuffer("hello world", function(output) {
    console.log(output.toString('utf8'));
    aes.aesDecryptBuffer(output, function(output) {
      console.log(output.toString('utf8'));
    });
  });

  aes.aesEncryptStream("./test.txt", function(outputPath) {
    console.log(outputPath);
    aes.aesDecryptStream(outputPath, function(outputPath) {
      console.log(outputPath);
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
