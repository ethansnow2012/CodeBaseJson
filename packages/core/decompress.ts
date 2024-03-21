
import * as fs from 'fs';
import * as path from 'path';
import { readConfig } from './defaultConfig'
import { FileData } from './type'
import { execSync } from 'child_process';

function processBatchJsonFiles(jsonFilePath: string): void {
    
    try {
        const fileDataBatch: FileData[] = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf8' }));
        
        fileDataBatch.forEach(fileData => {
            console.log('processBatchJsonFiles', fileData.path, fileData.content.length, 'bytes');    
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

// Function to check for uncommitted changes using Git
function checkForUncommittedChanges(): boolean {
    try {
        const result = execSync('git status --porcelain').toString();
        return result !== '';
    } catch (error) {
        console.error('Error checking for uncommitted changes:', error);
        return false;
    }
}

export default function decompress() {
    if (checkForUncommittedChanges()) {
        console.log('Warning: There are uncommitted changes. Please commit or stash them before running decompress.');
        return;
    }
    let cbjConfig = readConfig();
    const intputFileName = cbjConfig.intputFileName || 'cbj_representation';
    if (intputFileName.includes('.')){
        throw new Error('intputFileName: ' + intputFileName + 'should not include file extension');
    }
    fs.readdirSync('./').forEach(file => {
        if (file === `${intputFileName}.json` || (file.startsWith(`${intputFileName}_`) && path.extname(file) === '.json')) {
            processBatchJsonFiles(path.resolve('./', file));
        }
    });
}
