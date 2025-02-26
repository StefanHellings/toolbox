'use client';

import { useState } from 'react';
import Head from 'next/head';

import ToolHeader from '@/components/ToolHeader';
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Bold from '@tiptap/extension-bold';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import getFormattedOutput from './FormattedOutput';
import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';

const defaultValue = '<p>TableName(<u>primaryKey</u>, attributeName_3, attributeName_1, RG[rg_attributeName_1, rg_attributeName_4, rg_attributeName_2, rg_attributeName_3,], attributeName_2, attributeName_4, RG[rg_attributeName_1, rg_attributeName_4, rg_attributeName_2, rg_attributeName_3])</p>';

export default function DBNormalisationConverter() {
    const [ input, setInput ] = useState('');
    const [ withHeading, setWithHeading ] = useState(true);
    const [ withRegex, setWithRegex ] = useState(false);
    const [ tableNameRegex, setTableNameRegex ] = useState(/\b\w+(?=\s*\()/);
    const [ isCopied, setIsCopied ] = useState(false);

    const inputHandler = (value: string) => setInput(value);
    const useHeadingHandler = (value: boolean) => setWithHeading(value);
    const useRegexHandler = (value: boolean) => setWithRegex(value);
    const tableNameRegexHandler = (value: string) => setTableNameRegex(new RegExp(value));
    const cleanupHandler = (editor: Editor) => {
        /* Prep cleanup */
        let cleanedInput = (editor?.getHTML() || input)
            .replaceAll(' ', '')
            .replaceAll(',', ' , ')
            .replaceAll('<u> , </u>', ' , ')
            .replaceAll('(', ' ( ')
            .replaceAll(')', ' ) ')
            .replaceAll('<strong> (', '( <strong>')
            .replaceAll(' ) </strong>', ' </strong> )')
            .replaceAll('<u> (', '( <u>')
            .replaceAll(' ) </u>', ' </u> )')
        ;

        /* Split items up inside strong or underline tags */
        [ 'strong', 'u' ].forEach(tag => {
            const tagRegex = new RegExp(`<${tag}>(.*?)</${tag}>`, 'g');
            const matches = cleanedInput.match(tagRegex) || [];

            matches.forEach(section => {
                if (!section.includes(','))
                    return;

                const newSection = section.replaceAll(' , ', `</${tag}> , <${tag}>`);

                cleanedInput = cleanedInput.replace(section, newSection);
            });
        });

        /* Final cleanup */
        cleanedInput = cleanedInput
            .replaceAll('<u></u>', '')
            .replaceAll('<u> </u>', '')
            .replaceAll('<strong></strong>', '')
            .replaceAll('<strong> </strong>', '')
            .replaceAll('<br>', '')
            .replaceAll('<p></p>', '')
        ;

        editor?.commands.setContent(cleanedInput);
        setInput(cleanedInput);
    };

    const editor = useEditor({
        content: input || defaultValue,
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
        onUpdate: ({ editor }) => {
            setInput(editor.getHTML());
            cleanupHandler(editor);
        },
    });

    const outputSettings = {
        input,
        withHeading,
        [withRegex && 'tableNameRegex']: tableNameRegex,
    };

    const copyHandler = () => {
        navigator.clipboard.writeText(getFormattedOutput(outputSettings));
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    return (
        <>
            <Head>
                <title>Rich text converter</title>
            </Head>
            <ToolHeader title="DB normalisation" />
            <Card>
                <CardHeader>
                    <CardTitle>Rich Text</CardTitle>
                    <CardDescription>
                        Paste in your rich text
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-8">
                    <>
                        {/* Input */}
                        <div className="grid gap-3">
                            <Label htmlFor="input" className="flex justify-between">Input <Icon onClick={cleanupHandler} name='WandSparkles' className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity" /></Label>
                            <EditorContent
                                editor={editor}
                                value={input}
                                onChange={() => inputHandler} />
                        </div>

                        {/* Output */}
                        <div className="grid gap-3">
                            <Label htmlFor="output">Output</Label>
                            <div className="relative w-full">
                                <Textarea
                                    className="w-full rounded-lg border border-input bg-background p-4 pr-10 text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="output"
                                    rows={10}
                                    value={getFormattedOutput(outputSettings)}/>
                                <Button
                                    className="absolute top-2 right-2 text-muted-foreground hover:bg-muted/50"
                                    variant="outline"
                                    size="icon"
                                    onClick={copyHandler}>
                                    <Icon name={isCopied ? 'ClipboardCheck' : 'Clipboard'} className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="flex flex-col">
                            <Label className="mb-4">Settings</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="withHeading"
                                    onCheckedChange={useHeadingHandler}
                                    checked={withHeading} />
                                <label
                                    htmlFor="withHeading"
                                    className="text-sm font-medium leading-none">
                                    With heading
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="regex"
                                    onCheckedChange={useRegexHandler}
                                    checked={withRegex} />
                                <label
                                    htmlFor="regex"
                                    className="flex items-center text-sm font-medium leading-none">
                                    <div className="flex-none mr-2">Select title with regex: </div>
                                    <Input
                                        type="text"
                                        onChange={event => tableNameRegexHandler(event.target.value)}
                                        value={tableNameRegex.toString()}
                                        placeholder="\b\w+(?=\s*\()" />
                                </label>
                            </div>
                        </div>
                    </>
                </CardContent>
            </Card>
        </>
    );
}
