#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

interface FileData {
    path: string;
    content: string;
}

function readFilesRecursively(dir: string): FileData[] {
    let results: FileData[] = [];

    fs.readdirSync(dir).forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(readFilesRecursively(file));
        } else {
            results.push({
                path: file,
                content: fs.readFileSync(file, 'utf8')
            });
        }
    });

    return results;
}

const dirPath = './src'; // Replace with your directory path
const filesData = readFilesRecursively(dirPath);
const jsonContent = JSON.stringify(filesData, null, 2);

fs.writeFileSync('cbj_output.json', jsonContent); // This writes the JSON data to output.json
console.log('Files data written to output.json');