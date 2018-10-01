var crypto = require('crypto');
var fs = require('fs');
var algorithm = 'aes-256-ctr';
var password = 'd6F3Efeq';

module.exports = {
    aesEncryptBuffer : function aesEncryptBuffer(input, callback) {
        var buffer = input instanceof String ? new Buffer(input, "utf8") : input;
        var cipher = crypto.createCipher(algorithm,password)
        var encrypted = Buffer.concat([cipher.update(buffer),cipher.final()]);

        callback(encrypted);
    },

    aesDecryptBuffer : function aesDecryptBuffer(input, callback) {
        var decipher = crypto.createDecipher(algorithm,password)
            var decrypted = Buffer.concat([decipher.update(input) , decipher.final()]);

        callback(decrypted);
    },

    aesEncryptStream : function aesEncryptStream(input, callback) {
        var r = fs.createReadStream(input);
        var encrypt = crypto.createCipher(algorithm, password);
        var w = fs.createWriteStream(input+'.enc');

        r.pipe(encrypt).pipe(w).on('finish', function () {  // finished
            callback(input+'.enc');
        });
    },

    aesDecryptStream : function aesDecryptStream(input, callback) {
        var r = fs.createReadStream(input);
        var decrypt = crypto.createDecipher(algorithm, password);
        var w = fs.createWriteStream(input+'.dec');

        r.pipe(decrypt).pipe(w).on('finish', function () {  // finished
            callback(input+'.dec');
        });
    }
};
