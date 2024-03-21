import * as fs from 'fs';
import * as path from 'path';

export default function init() {
    const srcPath = path.join('./packages/core/assets', 'cbj_representation.json');
    const destPath = path.join('./', 'cbj_representation.json');

    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log('cbj_representation.json has been copied to the project root.');
    } else {
        console.log('cbj_representation.json does not exist in ./packages/core/assets');
    }
}