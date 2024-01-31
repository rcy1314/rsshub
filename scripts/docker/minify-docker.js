/* eslint-disable no-console */
const fs = require('fs-extra');
const path = require('path');
const { nodeFileTrace } = require('@vercel/nft');
// !!! if any new dependencies are added, update the Dockerfile !!!

const projectRoot = path.resolve(process.env.PROJECT_ROOT || path.join(__dirname, '../..'));
const resultFolder = path.join(projectRoot, 'app-minimal');
const files = ['lib/index.js', 'api/vercel.js'].map((file) => path.join(projectRoot, file));

(async () => {
    console.log('Start analyzing, project root:', projectRoot);
    const { fileList: fileSet } = await nodeFileTrace(files, {
        base: projectRoot,
    });
    let fileList = [...fileSet];
    console.log('Total touchable files:', fileList.length);
    fileList = fileList.filter((file) => file.startsWith('node_modules/')); // only need node_modules
    console.log('Total files need to be copied (touchable files in node_modules/):', fileList.length);
    console.log('Start copying files, destination:', resultFolder);
    try {
        console.log('Start copying files, destination:', resultFolder);
        return Promise.all(fileList.map((e) => fs.copy(path.join(projectRoot, e), path.join(resultFolder, e))));
    } catch (error) {
        console.error('Error occurred while copying files:', error);
        process.exit(1);
    }
})().catch((error) => {
    console.error('Error occurred during minification:', error);
    process.exit(1);
    console.error(error, error.stack);
    process.exit(1);
});
