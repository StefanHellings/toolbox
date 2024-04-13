import { ThemeProvider } from '@/components/theme-provider';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import { ModeToggle } from '@/components/ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/Icon';
import Link from 'next/link';

const fontSans = FontSans({
    subsets: [ 'latin' ],
    variable: '--font-sans',
});

export const metadata = {
    title: 'Toolbox by Stefan Hellings',
    name: 'Toolbox',
    description: 'These are all tools I build to help me with daily tasks. You can use them if you find the usefull.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                        <div className="hidden border-r bg-muted/40 md:block">
                            <div className="flex h-full max-h-screen flex-col gap-2">
                                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                                    <Link href="/" className="flex items-center gap-2 font-semibold">
                                        <Icon name="PocketKnife" className="h-6 w-6" />
                                        <span className="">Toolbox</span>
                                    </Link>
                                </div>
                                <div className="flex-1">
                                    <Navigation type="desktop" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <header className="md:fixed top-0 right-0 flex h-14 items-center gap-4 border-b bg-muted/40 md:border-none md:bg-muted/0 px-4 lg:h-[60px] lg:px-6">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="shrink-0 md:hidden">
                                            <Icon name="Menu" className="h-5 w-5" />
                                            <span className="sr-only">Toggle navigation menu</span>
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="flex flex-col">
                                        <Navigation type="mobile" />
                                    </SheetContent>
                                </Sheet>
                                <div className="w-full flex-1">
                                    <div className="relative md:hidden">
                                        <h1 className="text-lg font-semibold md:text-2xl">{metadata.name}</h1>
                                    </div>
                                </div>
                                <ModeToggle />
                            </header>
                            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                                {children}
                            </main>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
