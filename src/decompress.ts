import * as fs from 'fs';
import * as path from 'path';
import { readConfig } from './defaultConfig'
import { FileData } from './type'

const processData = (fileData: FileData[]) => {
    fileData.forEach(({ path: filePath, content }) => {
        const normalizedPath = path.normalize(filePath).replace(/^([A-Z]:\\|\\\\)/, '/'); // Adjust for Unix-like path
        const dir = path.dirname(normalizedPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(normalizedPath, content, { encoding: 'utf8' });
        console.log(`${fs.existsSync(normalizedPath) ? 'Updated' : 'Created'}: ${normalizedPath}`);
    });
};

export default function decompress() {
    let cbjConfig = readConfig()!!
    const jsonFilePath = cbjConfig.intputFileName || 'cbj_representation.json';

    try {
        const fileData = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf8' })) as FileData[];
        //console.log('File data:', fileData)
        processData(fileData);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

