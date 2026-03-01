const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\james\\OneDrive\\Documents\\SEP hackathon';
const webDir = path.join(rootDir, 'web');

// Move everything from web/ to root, skipping node_modules and .next
if (fs.existsSync(webDir)) {
    const webContents = fs.readdirSync(webDir);
    webContents.forEach(item => {
        if (item === 'node_modules' || item === '.next') {
            console.log(`Skipping ${item} (highly likely locked or too large)`);
            return;
        }

        const src = path.join(webDir, item);
        const dest = path.join(rootDir, item);

        if (fs.existsSync(src)) {
            try {
                fs.renameSync(src, dest);
                console.log(`Moved web/${item} to root/`);
            } catch (e) {
                console.error(`Failed to move ${item}: ${e.message}`);
            }
        }
    });
}

console.log('Partial restructure complete. Please delete web/node_modules and web/.next manually if they still exist, then delete the web/ folder.');
