'use client';

function getSections(input) {
    return input.split(')');
}

export function getParts(input, titleRegex = /\b\w+(?=\s*\()/) {
    const title = input.match(titleRegex);
    const attributes = `${input.split('(')[1]}`.split(')')[0];
    const repeatingGroups = attributes.match(/RG\[[^\]]*\]/g);
    const fields = attributes.split(/RG\[[^\]]*\]/g).join('').replaceAll(', ', ',').split(',');
    const orderedFields = [ fields[0], ...fields.slice(1).sort() ].filter(Boolean);

    return {
        title,
        orderedFields,
        repeatingGroups,
    };
}

function formatInput(input, withHeading, titleRegex) {
    const sections = getSections(input).filter(Boolean);
    let output = '';

    if (withHeading)
        output += '|     |     |\n';

    output += '| --- | --- |\n';

    sections.forEach(section => {
        const { title, orderedFields, repeatingGroups } = getParts(section, titleRegex);

        let values = '';

        if (orderedFields && orderedFields.length)
            values += orderedFields;

        if (repeatingGroups && repeatingGroups.length)
            values += `,${repeatingGroups}`;

        values = values
            .replaceAll(',', ', ')
            .replaceAll('  ', ' ');

        output += `| ${title} | ${values} |\n`;
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

function getFormattedOutput({ input, withHeading = false, titleRegex }) {
    if (!input)
        return;

    return formatInput(cleanup(input), withHeading, titleRegex);
}

export default getFormattedOutput;
