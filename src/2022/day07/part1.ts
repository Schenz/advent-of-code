// Advent of Code - Day 7 - Part One
let currentPath = '';
const filesystem: any = {
    '': {
        _totalSize: 0,
    },
};

export const part1 = (input: string[]): number => {
    let sum = 0;

    input.forEach((line, last) => {
        if (line.startsWith('$')) {
            const commandAndParams = line.substring(2).split(' ');

            // command line interpreter
            interpretCommandLine(commandAndParams);
        } else {
            interpretLs(line);
        }

        if (last) {
            const matchingDirectories: DirSize[] = [];

            findDirsSmallerThanOrEqual('/', matchingDirectories, 100000);
            sum = matchingDirectories.reduce(
                (sum, match) => (sum += match.totalSize),
                0
            );
        }
    });

    return sum;
};

const interpretCommandLine = (commandAndParams: string[]) => {
    if (commandAndParams[0] === 'cd') {
        if (commandAndParams[1] === '/') {
            currentPath = '/';
            return;
        }

        if (commandAndParams[1] === '..') {
            currentPath = currentPath.substring(
                0,
                currentPath.lastIndexOf('/')
            );
            return;
        }

        if (currentPath === '/') {
            currentPath = '';
        }

        currentPath += '/' + commandAndParams[1];
    } else if (commandAndParams[0] === 'ls') {
        // NOP
    }
};

const cd = (path: string) => {
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 2);
    }

    const segments = path.split('/');

    let currentPathObject = filesystem[segments[0]];

    for (let i = 1; i < segments.length; i++) {
        currentPathObject = currentPathObject[segments[i]];
    }

    return currentPathObject;
};

const cdUp = (path: string): string | null => {
    if (path.length === 0 || path === '/') {
        return null;
    }

    return path.substring(0, path.lastIndexOf('/'));
};

const interpretLs = (line: string) => {
    const currentPathObject = cd(currentPath);

    if (line.startsWith('dir')) {
        const dirName = line.split(' ')[1];

        currentPathObject[dirName] = {
            _totalSize: 0,
        };
        return;
    }

    const fileInfoParts = line.split(' ');
    const fileSize = parseInt(fileInfoParts[0]);

    currentPathObject[fileInfoParts[1]] = fileSize;
    currentPathObject['_totalSize'] += fileSize;
    let path = cdUp(currentPath);

    while (path !== null) {
        cd(path)['_totalSize'] += fileSize;
        path = cdUp(path);
    }
};

interface DirSize {
    dirName: string;
    totalSize: number;
}

const findDirsSmallerThanOrEqual = (
    path: string,
    matchingDirectories: DirSize[],
    maxSize: number
) => {
    const currentPathObject = cd(path);

    if (currentPathObject['_totalSize'] <= maxSize) {
        matchingDirectories.push({
            dirName: path.substring(path.lastIndexOf('/')),
            totalSize: currentPathObject['_totalSize'],
        });
    }

    if (path === '/') {
        path = '';
    }

    Object.entries(currentPathObject).forEach(([name, entry]) => {
        if (typeof entry === 'object') {
            findDirsSmallerThanOrEqual(
                path + '/' + name,
                matchingDirectories,
                maxSize
            );
        }
    });
};
