
import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';
import cbjConfig, { readConfig } from './defaultConfig'
import { FileData } from './type'

type Ignore = ReturnType<typeof ignore>;

function readGitignore(): string[] {
    const forceIgnorePath = ['.git', '.gitignore', 'node_modules', 'dist', 'build', 'out', 'coverage', '/cbj_representation.json', 'cbj.config.js', '*-lock.yaml']
    const gitignorePath = '.gitignore';
    console.log('reading gitignorePath:', gitignorePath);
    if (fs.existsSync(gitignorePath)) {
        return forceIgnorePath.concat(fs.readFileSync(gitignorePath, 'utf8').split('\n'));
    }
    return forceIgnorePath;
}

function isImageFile(file: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'];
    return imageExtensions.some(ext => file.endsWith(ext));
}
function readFilesRecursively(dir: string, ig: Ignore, _cbjConfig: typeof cbjConfig): FileData[] {
    let results: FileData[] = [];

    fs.readdirSync(dir).forEach(file => {
        file = path.resolve(dir, file);
        if (ig.ignores(path.relative(_cbjConfig.dirPath, file)) || isImageFile(file)) {
            return;
        }
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(readFilesRecursively(file, ig, _cbjConfig));
        } else {
            results.push({
                path: file,
                content: fs.readFileSync(file, 'utf8')
            });
        }
    });

    return results;
}

function generateBatchJsonFiles(dir: string, ig: Ignore, batchCount: number): void {
    const filesData = readFilesRecursively(dir, ig, cbjConfig);
    const batchSize = Math.ceil(filesData.length / batchCount);

    for (let i = 0; i < filesData.length; i += batchSize) {
        const batchFiles = filesData.slice(i, i + batchSize);
        const fileDataBatch = batchFiles.map(file => ({
            path: file.path,
            content: file.content
        }));
        const jsonContent = JSON.stringify(fileDataBatch, null, 2);
        let outputFileName = ''
        if (batchCount === 1) {
            outputFileName = `cbj_representation.json`;
        }else{
            outputFileName = `cbj_representation_${Math.floor(i / batchSize) + 1}.json`;
        }
        
        fs.writeFileSync(outputFileName, jsonContent);
        console.log(`Batch(with batchCount ${batchCount}) file data written to ${outputFileName}`);
    }
}

export default function compress() {
    let cbjConfig = readConfig();
    const ig = ignore();
    const gitignoreRules = readGitignore();
    ig.add(gitignoreRules);
    const dirPath = cbjConfig.dirPath;
    const batchCount = cbjConfig.batchCount;

    generateBatchJsonFiles(dirPath, ig, batchCount);
}
