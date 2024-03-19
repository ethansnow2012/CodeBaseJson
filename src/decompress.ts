
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { readConfig } from './defaultConfig'
import { FileData } from './type'

const processData = (fileData: FileData[]) => {
    fileData.forEach(({ path: filePath, content }) => {
        const normalizedPath = path.normalize(filePath).replace(/^([A-Z]:\\|\\\\)/, '/');
        const dir = path.dirname(normalizedPath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(normalizedPath, content, { encoding: 'utf8' });
        console.log(`${fs.existsSync(normalizedPath) ? 'Updated' : 'Created'}: ${normalizedPath}`);
    });
};

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
    let cbjConfig = readConfig()
    const jsonFilePath = cbjConfig.intputFileName || 'cbj_representation.json';

    // Check for uncommitted changes before proceeding
    if (checkForUncommittedChanges()) {
        console.log('Warning: There are uncommitted changes. Please commit or stash them before running decompress.');
        return;
    }

    try {
        const fileData = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: 'utf8' })) as FileData[];
        processData(fileData);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};
