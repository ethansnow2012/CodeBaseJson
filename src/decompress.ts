
import * as fs from 'fs';
import * as path from 'path';
import { readConfig } from './defaultConfig'
import { FileData } from './type'

function processBatchJsonFiles(jsonFilePath: string): void {
    try {
        const fileDataBatch: FileData[] = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf8' }));
        fileDataBatch.forEach(fileData => {
            const normalizedPath = path.normalize(fileData.path).replace(/^([A-Z]:\\|\\\\)/, '/');
            const dir = path.dirname(normalizedPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(normalizedPath, fileData.content, { encoding: 'utf8' });
            console.log(`${fs.existsSync(normalizedPath) ? 'Updated' : 'Created'}: ${normalizedPath}`);
        });
    } catch (error) {
        console.error(`Error processing ${jsonFilePath}:`, error);
    }
}


export default function decompress() {
    let cbjConfig = readConfig();
    const intputFileName = cbjConfig.intputFileName || 'cbj_representation';

    fs.readdirSync('./').forEach(file => {
        if (file === `${intputFileName}.json` || (file.startsWith(`${intputFileName}_`) && path.extname(file) === '.json')) {
            processBatchJsonFiles(path.resolve('./', file));
        }
    });
}
