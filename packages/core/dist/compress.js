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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ignore_1 = __importDefault(require("ignore"));
const defaultConfig_1 = __importStar(require("./defaultConfig"));
const constants_1 = require("./constants");
function readGitignore() {
    const forceIgnorePath = ['.git', '.gitignore', 'node_modules', 'dist', 'build', 'out', 'coverage', '/cbj_representation.json', 'cbj.config.js', '*-lock.yaml'];
    const gitignorePath = '.gitignore';
    console.log('reading gitignorePath:', gitignorePath);
    if (fs.existsSync(gitignorePath)) {
        return forceIgnorePath.concat(fs.readFileSync(gitignorePath, 'utf8').split('\n'));
    }
    return forceIgnorePath;
}
function isImageFile(file) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', 'ico'];
    return imageExtensions.some(ext => file.endsWith(ext));
}
function readFilesRecursively(dir, ig, _cbjConfig) {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
        file = path.resolve(dir, file);
        if (ig.ignores(path.relative(_cbjConfig.dirPath, file)) || isImageFile(file)) {
            return;
        }
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(readFilesRecursively(file, ig, _cbjConfig));
        }
        else {
            results.push({
                path: file,
                content: fs.readFileSync(file, 'utf8')
            });
        }
    });
    return results;
}
function generateBatchJsonFiles(dir, ig, batchCount) {
    const filesData = readFilesRecursively(dir, ig, defaultConfig_1.default);
    const batchSize = Math.ceil(filesData.length / batchCount);
    const homeDir = process.cwd();
    for (let i = 0; i < filesData.length; i += batchSize) {
        const batchFiles = filesData.slice(i, i + batchSize);
        const fileDataBatch = batchFiles.map((file) => {
            return {
                path: file.path.replace(homeDir, constants_1.homeChar).replace(/\\/g, '/'),
                content: file.content
            };
        });
        const jsonContent = JSON.stringify(fileDataBatch, null, 2);
        let outputFileName = '';
        if (batchCount === 1) {
            outputFileName = `cbj_representation.json`;
        }
        else {
            outputFileName = `cbj_representation_${Math.floor(i / batchSize) + 1}.json`;
        }
        fs.writeFileSync(outputFileName, jsonContent);
        console.log(`Batch(with batchCount ${batchCount}) file data written to ${outputFileName}`);
    }
}
function compress() {
    console.log('compressing...');
    let cbjConfig = (0, defaultConfig_1.readConfig)();
    const ig = (0, ignore_1.default)();
    const gitignoreRules = readGitignore();
    ig.add(gitignoreRules);
    const dirPath = cbjConfig.dirPath;
    const batchCount = cbjConfig.batchCount;
    generateBatchJsonFiles(dirPath, ig, batchCount);
}
exports.default = compress;
