const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\james\\OneDrive\\Documents\\SEP hackathon';
const webDir = path.join(rootDir, 'web');
const legacyDocsDir = path.join(rootDir, 'legacy_docs');
const legacyDesignDir = path.join(rootDir, 'legacy_design');

// 1. Create legacy folders
if (!fs.existsSync(legacyDocsDir)) fs.mkdirSync(legacyDocsDir);
if (!fs.existsSync(legacyDesignDir)) fs.mkdirSync(legacyDesignDir);

// 2. Move root files to legacy_docs
const rootFilesToMove = ['README.md', 'PRD.md'];
rootFilesToMove.forEach(file => {
    const src = path.join(rootDir, file);
    const dest = path.join(legacyDocsDir, file);
    if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
        console.log(`Moved ${file} to legacy_docs/`);
    }
});

// 3. Move other project folders to legacy_design
const foldersToMove = ['landingpage', 'onboarding_trojanmarketplace', 'figmaui'];
foldersToMove.forEach(folder => {
    const src = path.join(rootDir, folder);
    const dest = path.join(legacyDesignDir, folder);
    if (fs.existsSync(src) && fs.lstatSync(src).isDirectory()) {
        fs.renameSync(src, dest);
        console.log(`Moved ${folder}/ to legacy_design/`);
    }
});

// 4. Move everything from web/ to root
const webContents = fs.readdirSync(webDir);
webContents.forEach(item => {
    const src = path.join(webDir, item);
    const dest = path.join(rootDir, item);

    // Don't overwrite node_modules if it somehow exists in both (unlikely)
    if (fs.existsSync(dest)) {
        console.warn(`Warning: ${item} already exists in root! Overwriting...`);
    }

    fs.renameSync(src, dest);
    console.log(`Moved web/${item} to root/`);
});

console.log('Restructure complete!');
