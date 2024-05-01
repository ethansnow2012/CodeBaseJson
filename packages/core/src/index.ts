#!/usr/bin/env node
import * as process from 'process';
import init from "@/init";
import compress from "@/compress";
import decompress from "@/decompress";


// Main logic to parse command line arguments
const args = process.argv.slice(2);
switch (args[0]) {
  case 'init':
    init();
    break;
  case 'compress':
    compress();
    break;
  case 'decompress':
    decompress();
    break;
  default:
    console.log('Unknown command. Use "compress" or "decompress".');
}