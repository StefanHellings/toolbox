'use client';

import React, { useState } from 'react';
import parse from 'html-react-parser';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Diff = ({ content }: { content: string }) => {
    return (
        <div className="prose">
            {content.split('\n').map((line, index) => (
                <div key={index} data-linenumber={index}>
                    {/* TODO: This is not safe (HTML injection), make it safer!! */}
                    {parse(line)}
                </div>
            ))}
        </div>
    );
};

function diffStrings(text1: string, text2: string) {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const diff = [];

    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        const lineDiff = diffLines(line1, line2);

        diff.push(lineDiff);
    }

    return diff.join('\n');
}

function diffLines(line1: string, line2: string) {
    const words1 = line1.split(' ');
    const words2 = line2.split(' ');
    const diff = [];

    for (let i = 0; i < Math.max(words1.length, words2.length); i++) {
        const word1 = words1[i] || '';
        const word2 = words2[i] || '';

        if (word1 === word2) {
            diff.push(word1);
        } else {
            const wordDiff = diffWords(word1, word2);

            diff.push(wordDiff);
        }
    }

    return diff.join(' ');
}

function diffWords(word1: string, word2: string) {
    const chars1 = word1.split('');
    const chars2 = word2.split('');
    const diff = [];

    for (let i = 0; i < Math.max(chars1.length, chars2.length); i++) {
        const char1 = chars1[i] || '';
        const char2 = chars2[i] || '';
        const charDiff = diffChars(char1, char2);

        diff.push(charDiff);
    }

    return diff.join('');
}

function diffChars(char1: string, char2: string) {
    const charDiff = [];

    if (char1 === char2) {
        charDiff.push(char1);
    } else {
        charDiff.push(
            `<span className="bg-red-100 text-red-800 px-1 rounded">${char1}</span>`,
            `<span className="bg-green-100 text-green-800 px-1 rounded">${char2}</span>`,
        );
    }

    console.log({ charDiff });

    return charDiff;
}

export default function Diffchecker() {
    const [ inputText1, setInputText1 ] = useState('');
    const [ inputText2, setInputText2 ] = useState('');
    const [ diff, setDiff ] = useState('');

    const input1Handler = (value: string) => setInputText1(value);
    const input2Handler = (value: string) => setInputText2(value);

    const compareHandler = () => {
        const text1 = inputText1;
        const text2 = inputText2;
        const diff = diffStrings(text1, text2);

        setDiff(diff);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 md:px-6 md:py-16">
            <div className="space-y-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Diff Checker</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">
                        Compare two pieces of text and see the differences highlighted.
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="text1" className="block text-sm font-medium">
                            Text 1
                        </label>
                        <Textarea
                            id="text1"
                            rows={8}
                            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Enter text 1 here..."
                            value={inputText1}
                            onChange={event => input1Handler(event.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="text2" className="block text-sm font-medium">
                            Text 2
                        </label>
                        <Textarea
                            id="text2"
                            rows={8}
                            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary focus:ring-primary"
                            placeholder="Enter text 2 here..."
                            value={inputText2}
                            onChange={event => input2Handler(event.target.value)}/>
                    </div>
                </div>
                <Button
                    className="mx-auto"
                    onClick={compareHandler}>Compare</Button>
                <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">Differences:</h3>
                    <Diff content={diff} />
                </div>
            </div>
        </div>
    );
}
