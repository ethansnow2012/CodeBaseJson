import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';
import cbjConfig, { readConfig } from './defaultConfig'
import { FileData } from './type'

type Ignore = ReturnType<typeof ignore>;

function readGitignore(): string[] {
    const forceIgnorePath = ['.git', '.gitignore', 'node_modules', 'dist', 'build', 'out', 'coverage', 'cbj_representation.json', 'cbj.config.js', '*-lock.yaml']
    const gitignorePath = '.gitignore' //path.join('/', '.gitignore');
    console.log('reading gitignorePath:', gitignorePath);
    if (fs.existsSync(gitignorePath)) {
        return forceIgnorePath.concat(fs.readFileSync(gitignorePath, 'utf8').split('\n'));
    }
    return forceIgnorePath;
}

function readFilesRecursively(dir: string, ig: Ignore, _cbjConfig: typeof cbjConfig): FileData[] {
    let results: FileData[] = [];

    fs.readdirSync(dir).forEach(file => {
        file = path.resolve(dir, file);
        if (ig.ignores(path.relative(_cbjConfig.dirPath, file))) {
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

export default function compress() {
    let cbjConfig = readConfig()

    const ig = ignore();
    const gitignoreRules = readGitignore()
    ig.add(gitignoreRules);

    const dirPath = cbjConfig.dirPath;
    console.log('Read files recursively from:', dirPath);
    const filesData = readFilesRecursively(dirPath, ig, cbjConfig);
    const jsonContent = JSON.stringify(filesData, null, 2);

    fs.writeFileSync(cbjConfig.outputFileName, jsonContent);
    console.log(`Files data written to ${cbjConfig.outputFileName}`);
}
