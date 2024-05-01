"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = void 0;
const _cbjConfig = {
    dirPath: './',
    outputFileName: 'cbj_representation',
    intputFileName: 'cbj_representation',
    batchCount: 1
};
exports.default = _cbjConfig;
function readConfig() {
    try {
        const configPath = process.cwd() + '\\cbj.config.js';
        console.log('trying to read configModule:', configPath);
        const configModule = require(configPath);
        if (configModule) {
            console.log('Config module read.');
        }
        return (configModule || _cbjConfig);
    }
    catch (error) {
        console.log('No cbj.config.ts found, using default configuration.');
        return _cbjConfig;
    }
}
exports.readConfig = readConfig;
