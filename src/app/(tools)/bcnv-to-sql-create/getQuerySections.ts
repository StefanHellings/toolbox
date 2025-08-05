'use client';

export interface QuerySectionObject {
    tableName: string;
    attributes: Array<string>;
    primaryKeys: Array<string>;
    foreignKeys: Array<string>;
    uniqueIndexes: Array<string>;
}

let querySections:Array<QuerySectionObject> = [];

const removeParentheses = (input: string) => input.replaceAll(/[()]/gm, '');
const removeParagraphs = (input: string) => input.replaceAll(/<p>?|<\/p>?/gm, '');
const removeTableName = (input: string) => input.match(/\(.[^)]+\)/gm)[0];
const removeTags = (input: string) => input.replaceAll(/<\w+>?|<\/\w+>?/g, '').trim();

const getTables = (input: string) => input.match(/.[^)]+\)/gm);
const getTableName = (table: string) => table.split('(')[0].trim();
const getAttributes = (table: string) => removeParentheses(removeTableName(table)).split(',') || [];
const getPrimaryKeys = (table: string) => table.match(/<u>((?:<\w+>)?\w+(?:<\/\w+>)?)<\/u>/gm) || [];
const getForeignKeys = (table: string) => table.match(/<strong>((?:<\w+>)?\w+(?:<\/\w+>)?)<\/strong>/gm) || [];

// TODO: Match the unique indexes with the correct table
// const getUniqueIndexes = (table: string, uniqueIndexes: string);
const getUniqueIndexes = (table: string, uniqueIndexes: string) => {
    const params = [ table, uniqueIndexes ];

    return params;
};

function getQuerySections(attributes: string, uniqueIndexes: string) {
    if (!attributes)
        return;

    querySections = []; // So each input update doesn't add to the array
    const tables = getTables(removeParagraphs(attributes));

    tables.forEach(table => {
        querySections.push({
            'tableName': getTableName(table),
            'attributes': getAttributes(table).map((item: string) => removeTags(item)),
            'primaryKeys': getPrimaryKeys(table).map((item: string) => removeTags(item)),
            'foreignKeys': getForeignKeys(table).map((item: string) => removeTags(item)),
            'uniqueIndexes': getUniqueIndexes(table, uniqueIndexes),
        });
    });

    return querySections;
}

export default getQuerySections;
