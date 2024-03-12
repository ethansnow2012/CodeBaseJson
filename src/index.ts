#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';

let cbjConfig = {
  dirPath: './',
  outputFileName: 'cbj_output.json'
};

type Ignore = ReturnType<typeof ignore>;

try {
    const configPath = process.cwd()+'\\cbj.config.js'
    console.log('trying to read configModule:', configPath);
    const configModule = require(configPath);
    if(configModule){
        console.log('Config module read.');
    }
    cbjConfig = configModule || cbjConfig;
    console.log('Config module read.', cbjConfig);
    
} catch (error) {
  console.log('No cbj.config.ts found, using default configuration.', error);
}

interface FileData {
    path: string;
    content: string;
}

function readGitignore(): string[] {
    const forceIgnorePath = ['.git', '.gitignore', 'node_modules', 'dist', 'build', 'out', 'coverage', 'cbj_output.json', 'cbj.config.js', '*-lock.yaml']
    const gitignorePath = '.gitignore' //path.join('/', '.gitignore');
    console.log('reading gitignorePath:', gitignorePath);
    if (fs.existsSync(gitignorePath)) {
        return forceIgnorePath.concat(fs.readFileSync(gitignorePath, 'utf8').split('\n'));
    }
    return forceIgnorePath;
}

function readFilesRecursively(dir: string, ig: Ignore): FileData[] {
    let results: FileData[] = [];

    fs.readdirSync(dir).forEach(file => {
        file = path.resolve(dir, file);
        if (ig.ignores(path.relative(cbjConfig.dirPath, file))) {
            return;
        }
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(readFilesRecursively(file, ig));
        } else {
            results.push({
                path: file,
                content: fs.readFileSync(file, 'utf8')
            });
        }
    });

    return results;
}

const ig = ignore();
const gitignoreRules = readGitignore()
ig.add(gitignoreRules);

const dirPath = cbjConfig.dirPath;
console.log('Read files recursively from:', dirPath);
const filesData = readFilesRecursively(dirPath, ig);
const jsonContent = JSON.stringify(filesData, null, 2);

fs.writeFileSync(cbjConfig.outputFileName, jsonContent);
console.log(`Files data written to ${cbjConfig.outputFileName}`);