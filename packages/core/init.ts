import * as fs from 'fs';
import * as path from 'path';
import cbj_representation from './assets/cbj_representation.json';

export default function init() {
    console.log('cbj_representation:', cbj_representation);
    const destPath = path.join('./', 'cbj_representation.json');

    if (cbj_representation) {
        fs.writeFileSync(JSON.stringify(cbj_representation), destPath);
        console.log('cbj_representation.json has been copied to the project root.');
    } else {
        console.log('cbj_representation.json does not exist in ./packages/core/assets');
    }
}