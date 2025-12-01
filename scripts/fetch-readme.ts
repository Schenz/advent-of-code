import { writeFile, access } from 'fs/promises';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

interface FetchOptions {
    year: number;
    day: number;
    session: string;
}

// Extract article content from HTML
const extractArticleContent = (html: string): string => {
    // Find all <article> tags and extract everything inside them
    const articleMatches = html.match(/<article[^>]*>([\s\S]*?)<\/article>/g);

    if (!articleMatches || articleMatches.length === 0) {
        throw new Error('Could not find puzzle content on the page');
    }

    // Combine all articles (Part 1 and Part 2 if available)
    return articleMatches.map(match => {
        const content = match.match(/<article[^>]*>([\s\S]*?)<\/article>/);
        return content ? content[1] : '';
    }).join('\n\n');
};// HTML to Markdown converter for AoC puzzle descriptions
const htmlToMarkdown = (html: string): string => {
    let markdown = '';
    let content = extractArticleContent(html);

    // Remove script and style tags
    content = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    content = content.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    // Process code blocks (pre > code) BEFORE inline code
    content = content.replace(/<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi, (match, code) => {
        return '```\n' + code + '\n```\n\n';
    });

    // Alternative: <pre> blocks without <code> wrapper
    content = content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match, code) => {
        return '```\n' + code + '\n```\n\n';
    });

    // Process headings (h2, h3, h4, etc.)
    content = content.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
    content = content.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
    content = content.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
    content = content.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n');

    // Process paragraphs
    content = content.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

    // Process inline code (after pre/code blocks)
    content = content.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

    // Process lists
    content = content.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, items) => {
        const listItems = items.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
        return listItems.map((item: string) => item.replace(/<li[^>]*>([\s\S]*?)<\/li>/i, '- $1')).join('\n') + '\n\n';
    });

    content = content.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, items) => {
        const listItems = items.match(/<li[^>]*>([\s\S]*?)<\/li>/gi) || [];
        return listItems.map((item: string, idx: number) => item.replace(/<li[^>]*>([\s\S]*?)<\/li>/i, `${idx + 1}. $1`)).join('\n') + '\n\n';
    });

    // Process emphasis tags
    content = content.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '_$1_');
    content = content.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
    content = content.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
    content = content.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '_$1_');

    // Process links
    content = content.replace(/<a\s+href=["']([^"']*?)["'][^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

    // Remove remaining HTML tags (except for line breaks which we'll handle separately)
    content = content.replace(/<br\s*\/?>/gi, '\n');
    content = content.replace(/<hr\s*\/?>/gi, '\n---\n\n');
    content = content.replace(/<[^>]+>/g, '');

    // Decode HTML entities
    const decodeEntities = (str: string): string => {
        const entities: { [key: string]: string } = {
            '&nbsp;': ' ',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&amp;': '&',
        };
        return str.replace(/&[a-zA-Z]+;/g, (match) => entities[match] || match);
    };

    markdown = decodeEntities(content);

    // Clean up multiple consecutive newlines (keep max 2)
    markdown = markdown.replace(/\n\n\n+/g, '\n\n');

    // Trim whitespace
    markdown = markdown.trim();

    return markdown;
};

// Fetch the puzzle from AoC website
const fetchPuzzle = async (options: FetchOptions): Promise<string> => {
    const { year, day, session } = options;
    const url = `https://adventofcode.com/${year}/day/${day}`;

    try {
        const response = await fetch(url, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                'priority': 'u=0, i',
                'sec-ch-ua': '"Chromium";v="142", "Not_A Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0',
                'cookie': `session=${session};`,
            },
        });

        if (response.status === 404) {
            throw new Error(
                `Puzzle not found (HTTP 404). The puzzle for day ${day} may not have been released yet.`
            );
        }

        if (response.status !== 200) {
            throw new Error(
                `Failed to fetch puzzle (HTTP ${response.status}). Please check your session cookie.`
            );
        }

        const html = await response.text();
        return htmlToMarkdown(html);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Failed to fetch puzzle: ${err.message}`);
        }
        throw err;
    }
};

// File operations
const fileExists = async (filePath: string): Promise<boolean> => {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
};

// Main function
const main = async (): Promise<void> => {
    try {
        const dayName = process.argv[2];
        const year = process.argv[3] ? parseInt(process.argv[3]) : new Date().getFullYear();
        const session = process.env.AOC_SESSION || '';

        if (!dayName) {
            console.log('Usage: npm run fetch-readme <dayXX> [year]');
            console.log('Example: npm run fetch-readme day01 2025');
            return;
        }

        if (!session) {
            console.error(
                chalk.red('Error: AOC_SESSION environment variable is not set')
            );
            console.log(
                chalk.yellow(
                    'Please set AOC_SESSION in your .env file with your Advent of Code session cookie'
                )
            );
            return;
        }

        // Parse day number
        const re = /(?<=day)\d+(?!\w)/;
        const dayArray = re.exec(dayName) || [];
        const dayNumber = dayArray.length === 1 ? parseInt(dayArray[0]) : 0;

        if (dayNumber === 0) {
            console.log('--- The argument must be `day + NUM` (e.g. day01) ---');
            return;
        }

        const readmePath = `src/${year}/${dayName}/README.md`;

        const fileExists_ = await fileExists(readmePath);
        if (!fileExists_) {
            console.error(chalk.red(`Error: Directory src/${year}/${dayName} does not exist`));
            console.log(chalk.yellow('Please run `npm run gen ${dayName}` first to create the day directory'));
            return;
        }

        console.log(chalk.blue(`Fetching puzzle for ${year}/day/${dayNumber}...`));
        const markdown = await fetchPuzzle({ year, day: dayNumber, session });

        await writeFile(readmePath, markdown);
        console.log(chalk.green(`✓ Successfully created ${readmePath}`));
    } catch (err) {
        console.error(chalk.red('Error:'));
        if (err instanceof Error) {
            console.error(`  ${err.message}`);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
};

main();
