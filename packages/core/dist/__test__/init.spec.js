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
const chai_1 = require("chai");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const init_1 = __importDefault(require("../init"));
describe('init function', () => {
    const destPath = path.join('./', 'cbj_representation.json');
    // Clean up before and after tests
    beforeEach(() => {
        if (fs.existsSync(destPath)) {
            fs.unlinkSync(destPath);
        }
    });
    afterEach(() => {
        if (fs.existsSync(destPath)) {
            fs.unlinkSync(destPath);
        }
    });
    it('should copy cbj_representation.json from ./packages/core/src/assets to ./', () => {
        const srcPath = path.join('./packages/core/src/assets', 'cbj_representation.json');
        // Ensure the source file exists for the test
        if (!fs.existsSync(srcPath)) {
            fs.writeFileSync(srcPath, '{}'); // Create a dummy file
        }
        (0, init_1.default)();
        (0, chai_1.expect)(fs.existsSync(destPath)).to.be.true;
        (0, chai_1.expect)(fs.readFileSync(destPath, 'utf8')).to.equal(JSON.stringify(JSON.parse(fs.readFileSync(srcPath, 'utf8'))));
    });
    it('should handle the absence of cbj_representation.json in ./packages/core/src/assets', () => {
        const srcPath = path.join('./', 'cbj_representation.json');
        (0, init_1.default)();
        (0, chai_1.expect)(fs.existsSync(destPath)).to.be.true;
    });
});
