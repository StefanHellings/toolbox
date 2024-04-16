'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Icon from '@/components/Icon';
import Tiptap from '@/components/Tiptap';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import getFormattedOutput from './FormattedOutput';

export default function DBNormalisationConverter() {
    const [ input, setInput ] = useState('');
    const changeHandler = content => {
        setInput(content);
    };

    // const parts = getParts(input);

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
                    <div className="grid gap-6 mb-8">
                        <div className="grid gap-3">
                            <Label htmlFor="input">Input</Label>
                            <Tiptap
                                defaultValue='<p>TableName(<u>primaryKey</u>, attributeName_3, attributeName_1, RG[rg_attributeName_1, rg_attributeName_4, rg_attributeName_2, rg_attributeName_3,], attributeName_2, attributeName_4, RG[rg_attributeName_1, rg_attributeName_4, rg_attributeName_2, rg_attributeName_3])</p>'
                                onChange={changeHandler} />
                        </div>
                    </div>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="output">Output</Label>
                            <Textarea
                                id="output"
                                value={getFormattedOutput(input)}
                                className="min-h-32 font-mono text-xs"/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
