import { readFile } from 'node:fs/promises';
import { put } from '@vercel/blob';

const [filePath, destination] = process.argv.slice(2);

if (!filePath || !destination) {
  console.error('Usage: node upload-blob.mjs <file-path> <destination>');
  process.exit(1);
}

const fileBuffer = await readFile(filePath);
const { url } = await put(destination, fileBuffer, {
  access: 'public',
  addRandomSuffix: false,
});

console.log(url);
