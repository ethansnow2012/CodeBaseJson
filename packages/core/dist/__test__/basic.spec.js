"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const child_process_1 = require("child_process");
const compress_1 = __importDefault(require("../compress"));
const decompress_1 = __importDefault(require("../decompress"));
describe('E2E Test for basic functionality.', () => {
    it('Go through compress/decompress without change anything.', () => {
        (0, compress_1.default)();
        (0, decompress_1.default)();
        const diff = (0, child_process_1.execSync)('git status --porcelain').toString();
        (0, chai_1.expect)(diff).to.be.eq('');
    });
});
