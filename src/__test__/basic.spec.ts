import { expect } from 'chai';
import { execSync } from 'child_process';
import compress from '../compress';
import decompress from '../decompress';

describe('E2E Test for basic functionality.', () => {
  it('Go through compress/decompress without change anything.', async () => {
    compress()
    decompress()
    const diff = execSync('git status --porcelain').toString()
    expect(diff).to.be.eq('');
  });
});




