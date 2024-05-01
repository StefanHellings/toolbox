'use client';

import Head from 'next/head';
import { useState } from 'react';
import ToolHeader from '@/components/ToolHeader';
import ComboBox from '@/components/ComboBox';

import allTemplates from './email-templates/all-email-templates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const templateList = allTemplates.map(template => ({
    value: template.label.toLowerCase(),
    ...template,
}));

const TypeComponent = (type, ...props) => {
    const map = {
        'string': <Input type="text" {...props} />,
        'date': <Input type="text" {...props} />,
        'choice': <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
                {/* {props.choices.map(choice => (
                    <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                ))} */}
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
            </SelectContent>
        </Select>,
    };

    return map[type];
};

const ExpressionsList = ({ expressions }) => {
    const items = Object.entries(expressions);

    return (
        <>
            {items.map(item => {
                const [ key, props ] = item;

                console.log(key, props);

                return (
                    <div className="grid gap-8" key={key}>
                        <label
                            htmlFor="regex"
                            className="flex items-center text-sm font-medium leading-none">
                            <div className="flex-none mr-2">{key}</div>
                            <TypeComponent {...props} />
                            <Input
                                type="text"
                                onChange={() => {}}/>
                        </label>
                    </div>
                );
            })}
        </>
    );
};

export default function PrefabEmails() {
    const [ template, setTemplate ] = useState(false);
    const templateHandler = value => {
        console.log(value);
        setTemplate(value);
    };

    return (
        <>
            <Head>
                <title>Prefabricated Emails</title>
            </Head>
            <ToolHeader title="Prefabricated Emails" />
            <ComboBox
                items={templateList}
                placeholder='Select template...'
                selectHandler={value => templateHandler(value)} />
            {template.label &&
                <Card>
                    <CardHeader>
                        <CardTitle>Expressions</CardTitle>
                        <CardDescription>
                            All the variables used for this template
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ExpressionsList expressions={template.expressions} />
                    </CardContent>
                </Card>
            }
        </>
    );
}
