'use client';

function getSections(input: string) {
    return input.split(')');
}

function getParts(input = '', tableNameRegex = /\b\w+(?=\s*\()/) {
    const tableName = input.match(tableNameRegex);
    const attributes = `${input.split('(')[1]}`.split(')')[0];
    const repeatingGroups = attributes.match(/RG\[[^\]]*\]/g);
    const fields = attributes.split(/RG\[[^\]]*\]/g).join('').replaceAll(', ', ',').split(',');
    const orderedFields = [ fields[0], ...fields.slice(1).sort() ].filter(Boolean);
    const repeatingGroupsLength = repeatingGroups?.length;

    // Count the amount of fields inside each repeating group and add them all together
    let repeatingGroupFieldsLength = 0;

    if (repeatingGroups?.length) {
        repeatingGroupFieldsLength = repeatingGroups.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue
                    .replaceAll('RG[', '')
                    .replaceAll(']', '')
                    .split(',')
                    .filter(Boolean)
                    .length;
            },
            0,
        );
    }

    return {
        tableName,
        orderedFields,
        repeatingGroups,
        repeatingGroupsLength,
        nrOfFields: orderedFields.length + repeatingGroupFieldsLength,
    };
}

function checkRegex(regex: RegExp) {
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

function formatInput(input: string, withHeading: boolean, tableNameRegex: RegExp) {
    const sections = getSections(input).filter(Boolean);
    const orderedSections = [ sections[0], ...sections.slice(1).sort() ];
    const checkedRegex = checkRegex(tableNameRegex);
    const nrOfTables = orderedSections.length;
    const nrOfFields = orderedSections.reduce((accumulator, currentValue) => accumulator + getParts(currentValue, checkedRegex).nrOfFields, 0);
    let output = '';

    if (withHeading) {
        output += `| Table (${nrOfTables}) | Fields (${nrOfFields}) |\n`;
        output += '| --- | --- |\n';
    }

    orderedSections.forEach(section => {
        const { tableName, orderedFields, repeatingGroups, repeatingGroupsLength, nrOfFields } = getParts(section, checkedRegex);

        let values = '';
        let metaData = `${nrOfFields}`;

        if (repeatingGroupsLength)
            metaData += ` - RG: ${repeatingGroupsLength}`;

        if (orderedFields && orderedFields.length)
            values += orderedFields;

        if (repeatingGroups && repeatingGroups.length)
            values += `,${repeatingGroups}`;

        values = values
            .replaceAll(',', ', ')
            .replaceAll('  ', ' ');

        output += `| ${tableName} (${metaData}) | ${values} |\n`;
    });

    return output;
}

function cleanup(input: string) {
    const toRemove = [
        // RegExp arguments
        // eslint-disable-next-line no-irregular-whitespace
        /\u00a0/g, // ' ' non-breaking space
        /\u2019/g, // '’' tick
        /\u0060/g, // '`' backtick

        // HTML tags
        '<p>',
        '</p>',
        '<br>',
    ];

    const toReplace = [
        [ ',</strong>', '</strong>,' ],
        [ ',</u>', '</u>,' ],
        [ ',</b>', '</b>,' ],
        [ ',</i>', '</i>,' ],
        [ ' ', '' ], // spaces will be placed back in later
        [ 'ë', 'e' ],
    ];

    toRemove.forEach(item => input = input.replaceAll(item, ''));
    toReplace.forEach(([ from, to ]) => input = input.replaceAll(from, to));

    return input;
}

type UnformattedInput = {
    input: string;
    withHeading?: boolean;
    tableNameRegex?: RegExp;
};

function getFormattedOutput({ input = '', withHeading = false, tableNameRegex }: UnformattedInput) {
    if (!input)
        return;

    return formatInput(cleanup(input), withHeading, tableNameRegex);
}

export default getFormattedOutput;
