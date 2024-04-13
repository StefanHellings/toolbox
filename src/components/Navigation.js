'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toolsRegistry } from '@/data/toolsRegistry';
import Icon from '@/components/Icon';

export default function Navigation({ type = 'desktop' }) {
    const pathname = usePathname();

    const styles = {
        'nav': {
            'desktop': 'grid items-start px-2 text-sm font-medium lg:px-4',
            'mobile': 'grid gap-2 text-sm font-medium',
        },
        'link': {
            'desktop': 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
            'mobile': 'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
        },
        'icon': {
            'desktop': 'h-4 w-4',
            'mobile': 'h-5 w-5',
        },
        'active': {
            'desktop': 'bg-muted',
            'mobile': 'bg-muted',
        },
    };

    const pages = Object
        .entries(toolsRegistry)
        .map(([ key, value ]) => [ key, value ]);

    return (
        <nav className={styles.nav[type]}>
            {type === 'mobile' && (
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold mb-4">
                    <Icon name="PocketKnife" className="h-6 w-6" />
                    <span className="sr-only">Toolbox</span>
                </Link>
            )}
            <Link
                href="/"
                className={`${styles.link[type]} ${pathname === '/' ? styles.active[type] : ''}`}>
                <Icon name="LayoutGrid" className={styles.icon[type]} />
                Overview
            </Link>
            {pages.map(([ path, item ]) => (
                <Link
                    key={path}
                    href={`/${path}`}
                    className={`${styles.link[type]} ${pathname === `/${path}` ? styles.active[type] : ''}`}>
                    <Icon name={item.icon} className={styles.icon[type]} />
                    {item.title}
                </Link>
            ))}
        </nav>
    );
}
