'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Tiptap from '@/components/Tiptap';
import Icon from '@/components/Icon';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import getFormattedOutput from './FormattedOutput';

export default function DBNormalisationConverter() {
    const [ input, setInput ] = useState('');
    const [ withHeading, setWithHeading ] = useState(false);
    const [ withRegex, setWithRegex ] = useState(false);
    const [ titleRegex, setTitleRegex ] = useState(/\b\w+(?=\s*\()/);

    const inputHandler = value => setInput(value);
    const headingHandler = value => setWithHeading(value);
    const regexHandler = value => setWithRegex(value);
    const titleRegexHandler = value => setTitleRegex(value);

    const outputSettings = {
        input,
        withHeading,
        [withRegex && 'titleRegex']: titleRegex,
    };

    return (
        <>
            <Head>
                <title>Rich text converter</title>
            </Head>
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <Icon name="ChevronLeft" className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    DB normalisation
                </h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rich Text</CardTitle>
                    <CardDescription>
                        Paste in your rich text
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-8">
                        <div className="grid gap-3">
                            <Label htmlFor="input">Input</Label>
                            <Tiptap
                                defaultValue='<p>TableName(<u>primaryKey</u>, attributeName_3, attributeName_1, RG[rg_attributeName_1, rg_attributeName_4, rg_attributeName_2, rg_attributeName_3,], attributeName_2, attributeName_4, RG[rg_attributeName_1, rg_attributeName_4, rg_attributeName_2, rg_attributeName_3])</p>'
                                onChange={inputHandler} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="output">Output</Label>
                            <Textarea
                                id="output"
                                value={getFormattedOutput(outputSettings)}
                                className="min-h-32 font-mono text-xs"/>
                        </div>
                        <div className="flex flex-col">
                            <Label className="mb-4">Settings</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="withHeading"
                                    onCheckedChange={headingHandler}
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
                                    onCheckedChange={regexHandler}
                                    checked={withRegex} />
                                <label
                                    htmlFor="regex"
                                    className="flex items-center text-sm font-medium leading-none">
                                    <div className="flex-none mr-2">Select title with regex: </div>
                                    <Input
                                        type="text"
                                        onChange={event => titleRegexHandler(event.target.value)}
                                        value={titleRegex}
                                        placeholder="\b\w+(?=\s*\()" />
                                </label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
