'use client';

function getSections(input) {
    return input.split(')');
}

export function getParts(input, tableNameRegex = /\b\w+(?=\s*\()/) {
    const tableName = input.match(tableNameRegex);
    const attributes = `${input.split('(')[1]}`.split(')')[0];
    const repeatingGroups = attributes.match(/RG\[[^\]]*\]/g);
    const fields = attributes.split(/RG\[[^\]]*\]/g).join('').replaceAll(', ', ',').split(',');
    const orderedFields = [ fields[0], ...fields.slice(1).sort() ].filter(Boolean);

    return {
        tableName,
        orderedFields,
        repeatingGroups,
    };
}

function checkRegex(regex) {
    if (!regex)
        return;

    let isValid = true;

    try {
        new RegExp(regex);
    } catch (e) {
        isValid = false;
    }

    return isValid ? regex : null;
}

function formatInput(input, withHeading, tableNameRegex) {
    const sections = getSections(input).filter(Boolean);
    const checkedRegex = checkRegex(tableNameRegex);
    let output = '';

    if (withHeading) {
        output += '|     |     |\n';
        output += '| --- | --- |\n';
    }

    sections.forEach(section => {
        const { tableName, orderedFields, repeatingGroups } = getParts(section, checkedRegex);

        let values = '';

        if (orderedFields && orderedFields.length)
            values += orderedFields;

        if (repeatingGroups && repeatingGroups.length)
            values += `,${repeatingGroups}`;

        values = values
            .replaceAll(',', ', ')
            .replaceAll('  ', ' ');

        output += `| ${tableName} | ${values} |\n`;
    });

    return output;
}

function cleanup(input) {
    const toRemove = [ '<p>', '</p>', '<br>', '  ' ];
    let string = input.replaceAll(' ', ''); // spaces will be placed back in later

    toRemove.forEach(item => string = string.replaceAll(item, ''));

    return string
        .replaceAll(',</strong>', '</strong>,')
        .replaceAll(',</u>', '</u>,')
        .replaceAll(',</b>', '</b>,')
        .replaceAll(',</i>', '</i>,')
        .replaceAll('ë', 'e');
}

function getFormattedOutput({ input, withHeading = false, tableNameRegex }) {
    if (!input)
        return;

    return formatInput(cleanup(input), withHeading, tableNameRegex);
}

export default getFormattedOutput;
