import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const WithTooltip = ({ children, tooltip }: {children: ReactNode, tooltip: string}) => (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

export default WithTooltip;
