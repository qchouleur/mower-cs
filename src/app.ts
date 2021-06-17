import * as fs from 'fs';
import yargs from 'yargs';
import { Interpreter } from './interpreter';

const args = yargs.options({
  file: { type: 'string', demandOption: true, alias: 'f' },
}).argv;

try {
  console.log(args.f);
  const source = fs.readFileSync(args.f as string, 'utf-8');
  console.log(new Interpreter().process(source));
} catch (err) {
  console.error(err);
}
