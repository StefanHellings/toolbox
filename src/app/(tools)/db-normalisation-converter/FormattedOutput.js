'use client';

function getSections(input) {
    const sections = [];

    return sections;
}

export function getParts(input) {
    const string = input
        .replaceAll('<p>', '')
        .replaceAll('</p>', '');

    const title = string.split('(')[0];
    const attributes = `${string.split('(')[1]}`.split(')')[0];
    const repeatingGroups = attributes.match(/RG\[[^\]]*\]/g);
    const fields = attributes.split(/RG\[[^\]]*\]/g).join('').replaceAll(', ', ',').split(',');
    const orderedFields = [ fields[0], ...fields.slice(1).sort() ].filter(Boolean);

    return {
        title,
        orderedFields,
        repeatingGroups,
    };
}

function formatInput(input) {
    const { title, orderedFields, repeatingGroups } = getParts(input);

    let values = '';
    let output = '';

    if (orderedFields && orderedFields.length)
        values += orderedFields;

    if (repeatingGroups && repeatingGroups.length)
        values += `, ${repeatingGroups}`;

    output += '|     |     |\n';
    output += '| --- | --- |\n';
    output += `| ${title} | ${values} |`;

    return output;
}

function getFormattedOutput(input) {
    if (input)
        return formatInput(input);
}

export default getFormattedOutput;
