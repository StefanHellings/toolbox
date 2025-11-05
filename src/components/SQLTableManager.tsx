'use client';
import * as React from 'react';

import { useState } from 'react';
import { Trash2, Key, Link, Plus } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import WithTooltip from '@/components/WithTooltip';

export type Attribute = {
    id: number
    name: string
    type: string
    isPrimaryKey: boolean
    isForeignKey: boolean
    isUnique: boolean
    isNotNull: boolean
    isAutoIncrement: boolean
    length?: number
}

const dataTypes = [
    'INT',
    'BIGINT',
    'TINYINT',
    'VARCHAR',
    'TEXT',
    'TINYTEXT',
    'BOOLEAN',
    'DATE',
    'DATETIME',
    'TIMESTAMP',
    'FLOAT',
    'DOUBLE',
    'DECIMAL',
    'JSON',
];

const SQLTableManager = props => {
    const { primaryKeys, foreignKeys, uniqueIndexes, attributes: all } = props;
    const allAttributes = [ ...new Set<string>([ ...primaryKeys, ...foreignKeys, ...all ]) ]
        .map((item: string, index: number) => ({
            id: index,
            name: item,
            type: primaryKeys.includes(item) ? 'INT' : 'VARCHAR',
            isPrimaryKey: primaryKeys.includes(item),
            isForeignKey: foreignKeys.includes(item),
            isUnique: uniqueIndexes.includes(item),
            isNotNull: primaryKeys.includes(item) || foreignKeys.includes(item) || uniqueIndexes.includes(item),
            isAutoIncrement: primaryKeys.includes(item),
            ...(!primaryKeys.includes(item) && { length: 255 }),
        }));

    const [ tableName, setTableName ] = useState(props?.tableName || 'new_table');
    const [ attributes, setAttributes ] = useState<Attribute[]>(allAttributes || [
        {
            id: 1,
            name: 'id',
            type: 'INT',
            isPrimaryKey: true,
            isForeignKey: false,
            isUnique: true,
            isNotNull: true,
            isAutoIncrement: true,
        },
    ]);

    const addAttribute = () => {
        const newId = (attributes.length + 1);

        setAttributes([
            ...attributes,
            {
                id: newId,
                name: `column_${newId}`,
                type: 'VARCHAR',
                isPrimaryKey: false,
                isForeignKey: false,
                isUnique: false,
                isNotNull: false,
                isAutoIncrement: false,
            },
        ]);
    };

    const removeAttribute = (id: number) => setAttributes(attributes.filter((attr) => attr.id !== id));

    const updateAttribute = (id: number, field: keyof Attribute, value: string|number|boolean) => setAttributes(
        attributes.map(attr => {
            if (attr.id !== id)
                return { ...attr, [field]: value };

            // If setting a new primary key, unset any existing ones
            if (field === 'isPrimaryKey' && value === true)
                return { ...attr, [field]: value, isUnique: true, isNotNull: true };

            // If setting a new primary key, unset any existing ones
            if (field === 'isPrimaryKey' && value === true && attr.isPrimaryKey)
                return { ...attr, isPrimaryKey: false };

            return attr;
        }),
    );

    const AttrNameInput = (props: Attribute) => (
        <div className="col-span-2">
            <Input
                value={props.name}
                onChange={e => updateAttribute(props.id, 'name', e.target.value)}
                className="h-9" />
        </div>
    );

    const AttrTypeInput = (props: Attribute) => (
        <div className="col-span-3 flex gap-2">
            <Select value={props.type} onValueChange={(value) => updateAttribute(props.id, 'type', value)}>
                <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    {dataTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Additional input for the length of text inputs */}
            {(props.type === 'VARCHAR' || props.type === 'CHAR') && (
                <Input
                    value={props.length || ''}
                    onChange={(e) => updateAttribute(props.id, 'length', e.target.value)}
                    placeholder="Length"
                    className="w-20 h-9" />
            )}
        </div>
    );

    return (
        <div className={props.className}>
            <CardContent className="grid gap-3 p-0 w-full">
                {/* Table Name Input */}
                <div className="flex items-center gap-2">
                    <Input
                        id="table-name"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}/>
                </div>

                {/* Attributes */}
                <div className="space-y-1">
                    {attributes.map((attr) => (
                        <div key={attr.id} className="grid grid-cols-12 gap-5 items-center">
                            {/* Attribute Name */}
                            {AttrNameInput(attr)}

                            {/* Attribute Type selector */}
                            {AttrTypeInput(attr)}

                            {/* Attribute Constraints */}
                            <div className="col-span-6 flex flex-wrap gap-x-4 gap-y-2">
                                {/* Primary Key */}
                                <WithTooltip tooltip="Primary Key">
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox
                                            checked={attr.isPrimaryKey}
                                            onCheckedChange={(checked) => updateAttribute(attr.id, 'isPrimaryKey', checked)}
                                            id={`pk-${attr.id}`}/>
                                        <Label htmlFor={`pk-${attr.id}`} className="flex items-center gap-1 cursor-pointer text-xs">
                                            <Key className="h-3.5 w-3.5" />
                                            PK
                                        </Label>
                                    </div>
                                </WithTooltip>

                                {/* Foreign Key */}
                                <WithTooltip tooltip="Foreign Key">
                                    <div className="flex items-center gap-1.5">
                                        <Checkbox
                                            checked={attr.isForeignKey}
                                            onCheckedChange={(checked) => updateAttribute(attr.id, 'isForeignKey', checked)}
                                            id={`fk-${attr.id}`}/>
                                        <Label htmlFor={`fk-${attr.id}`} className="flex items-center gap-1 cursor-pointer text-xs">
                                            <Link className="h-3.5 w-3.5" />
                                            FK
                                        </Label>
                                    </div>
                                </WithTooltip>

                                {/* Is Unique */}
                                <div className="flex items-center gap-1.5">
                                    <Checkbox
                                        checked={attr.isUnique}
                                        onCheckedChange={(checked) => updateAttribute(attr.id, 'isUnique', checked)}
                                        id={`unique-${attr.id}`}/>
                                    <Label htmlFor={`unique-${attr.id}`} className="cursor-pointer text-xs">
                                        Unique
                                    </Label>
                                </div>

                                {/* Not Null */}
                                <div className="flex items-center gap-1.5">
                                    <Checkbox
                                        checked={attr.isNotNull}
                                        onCheckedChange={(checked) => updateAttribute(attr.id, 'isNotNull', checked)}
                                        id={`notnull-${attr.id}`}/>
                                    <Label htmlFor={`notnull-${attr.id}`} className="cursor-pointer text-xs">
                                        Not Null
                                    </Label>
                                </div>

                                {/* Auto Incrementing */}
                                <div className="flex items-center gap-1.5">
                                    <Checkbox
                                        checked={attr.isAutoIncrement}
                                        onCheckedChange={(checked) => updateAttribute(attr.id, 'isAutoIncrement', checked)}
                                        id={`autoinc-${attr.id}`}
                                        disabled={![ 'INT', 'BIGINT', 'TINYINT' ].includes(attr.type)}/>
                                    <Label
                                        htmlFor={`autoinc-${attr.id}`}
                                        className={`cursor-pointer text-xs ${[ 'INT', 'BIGINT', 'TINYINT' ].includes(attr.type) ? '' : 'text-muted-foreground'}`}>
                                        Auto Inc
                                    </Label>
                                </div>
                            </div>

                            <div className="col-span-1 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeAttribute(attr.id)}
                                    disabled={attributes.length === 1}
                                    className="h-8 w-8 text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <Button onClick={addAttribute} variant="secondary" size="icon" className="h-6 w-6">
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>

                {/* Single SQL Query Preview */}
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className='border-0'>
                        <AccordionTrigger className='text-sm p-1'>SQL Preview</AccordionTrigger>
                        <AccordionContent>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                                {`CREATE TABLE ${tableName} (\n  `}
                                {
                                    `${attributes
                                        .map((attr) => {
                                            let line = `${attr.name} ${attr.type}`;

                                            if (attr.type === 'VARCHAR' || attr.type === 'CHAR')
                                                line += attr.length ? `(${attr.length})` : '(255)';
                                            if (attr.isNotNull) line += ' NOT NULL';
                                            if (attr.isAutoIncrement) line += ' AUTO_INCREMENT';
                                            if (attr.isPrimaryKey) line += ' PRIMARY KEY';
                                            if (attr.isUnique && !attr.isPrimaryKey) line += ' UNIQUE';
                                            return line;
                                        })
                                        .join(',\n  ')
                                    }`
                                }
                                {'\n});'}
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </div>
    );
};

export default SQLTableManager;
