import { access, mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import * as ejs from 'ejs';
import chalk from 'chalk';

export interface TemplateData {
    dayName: string;
    dayNumber: number;
    year: number;
}

const templateFiles = [
    'scripts/templates/index.template.ejs',
    'scripts/templates/main.template.ejs',
    'scripts/templates/part1.template.ejs',
    'scripts/templates/part2.template.ejs',
    'scripts/templates/readme.template.ejs',
    'scripts/templates/day.test.template.ejs',
];

const targetFiles = (dayName: string, year: number): string[] => [
    `src/${year}/${dayName}/index.ts`,
    `src/${year}/${dayName}/main.ts`,
    `src/${year}/${dayName}/part1.ts`,
    `src/${year}/${dayName}/part2.ts`,
    `src/${year}/${dayName}/README.md`,
    `test/${year}/${dayName}.test.ts`,
];

const targetInput = (dayName: string, year: number): string =>
    `src/${year}/${dayName}/resources/input.txt`;

const zip = (a: string[], b: string[]): string[][] =>
    a.map((v, i) => [v, b[i]]);

const pipeAsync =
    (...funcs: CallableFunction[]) =>
        (input: any): void =>
            funcs.reduce(
                async (v: any, func: CallableFunction) => func(await v),
                input
            );

// check it the file exists or not
const filePathExists = async (file: string): Promise<boolean> =>
    await access(file)
        .then(() => true)
        .catch(() => false);

// read the template file
const readTemplate = async (templateFile: string): Promise<string> => {
    return readFile(templateFile, 'utf8');
};

// rendered the template with the data
const renderTemplate = (templateData: TemplateData) => {
    return (content: string): Promise<string> => {
        return ejs.render(content, { data: templateData }, { async: true });
    };
};

// create the file with the rendered content
const createFile = (filename: string) => {
    return async (content: string): Promise<void> => {
        const fileExists = await filePathExists(filename);

        if (fileExists == true) {
            console.log(
                chalk.yellow('* ignoring ') + `${filename} already exists`
            );
            return;
        }

        try {
            const pathname = path.dirname(filename);
            const pathExist = await filePathExists(pathname);

            if (pathExist == false) {
                await mkdir(pathname, { recursive: true });
            }
        } catch (err) {
            console.error(chalk.red('Error creating directory:'));
            if (err instanceof Error) {
                console.error(`  Message: ${err.message}`);
            } else {
                console.error(err);
            }
            throw err;
        }

        await writeFile(filename, content);
        console.log(chalk.green('* creating ') + `${filename}`);
    };
};

// return the default year
const defaultYear = (): number => {
    const today = new Date();
    const year =
        today.getMonth() == 11 ? today.getFullYear() : today.getFullYear() - 1;

    return year;
};

// get the environment data
const getEnv = (): any => {
    let year: string | number = process.env.AOC_YEAR || '';

    year = year == '' ? defaultYear() : parseInt(year);

    const session = process.env.AOC_SESSION || '';

    return { year: year, session: session };
};

// fetch the puzzle input
const getInput = async (
    year: number,
    day: number,
    session: string
): Promise<string> => {
    if (session != '') {
        const url = `https://adventofcode.com/${year}/day/${day}/input`;
        const headers = { cookie: `session=${session}` };

        try {
            const content = await fetch(url, { headers: headers });

            if (content.status == 200) {
                return (await content.text()).trim();
            } else {
                console.warn(
                    chalk.yellow(
                        `Warning: Failed to fetch input (HTTP ${content.status}). Please add input manually.`
                    )
                );
                return '';
            }
        } catch (err) {
            console.error(chalk.red('Error fetching puzzle input:'));
            if (err instanceof Error) {
                console.error(`  Message: ${err.message}`);
            } else {
                console.error(err);
            }
            return '';
        }
    }

    return '';
};

// run the main routine
const main = async (): Promise<void> => {
    dotenv.config();

    // check if exists one only argument
    const dayName = process.argv[2];

    if (process.argv.length != 3) {
        console.log('--- `npm run gen` needs one only argument ---');
        return;
    }

    // check the argument string format
    const re = /(?<=day)\d+(?!\w)/;
    const dayArray = re.exec(dayName) || [];
    const dayNumber = dayArray.length == 1 ? parseInt(dayArray[0]) : 0;

    if (dayNumber == 0) {
        console.log('--- The argument must be `day + NUM` (e.g. day01) ---');
        return;
    }

    const { year, session } = getEnv();
    const contentInput = await getInput(year, dayNumber, session);

    const data: TemplateData = {
        dayName: dayName,
        dayNumber: dayNumber,
        year: year,
    };

    try {
        // create the input file
        await createFile(targetInput(dayName, year))(contentInput);

        // create and render the template files
        zip(templateFiles, targetFiles(dayName, year)).forEach((filePaths) => {
            pipeAsync(
                readTemplate,
                renderTemplate(data),
                createFile(filePaths[1])
            )(filePaths[0]);
        });
    } catch (err) {
        console.error(chalk.red('\nError generating files:'));
        if (err instanceof Error) {
            console.error(`  Message: ${err.message}`);
            if (err.stack) {
                console.error(`  Stack:\n${err.stack}`);
            }
        } else {
            console.error(err);
        }
        process.exit(1);
    }
};

main();
