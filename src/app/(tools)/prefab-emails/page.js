'use client';

import Head from 'next/head';
import { useState, Fragment } from 'react';
import ToolHeader from '@/components/ToolHeader';
import ComboBox from '@/components/ComboBox';

import allTemplates from './email-templates/all-email-templates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/ui/input';

const templateList = allTemplates.map(Template => ({
    label: (new Template).label,
    instance: new Template,
}));

const TypeComponent = props => {
    const map = {
        'string': <Input {...props}
            onChange={event => props.onChange(event.target.value)}
            type="text" />,
        'date': <DatePicker {...props} />,
        'choice': <>
            <Select
                className={props.className}
                defaultValue={props.default}
                onValueChange={value => props.onChange(value)}>
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
    );
};

const TemplateInput = ({ instance, item, onChange }) => {
    const props = instance[item];
    const label = item.charAt(0).toUpperCase() + item.slice(1);
    const [ itemValue, setItemValue ] = useState(props?.default);

    const onChangeHandler = data => {
        setItemValue(data);
        props.value = data;
        onChange();
    };

    return (
        <Fragment key={item}>
            <label
                htmlFor={item}
                className="col-start-1 col-span-1 flex items-center text-sm font-medium leading-none">
                <div className="flex-none mr-2">{label}:</div>
            </label>
            <div className="col-start-2 col-span-3">
                <TypeComponent
                    id={item}
                    {...props}
                    value={itemValue}
                    onChange={onChangeHandler} />
            </div>
        </Fragment>
    );
};

const ExpressionsList = ({ template, onChange }) => {
    const instance = template.instance;
    const items = instance?.expressionsList;

    return (
        <div className="grid grid-cols-4 gap-2">
            {items.map(item => <TemplateInput
                key={item}
                onChange={onChange}
                instance={instance}
                item={item} />)}
        </div>
    );
};

export default function PrefabEmails() {
    const [ template, setTemplate ] = useState(false);
    const [ , setForceUpdate ] = useState(0);
    const templateHandler = value => setTemplate(templateList.find(item => item.label === value));

    // Force update component
    const onChangeHandler = () => setForceUpdate(forceUpdate => forceUpdate + 1);

    return (
        <>
            <Head>
                <title>Prefabricated Emails</title>
            </Head>
            <ToolHeader title="Prefabricated Emails" />
            <ComboBox
                items={templateList.map(item => item.label)}
                placeholder='Select template...'
                selectHandler={value => templateHandler(value)} />
            {template.label &&
                <>
                    <Card>
                        <CardHeader>
                            <CardTitle>Expressions</CardTitle>
                            <CardDescription>
                                All the variables used for this template
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ExpressionsList
                                onChange={onChangeHandler}
                                template={template} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Template</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {template.instance.email}
                        </CardContent>
                    </Card>
                </>
            }
        </>
    );
}
