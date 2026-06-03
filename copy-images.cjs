const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'Images');
const destDir = path.join(__dirname, 'dist', 'Images');

try {
  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true });
    console.log('Successfully copied Images to dist/Images');
  } else {
    console.warn('Source Images directory not found!');
  }
} catch (err) {
  console.error('Failed to copy Images directory:', err);
  process.exit(1);
}
