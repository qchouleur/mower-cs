import * as fs from 'fs';
import yargs from 'yargs';

import { Interpreter } from './interpreter';
import { Parser } from './parser';

const args = yargs.options({
  file: { type: 'string', demandOption: true, alias: 'f' },
}).argv;

if (!fs.existsSync(args.file)) {
  console.error(`no file with the path ${args.file}`);
} else {
  try {
    const source = fs.readFileSync(args.f as string, 'utf-8');
    console.log(new Interpreter(new Parser()).process(source));
  } catch (err) {
    console.error(err);
  }
}
