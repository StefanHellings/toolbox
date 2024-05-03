'use client';

import Head from 'next/head';
import { useState, Fragment } from 'react';
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

const TypeComponent = props => {
    const map = {
        'string': <Input type="text" {...props} />,
        'date': <Input {...props} />,
        'choice': <>
            <Select className={props.className}>
                <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    {props.choices &&
                        props.choices.map(choice => (
                            <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </>,
    };

    return (
        <div>{map[props.type]}</div>
    )
};

const ExpressionsList = ({ expressions }) => {
    const items = Object.entries(expressions);

    return (
        <div className="grid grid-cols-4 gap-2">
            {items.map(item => {
                const [ key, props ] = item;
                const label = key.charAt(0).toUpperCase() + key.slice(1);

                return (
                    <Fragment key={key}>
                        <label
                            htmlFor={key}
                            className="col-start-1 col-span-1 flex items-center text-sm font-medium leading-none">
                            <div className="flex-none mr-2">{label}:</div>
                        </label>
                        <div className="col-start-2 col-span-3">
                            <TypeComponent id={key} {...props} />
                        </div>
                    </Fragment>
                );
            })}
        </div>
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
