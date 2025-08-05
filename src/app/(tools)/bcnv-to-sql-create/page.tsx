'use client';

import { QuerySectionObject } from './getQuerySections';

import { useState } from 'react';
import Head from 'next/head';

import ToolHeader from '@/components/ToolHeader';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';

import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import SQLTableManager from '@/components/SQLTableManager';
import Icon from '@/components/Icon';

import getQuerySections from './getQuerySections';

const defaultAttributes = '<p>Cursisten ( <u>IKL</u> , familienaam , voornaam , email ) </p><p>CursistOpleidingen ( <strong><u>IKL</u></strong> , <strong><u>opleidingsId</u></strong> , opleidingstatus , startDatum , eindDatum ) </p><p>Opleidingen ( <u>opleidingsId</u> , opleidingsNaam , omschrijving , <strong>leervormId</strong> , <strong>coachId</strong> ) </p><p>Coaches ( <u>coachId</u> , familienaam , voornaam ) </p><p>Leervormen ( <u>leervormId</u> , leervorm ) </p>';
const defaultUniqueIndexes = '<p>familienaam , voornaam</p>';
const editorSettings = {
    extensions: [
        StarterKit,
        Underline,
        Bold,
    ],
    editorProps: {
        attributes: {
            class: 'flex flex-col w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-32',
        },
    },
};

type QuerySettingsProps = {
    sections: Array<QuerySectionObject>;
}

function QuerySettings(props: QuerySettingsProps) {
    const { sections } = props;

    return (
        <div>
            <div className="space-y-4">
                {sections?.map(section => <QuerySection key={section.tableName} {...section} />)}
            </div>
        </div>
    );
}

function QuerySection(props: QuerySectionObject) {
    return (
        <div className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-2">
            <SQLTableManager className="border-0" {...props} />
        </div>
    );
}

export default function DBNormalisationConverter() {
    const [ attributesInput, setAttributesInput ] = useState('');
    const [ uniqueIndexesInput, setUniqueIndexesInput ] = useState('');
    const [ isCopied, setIsCopied ] = useState(false);

    const attributesInputHandler = (value: string) => setAttributesInput(value);
    const uniqueIndexesInputHandler = (value: string) => setUniqueIndexesInput(value);
    const attributesEditor = useEditor({
        ...editorSettings,
        content: attributesInput || defaultAttributes,
        onUpdate: ({ editor }) => {
            setAttributesInput(editor.getHTML());
        },
    });
    const uniqueIndexesEditor = useEditor({
        ...editorSettings,
        content: uniqueIndexesInput || defaultUniqueIndexes,
        onUpdate: ({ editor }) => {
            setUniqueIndexesInput(editor.getHTML());
        },
    });

    const querySections = getQuerySections(attributesInput, uniqueIndexesInput);
    const generatedQuery = '';

    const copyHandler = () => {
        navigator.clipboard.writeText(generatedQuery);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    return (
        <>
            <Head>
                <title>BCNV to SQL CREATE Query converter</title>
            </Head>
            <ToolHeader title="BCNV to SQL CREATE" />
            <Card className="border-0">
                <CardContent className="grid gap-8 p-0">
                    <>
                        {/* Input */}
                        <div className="grid gap-3">
                            <Label htmlFor="attributes" className="flex justify-between">Attributes:</Label>
                            <EditorContent
                                id="attributes"
                                editor={attributesEditor}
                                value={attributesInput}
                                onChange={() => attributesInputHandler} />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="uniqueIndexes" className="flex justify-between">Unique Indexes:</Label>
                            <EditorContent
                                id="uniqueIndexes"
                                editor={uniqueIndexesEditor}
                                value={uniqueIndexesInput}
                                onChange={() => uniqueIndexesInputHandler} />
                        </div>

                        {/* Settings */}
                        <QuerySettings sections={querySections} />

                        {/* Output */}
                        <div className="grid gap-3">
                            <Label htmlFor="output">Output</Label>
                            <div className="relative w-full">
                                <Textarea
                                    className="w-full rounded-lg border border-input bg-background p-4 pr-10 text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="output"
                                    rows={10}
                                    readOnly/>
                                <Button
                                    className="absolute top-2 right-2 text-muted-foreground hover:bg-muted/50"
                                    variant="outline"
                                    size="icon"
                                    onClick={copyHandler}>
                                    <Icon name={isCopied ? 'ClipboardCheck' : 'Clipboard'} className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                </CardContent>
            </Card>
        </>
    );
}
