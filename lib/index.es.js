#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import downloadGitRepo from 'download-git-repo';
import ora from 'ora';
import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var installPackages = function (loadTool, cwd, spinner) {
    var toolMap = {
        npm: 'npm',
        cnpm: 'cnpm',
        yarn: 'yarn',
        pnpm: 'pnpm'
    };
    var spawnStu = spawn(toolMap[loadTool], ['install'], { cwd: cwd });
    spawnStu.on('close', function (code) {
        spinner.succeed('npm load ends');
        console.log("child_process exits, exit code is: ".concat(code));
    });
};
var getProjectRalateInfo = function (projectName) { return __awaiter(void 0, void 0, void 0, function () {
    var inquirerOpts, res, currentPath, spinner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inquirerOpts = [
                    {
                        type: 'list',
                        message: 'choose Vue version',
                        name: 'vueVersion',
                        choices: [
                            'Vue2',
                            'Vue3'
                        ]
                    },
                    {
                        type: 'list',
                        message: 'choose version of pack tool',
                        name: 'packVersion',
                        choices: [
                            'webpack5',
                            'Vite'
                        ]
                    },
                    {
                        type: 'list',
                        message: 'Please choose version of download tool',
                        name: 'download_tool',
                        choices: [
                            'npm',
                            'cnpm',
                            'yarn',
                            'pnpm'
                        ]
                    }
                ];
                return [4 /*yield*/, inquirer.prompt(inquirerOpts)];
            case 1:
                res = _a.sent();
                currentPath = process.cwd();
                spinner = ora('start to load git-repo').start();
                return [4 /*yield*/, downloadGitRepo('github:yating291018/Bvue-template', currentPath + '/temp/', function (err) {
                        if (!err) {
                            spinner.succeed('git-load is successful');
                            var npmSpinner = ora('start to load packages').start();
                            installPackages(res.download_tool, currentPath + '/temp/', npmSpinner);
                            return false;
                        }
                        console.log('git-load is error', err);
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };

var filenameNew = fileURLToPath(import.meta.url);
console.log('filenameNew', filenameNew);
var dirname = path.dirname(filenameNew);
var createPage = function (pageType, pageName) { return __awaiter(void 0, void 0, void 0, function () {
    var fileContent, currentPath, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fs.readFileSync(path.resolve(dirname, '../template/vue2Template.vue'))];
            case 1:
                fileContent = _a.sent();
                currentPath = process.cwd();
                // console.log('currentPath', currentPath)
                return [4 /*yield*/, fs.writeFileSync(path.resolve(currentPath, pageName + '.vue'), fileContent.toString())];
            case 2:
                // console.log('currentPath', currentPath)
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                throw e_1;
            case 4: return [2 /*return*/];
        }
    });
}); };

// import pkg from '../package.json'
var program = new Command();
program.version('0.0.1');
program.option('create', '-c', 'write the name of project and then begin to create your project');
program.on('--help', function () {
    console.log('-----');
});
program.command('create <projectName>')
    .action(function (projectName, opts) {
    console.log('projectName', projectName);
    getProjectRalateInfo();
});
program.command('createPage <t> <pageName>')
    // .option('-t', '--type', 'set a name of single page')
    .action(function (type, pageName) {
    console.log('type', type, pageName);
    createPage(type, pageName);
});
program.parse(process.argv);
