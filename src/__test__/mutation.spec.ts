import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import compress from '../compress';
import decompress from '../decompress';
import { FileData } from '../type';

describe('E2E Test for File Operations', () => {
  const tempFileName = 'tempFile.js';
  const tempFilePath = path.join(__dirname, tempFileName);
  const cbjRepresentationPath = path.join(__dirname, '../../cbj_representation.json');

  it('should add, compress, check, remove, decompress, and recover a file', async () => {
    // Step 1: Add a random file
    fs.writeFileSync(tempFilePath, 'console.log("This is a temporary file.");');

    // Step 2: Compress
    compress();

    // Step 3: Check cbj_representation has the content
    const cbjRepresentation = JSON.parse(fs.readFileSync(cbjRepresentationPath, 'utf8'));
    const fileInRepresentation = cbjRepresentation.some((file: FileData) => file.path.includes(tempFileName));
    expect(fileInRepresentation).to.be.true;

    // Step 4: Remove the random file
    fs.unlinkSync(tempFilePath);

    // Step 5: Decompress
    decompress();

    // Step 6: Check the file recovered
    const fileRecovered = fs.existsSync(tempFilePath);
    expect(fileRecovered).to.be.true;

    // Clean up (remove the temporary file after test)
    fs.unlinkSync(tempFilePath);
  });
});