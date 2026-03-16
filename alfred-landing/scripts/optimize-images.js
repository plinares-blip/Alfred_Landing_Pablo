const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public/images');
const COMPONENTS_DIR = path.join(__dirname, '../components');
const APP_DIR = path.join(__dirname, '../app');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
            // Check file size. If > 500KB, let's optimize it aggressively.
            if (stat.size > 200 * 1024) {
                const ext = path.extname(file);
                const basename = path.basename(file, ext);
                const webpPath = path.join(dir, `${basename}.webp`);

                console.log(`Optimizing ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

                try {
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 6 })
                        .toFile(webpPath);

                    // Delete original
                    fs.unlinkSync(fullPath);
                    console.log(`  -> Saved as ${basename}.webp and deleted original.`);

                    // Now, we need to find and replace this string in the codebase.
                    // The old reference was e.g. "/images/key-visuals/kvPersonas.png"
                    // We just need to replace the exact filename if it exists in the codebase.
                    // Instead of full paths, replacing just the file name should work 99% of the time.
                    const oldName = file;
                    const newName = `${basename}.webp`;

                    replaceInCodebase(oldName, newName);

                } catch (e) {
                    console.error(`Failed to optimize ${file}: `, e);
                }
            }
        }
    }
}

function replaceInCodebase(oldStr, newStr) {
    // Escape dots
    const safeOld = oldStr.replace(/\./g, '\\.');
    // Run sed command on Mac
    try {
        execSync(`find ${COMPONENTS_DIR} ${APP_DIR} -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/${safeOld}/${newStr}/g'`);
        console.log(`  -> Updated codebase references from ${oldStr} to ${newStr}`);
    } catch (e) {
        console.log(`  -> Could not run sed for ${oldStr}`);
    }
}

async function main() {
    console.log('Starting image optimization...');
    await processDirectory(PUBLIC_DIR);
    console.log('Done!');
}

main();
