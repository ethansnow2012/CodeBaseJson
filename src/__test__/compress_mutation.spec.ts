import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import compress from '../compress';
import { FileData } from '../type';

describe('compress function', () => {
  const testFilePath = path.join('./src', 'testFile.txt');
  const originalContent = 'Original content';
  const modifiedContent = 'Modified content';

  before(() => {
    // Create a test file with original content
    fs.writeFileSync(testFilePath, originalContent);
    // Run compress to include the original file
    compress();
  });

  after(() => {
    // Clean up: Remove the test file and the cbj_representation.json
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
    if (fs.existsSync('./cbj_representation.json')) {
      fs.unlinkSync('./cbj_representation.json');
    }
  });

  it('should detect and include changes in an existing file', () => {
    // Modify the test file
    fs.writeFileSync(testFilePath, modifiedContent);
    
    // Run compress again
    compress();

    // Read the cbj_representation.json and check if it includes the modified content
    const cbjRepresentation: FileData[] = JSON.parse(fs.readFileSync('./cbj_representation.json', 'utf8'));
    const testFileData = cbjRepresentation.find(fileData => fileData.path.includes('testFile.txt'));

    expect(testFileData).to.exist;
    expect(testFileData!.content).to.equal(modifiedContent);
  });
});