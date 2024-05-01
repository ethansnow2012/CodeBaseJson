"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const compress_1 = __importDefault(require("../compress"));
const decompress_1 = __importDefault(require("../decompress"));
describe('E2E Test for File Operations', () => {
    const tempFileName = 'tempFile.js';
    const tempFilePath = path_1.default.join(process.cwd(), tempFileName);
    const cbjRepresentationPath = path_1.default.join(process.cwd(), 'cbj_representation.json');
    it('should add, compress, check, remove, decompress, and recover a file', () => {
        // Step 1: Add a random file    
        fs_1.default.writeFileSync(tempFilePath, 'console.log("This is a temporary file.");');
        // Step 2: Compress
        (0, compress_1.default)();
        // Step 3: Check cbj_representation has the content
        const cbjRepresentation = fs_1.default.readFileSync(cbjRepresentationPath, 'utf8');
        (0, chai_1.expect)(cbjRepresentation.includes(`"path":` + ' ' + `"~/tempFile.js",`)).to.be.true;
        // Step 4: Remove the random file
        fs_1.default.unlinkSync(tempFilePath);
        (0, chai_1.expect)(fs_1.default.existsSync(tempFilePath)).to.be.false;
        // // Step 5: Decompress
        (0, decompress_1.default)();
        // Step 6: Check the file recovered
        const fileRecovered = fs_1.default.existsSync(tempFilePath);
        // Clean up (remove the temporary file after test)
        fs_1.default.unlinkSync(tempFilePath);
    });
    const testFilePath = path_1.default.join('./packages/core', 'testFile.txt');
    const originalContent = 'Original content';
    const modifiedContent = 'Modified content';
    it('should detect and include changes in an existing file', () => {
        // before
        // Create a test file with original content
        fs_1.default.writeFileSync(testFilePath, originalContent);
        // Run compress to include the original file
        (0, compress_1.default)();
        // before end
        // Modify the test file
        fs_1.default.writeFileSync(testFilePath, modifiedContent);
        // Run compress again
        (0, compress_1.default)();
        // Read the cbj_representation.json and check if it includes the modified content
        const cbjRepresentation = JSON.parse(fs_1.default.readFileSync('./cbj_representation.json', 'utf8'));
        const testFileData = cbjRepresentation.find(fileData => fileData.path.includes('testFile.txt'));
        (0, chai_1.expect)(testFileData).to.exist;
        (0, chai_1.expect)(testFileData.content).to.equal(modifiedContent);
        // after 
        if (fs_1.default.existsSync(testFilePath)) {
            fs_1.default.unlinkSync(testFilePath);
        }
        if (fs_1.default.existsSync('./cbj_representation.json')) {
            fs_1.default.unlinkSync('./cbj_representation.json');
        }
        // after end
    });
});
