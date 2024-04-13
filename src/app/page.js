import Icon from '@/components/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toolsRegistry } from '@/data/toolsRegistry';
import Link from 'next/link';

const tools = Object
    .entries(toolsRegistry)
    .map(([ key, value ]) => [ key, value ]);

export default function Overview() {
    return (
        <div className="grid grid-cols-[repeat(_auto-fit,minmax(200px,1fr)_)] justify-items-stretch gap-4 pt-10">
            {tools.map(([ path, item ]) => (
                <Link
                    key={path}
                    href={`/${path}`}
                    className="grid items-stretch justify-stretch">
                    <Card className="transition-all hover:bg-muted">
                        <CardHeader className="flex flex-row items-center justify-start space-y-0 pb-2">
                            <Icon name={item.icon} className="h-4 w-4 text-muted-foreground mr-2" />
                            <CardTitle className="text-lg font-medium">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground">
                                {item.description}
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
