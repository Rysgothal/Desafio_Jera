// const { validate } = require('gerador-validador-cpf')
const hashMD5 = require("js-md5");
const validator = require('validator');

const salting = '#$00110%&*^@!00100';

function getHashMD5(stringValue) {
    return hashMD5.md5(stringValue + salting).toString();
};

function isEmail(email) {
    return validator.isEmail(email);
}

module.exports = {
    getHashMD5: getHashMD5,
    isEmail: isEmail
};
