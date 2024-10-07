const { root } = require("../frontend-monitoramento-escolar/.eslintrc");

module.exports = {
    extends: ['../.eslintrc.js'],
    root: './scr',
    env: {
        node: true,
        jest: true,
    },
};
