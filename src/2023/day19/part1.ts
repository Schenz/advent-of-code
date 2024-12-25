// Advent of Code - Day 19 - Part One

export type WorkflowRule = (part: Part) => string;

export type Workflow = {
    name: string;
    rules: WorkflowRule[];
};

export type Part = {
    [key: string]: number;
    x: number;
    m: number;
    a: number;
    s: number;
};

export const evaluateRule = (rule: string, part: Part): string => {
    const [condition, destination] = rule.split(':');
    const [property, operator, value] = condition.split(/([><=])/).filter(Boolean);

    switch (operator) {
        case '>':
            return part[property] > parseInt(value) ? destination : '';
        case '<':
            return part[property] < parseInt(value) ? destination : '';
        case '=':
            return part[property] === parseInt(value) ? destination : '';
        default:
            return rule;
    }
};

const processWorkflow = (workflow: Workflow, part: Part): string => {
    for (const rule of workflow.rules) {
        const destination = rule(part);

        if (destination) {
            return destination;
        }
    }
    return '';
};

const processPart = (workflows: Workflow[], part: Part): number => {
    let currentWorkflowIndex = workflows.findIndex((w) => w.name === 'in');

    while (currentWorkflowIndex < workflows.length) {
        const currentWorkflow = workflows[currentWorkflowIndex];
        const destination = processWorkflow(currentWorkflow, part);

        if (destination === 'R') {
            return 0; // Rejected
        } else if (destination === 'A') {
            return part.x + part.m + part.a + part.s; // Accepted
        } else if (destination) {
            // Move to the next workflow
            currentWorkflowIndex = workflows.findIndex((w) => w.name === destination);
        } else {
            // No rules matched, move to the next workflow
            currentWorkflowIndex++;
        }
    }

    return 0; // Default case, should not reach here
};

export const part1 = (input: string[]): number => {
    const workflows: Workflow[] = input
        .slice(
            0,
            input.findIndex((line) => line.trim() === '')
        )
        .map((line) => {
            const [name, rules] = line.split('{');
            const ruleStrings = rules.slice(0, -1).split(',');
            const workflowRules: WorkflowRule[] = ruleStrings.map((ruleString) => {
                return (part: Part) => evaluateRule(ruleString, part);
            });

            return { name, rules: workflowRules };
        });

    const parts: Part[] = input.slice(input.findIndex((line) => line.trim() === '') + 1).map((line) => {
        const match = line.match(/\d+/g);

        if (match) {
            const ratings = match.map(Number);
            // Ensure that ratings is not null before accessing its elements

            return {
                x: ratings[0] || 0,
                m: ratings[1] || 0,
                a: ratings[2] || 0,
                s: ratings[3] || 0,
            };
        } else {
            // Handle the case where there are no matches
            return {
                x: 0,
                m: 0,
                a: 0,
                s: 0,
            };
        }
    });

    const acceptedParts = parts.filter((part) => processPart(workflows, part) > 0);

    return acceptedParts.reduce((sum, part) => sum + processPart(workflows, part), 0);
};
