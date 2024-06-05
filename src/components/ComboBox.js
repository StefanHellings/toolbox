'use client';

import * as React from 'react';
import { PropTypes, array } from 'prop-types';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export default function ComboBox({ items, placeholder = 'Search ...', selectHandler }) {
    const [ open, setOpen ] = React.useState(false);
    const [ value, setValue ] = React.useState('');

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between">
                    {value
                        ? items.find((item) => item === value)
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search templates..." />
                    <CommandList>
                        <CommandEmpty>No templates found.</CommandEmpty>
                        <CommandGroup>
                            {items.map(item => (
                                <CommandItem
                                    key={item}
                                    value={item}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? '' : currentValue);
                                        setOpen(false);
                                        if (selectHandler)
                                            selectHandler(item);
                                    }}>
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item ? 'opacity-100' : 'opacity-0'
                                        )}/>
                                    {item}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

ComboBox.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        'label': PropTypes.string.isRequired,
        'value': PropTypes.string.isRequired,
    })).isRequired,
    placeholder: PropTypes.string,
    selectHandler: PropTypes.func,
};
