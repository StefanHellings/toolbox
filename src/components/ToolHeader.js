import Link from 'next/link';
import { Button } from './ui/button';
import Icon from './Icon';

export default function ToolHeader({ title }) {
    return (
        <>
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="outline" size="icon" className="h-7 w-7">
                        <Icon name="ChevronLeft" className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                </Link>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {title}
                </h1>
            </div>
        </>
    );
}
