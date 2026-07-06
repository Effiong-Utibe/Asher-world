'use client';

import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    Heart,
    ChevronDown,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import AppLogoIcon from '@/components/app-logo-icon';

/* -------------------------------------------------------------------------- */
/* CONFIG                                                                     */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Luxury',
];

const NAV_LINKS = [
    { label: 'New In', href: '/products?sort=new' },
    { label: 'Men', href: '/departments/men' },
    { label: 'Women', href: '/departments/women' },
    { label: 'Accessories', href: '/departments/accessories' },
    { label: 'Sale', href: '/sale' },
];

/* -------------------------------------------------------------------------- */
/* NAV ICON BUTTON                                                           */
/* -------------------------------------------------------------------------- */

function NavIconButton({
    icon,
    badge,
    href,
    label,
    sublabel,
}: {
    icon: React.ReactNode;
    badge?: number;
    href: string;
    label?: string;
    sublabel?: string;
}) {
    return (
        <Link href={href} className="group flex items-center gap-3">
            <div className="relative rounded-2xl p-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
                {icon}

                {badge ? (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white dark:bg-white dark:text-black">
                        {badge}
                    </span>
                ) : null}
            </div>

            {(label || sublabel) && (
                <div className="hidden flex-col leading-tight xl:flex">
                    {sublabel && (
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {sublabel}
                        </span>
                    )}
                    {label && (
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {label}
                        </span>
                    )}
                </div>
            )}
        </Link>
    );
}

/* -------------------------------------------------------------------------- */
/* SEARCH BAR                                                                 */
/* -------------------------------------------------------------------------- */

function SearchBar() {
    const [query, setQuery] = useState('');

    return (
        <div className="hidden flex-1 px-8 lg:flex">
            <div className="flex h-14 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm ">
                {/* Category */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className="h-full rounded-none border-r border-zinc-200 bg-zinc-50 px-5 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                        >
                            Categories
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-60 rounded-2xl p-2">
                        {CATEGORIES.map((c) => (
                            <DropdownMenuItem key={c}>{c}</DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Input */}
                <div className="relative flex-1">
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="h-full border-0 bg-transparent px-5 pr-14 focus:ring-0"
                    />

                    <Button
                        size="icon"
                        className="absolute top-2 right-2 h-10 w-10 rounded-xl text-white"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* MOBILE SIDEBAR                                                            */
/* -------------------------------------------------------------------------- */

function MobileSidebar({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[90] bg-black/50"
                onClick={onClose}
            />

            <aside className="fixed top-0 left-0 z-[100] h-full w-[320px] bg-white shadow-2xl dark:bg-zinc-950">
                <div className="flex items-center justify-between border-b p-5">
                    <h2 className="font-semibold">Menu</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X />
                    </Button>
                </div>

                <div className="flex flex-col p-4">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="rounded-xl px-4 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </aside>
        </>
    );
}

/* -------------------------------------------------------------------------- */
/* DESKTOP NAV                                                               */
/* -------------------------------------------------------------------------- */

function DesktopNavigation() {
    return (
        <div className="hidden border-t border-zinc-200 bg-white md:block dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto flex max-w-7xl gap-8 px-6 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                {NAV_LINKS.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className="hover:text-black dark:hover:text-white"
                    >
                        {l.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* MAIN NAVBAR                                                               */
/* -------------------------------------------------------------------------- */

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
    }, [mobileOpen]);

    return (
        <>
            <header className="fixed top-0 z-50 w-full">
                <nav
                    className={cn(
                        'border-b bg-white/80 backdrop-blur-xl transition dark:bg-zinc-950/80',
                        isScrolled && 'shadow-md',
                    )}
                >
                    <div
                        className={cn(
                            'mx-auto flex max-w-7xl items-center justify-between px-4',
                            isScrolled ? 'h-16' : 'h-20',
                        )}
                    >
                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                            <Button
                                className="md:hidden"
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileOpen(true)}
                            >
                                <Menu />
                            </Button>

                            <Link href="/" className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white dark:bg-white dark:text-black">
                                    <AppLogoIcon />
                                </div>

                                <div className="hidden sm:block">
                                    <p className="font-bold">Asher World</p>
                                    <p className="text-xs text-zinc-500">
                                        Luxury Fashion
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* CENTER */}
                        <SearchBar />

                        {/* RIGHT */}
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block">
                                <NavIconButton
                                    href="/wishlist"
                                    icon={<Heart size={20} />}
                                    badge={3}
                                />
                            </div>

                            <NavIconButton
                                href="/account"
                                icon={<User size={20} />}
                                badge={1}
                            />

                            <NavIconButton
                                href="/cart"
                                icon={<ShoppingCart size={20} />}
                                badge={2}
                            />
                        </div>
                    </div>

                    {!isScrolled && <DesktopNavigation />}
                </nav>
            </header>

            <MobileSidebar
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            <div className={isScrolled ? 'h-16' : 'h-24'} />
        </>
    );
}
