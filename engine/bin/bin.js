#! /usr/bin/env node
import webpack from "webpack";
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.cjs';
import open from 'open';
import fs from 'fs';
import path from 'path';
import chalk from "chalk";

const port = 8080;
const templatePath = 'node_modules/state-game-engine/bin/template';

let mode = process.argv[2];
let modes = {
    run: () => {
        const server = new WebpackDevServer(webpack(webpackConfig));
        server.listen(port, 'localhost', (err) => {
            if (err) console.log(err);
            console.log('WebpackDevServer listening at localhost:', port);
            open(`http://localhost:${port}/`);
        });
    },

    build: () => {
        webpack(webpackConfig, (err, stats) => {
            if (err) return; console.error(err);
            console.log(stats.toString({ colors: true }));
        });
    },

    setup: () => {
        // if package.json already exists, save it
        let packageJson;
        try { packageJson = JSON.parse(fs.readFileSync('package.json').toString()) } catch {
            console.log(chalk.yellow(chalk.bold('package.json') + ' not found. Creating the default one...'));
        }

        // create required files & folders from the template
        console.log('Creating directories from template...');
        copyFolderRecursiveSync(templatePath, '.');
        console.log(chalk.green(`\n\nStateEngine is ready! Now run ${chalk.bold('npm install')} to install the required components`))
    
        // restore package.json
        if(packageJson) {
            if(!packageJson.dependencies) packageJson.dependencies = {};
            packageJson.dependencies["@babel/core"] = "^7.17.5";
            packageJson.dependencies["@babel/plugin-transform-react-jsx"] = "^7.17.3";
            fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        }
    }
}

if (!modes[mode]) {
    console.error(
        chalk.red('\nPlease specify a mode you want to run this command in!\n\n') +
        `Availible modes: ${chalk.bold(chalk.cyan('setup'))}, ${chalk.bold(chalk.cyan('run'))}, ${chalk.bold(chalk.cyan('build'))}\n\n` +
        'Example: ' + chalk.bold(chalk.green('npx state-game-engine run\n'))
    );
} else {
    modes[mode]();
}

function copyFileSync (source, target) {

    let targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
        targetFile = path.join(target, path.basename(source));
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync (source, target, recursive) {
    let files = [];

    // Check if folder needs to be created or integrated
    let targetFolder = target;
    if(recursive) targetFolder = path.join(target, path.basename(source));

    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(file => {
            let curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder, true);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        } );
    }
}