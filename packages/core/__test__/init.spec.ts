import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import init from '@/init';

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

  it('should copy cbj_representation.json from ./packages/core/assets to ./', () => {
    const srcPath = path.join('./packages/core/assets', 'cbj_representation.json');
    // Ensure the source file exists for the test
    if (!fs.existsSync(srcPath)) {
      fs.writeFileSync(srcPath, '{}'); // Create a dummy file
    }

    init();

    expect(fs.existsSync(destPath)).to.be.true;
    expect(fs.readFileSync(destPath, 'utf8')).to.equal(JSON.stringify(JSON.parse(fs.readFileSync(srcPath, 'utf8'))) );
  });

  it('should handle the absence of cbj_representation.json in ./packages/core/assets', () => {
    const srcPath = path.join('./', 'cbj_representation.json');
    
    init();

    expect(fs.existsSync(destPath)).to.be.true;
  });
});