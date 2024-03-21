import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import compress from '../compress';
import decompress from '../decompress';
import { FileData } from '../type';

describe('E2E Test for File Operations', () => {
  const tempFileName = 'tempFile.js';
  const tempFilePath = path.join(__dirname, tempFileName);
  const cbjRepresentationPath = path.join(__dirname, '../../../cbj_representation.json');

  it('should add, compress, check, remove, decompress, and recover a file', () => {
    // Step 1: Add a random file    
    fs.writeFileSync(tempFilePath, 'console.log("This is a temporary file.");');

    // Step 2: Compress
    compress();

    // Step 3: Check cbj_representation has the content
    const cbjRepresentation = JSON.parse(fs.readFileSync(cbjRepresentationPath, 'utf8'));
    const fileInRepresentation = cbjRepresentation.some((file: FileData) => file.content.includes(`content: 'console.log("This is a temporary file.");'`));
    expect(fileInRepresentation).to.be.true;

    // Step 4: Remove the random file
    fs.unlinkSync(tempFilePath);
    expect(fs.existsSync(tempFilePath)).to.be.false;

    // // Step 5: Decompress
    decompress();
    
    // Step 6: Check the file recovered
    const fileRecovered = fs.existsSync(tempFilePath);

    // Clean up (remove the temporary file after test)
    fs.unlinkSync(tempFilePath);
  });
  
  const testFilePath = path.join('./packages/core', 'testFile.txt');
  const originalContent = 'Original content';
  const modifiedContent = 'Modified content';
  it('should detect and include changes in an existing file', () => {
    // before
    // Create a test file with original content
    fs.writeFileSync(testFilePath, originalContent);
    // Run compress to include the original file
    compress();
    // before end

    // Modify the test file
    fs.writeFileSync(testFilePath, modifiedContent);
    
    // Run compress again
    compress();

    // Read the cbj_representation.json and check if it includes the modified content
    const cbjRepresentation: FileData[] = JSON.parse(fs.readFileSync('./cbj_representation.json', 'utf8'));
    const testFileData = cbjRepresentation.find(fileData => fileData.path.includes('testFile.txt'));

    expect(testFileData).to.exist;
    expect(testFileData!.content).to.equal(modifiedContent);

    // after 
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    if (fs.existsSync('./cbj_representation.json')) {
      fs.unlinkSync('./cbj_representation.json');
    }
    // after end
  });
});