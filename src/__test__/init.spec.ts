import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import init from '../init';

describe('init function', () => {
  const srcPath = path.join('./src/assets', 'cbj_representation.json');
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

  it('should copy cbj_representation.json from ./src/assets to ./', () => {
    // Ensure the source file exists for the test
    if (!fs.existsSync(srcPath)) {
      fs.writeFileSync(srcPath, '{}'); // Create a dummy file
    }

    init();

    expect(fs.existsSync(destPath)).to.be.true;
    expect(fs.readFileSync(destPath, 'utf8')).to.equal(fs.readFileSync(srcPath, 'utf8'));
  });

  it('should handle the absence of cbj_representation.json in ./src/assets', () => {
    // Ensure the source file does not exist
    if (fs.existsSync(srcPath)) {
      fs.unlinkSync(srcPath);
    }

    init();

    expect(fs.existsSync(destPath)).to.be.false;
  });
});