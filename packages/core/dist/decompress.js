"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const defaultConfig_1 = require("./defaultConfig");
const child_process_1 = require("child_process");
const constants_1 = require("./constants");
function processBatchJsonFiles(jsonFilePath) {
    try {
        const fileDataBatch = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf8' }));
        fileDataBatch.forEach(fileData => {
            const normalizedPath = path.normalize(fileData.path).replace(/^([A-Z]:\\|\\\\)/, '/');
            const homeDir = process.cwd();
            const absPath = normalizedPath.replace(constants_1.homeChar, homeDir);
            if (!fs.existsSync(absPath)) {
                fs.mkdirSync(path.dirname(absPath), { recursive: true });
            }
            fs.writeFileSync(absPath, fileData.content, { encoding: 'utf8' });
            console.log(`${fs.existsSync(absPath) ? 'Updated' : 'Created'}: ${normalizedPath}`);
        });
    }
    catch (error) {
        console.error(`Error processing ${jsonFilePath}:`, error);
    }
}
// Function to check for uncommitted changes using Git
function checkForUncommittedChanges() {
    try {
        const result = (0, child_process_1.execSync)('git status --porcelain').toString();
        return result !== '';
    }
    catch (error) {
        console.error('Error checking for uncommitted changes:', error);
        return false;
    }
}
function decompress() {
    if (checkForUncommittedChanges()) {
        console.log('Warning: There are uncommitted changes. Please commit or stash them before running decompress.');
        return;
    }
    let cbjConfig = (0, defaultConfig_1.readConfig)();
    const intputFileName = cbjConfig.intputFileName || 'cbj_representation';
    if (intputFileName.includes('.')) {
        throw new Error('intputFileName: ' + intputFileName + 'should not include file extension');
    }
    fs.readdirSync('./').forEach(file => {
        if (file === `${intputFileName}.json` || (file.startsWith(`${intputFileName}_`) && path.extname(file) === '.json')) {
            processBatchJsonFiles(path.resolve('./', file));
        }
    });
}
exports.default = decompress;
