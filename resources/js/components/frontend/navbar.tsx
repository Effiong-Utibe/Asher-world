import { Link, router, usePage,} from '@inertiajs/react';

import {
    Search,
    ShoppingCart,
    User,
    Menu,
    X,
    Heart,
    ChevronDown,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';
import { PageProps } from '@inertiajs/core';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import products from '@/routes/products';
import admin from '@/routes/admin';

/* -------------------------------------------------------------------------- */
/* CONFIG                                                                     */
/* -------------------------------------------------------------------------- */
interface Category {
    id: number;
    name: string;
    slug: string;
}

interface SharedProps extends PageProps {
    categories: Category[];
    cartCount: number;
    wishlistCount: number;
    unreadNotifications: number;

    auth: {
        user: {
            id: number;
            name: string;
            email?: string;
            role?: string;
            is_admin?: boolean;
        } | null;
    };

    settings: {
        site_name: string;
        logo: string;
    };
}


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

                {badge !== undefined && badge > 0 ? (
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
interface SearchBarProps {
    categories: Category[];
}
function SearchBar({ categories }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const search = () => {
        router.get(
            '/products',
            {
                search: query,
                category: selectedCategory,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="hidden flex-1 px-8 lg:flex">
            <div className="flex h-14 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                {/* Category */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className="h-full rounded-none border-r border-zinc-200 bg-zinc-50 px-5 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                        >
                            {selectedCategory
                                ? categories.find(
                                      (c) => c.slug === selectedCategory,
                                  )?.name
                                : 'Categories'}

                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-60 rounded-2xl p-2">
                        {categories.map((category) => (
                            <DropdownMenuItem
                                key={category.id}
                                onClick={() =>
                                    setSelectedCategory(category.slug)
                                }
                            >
                                {category.name}
                            </DropdownMenuItem>
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search();
                            }
                        }}
                    />

                    <Button
                        size="icon"
                        className="absolute top-2 right-2 h-10 w-10 rounded-xl text-white"
                        onClick={search}
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
    auth,
}: {
    open: boolean;
    onClose: () => void;
    auth: SharedProps['auth'];
}) {
    if (!open) {
        return null;
    }
const isAdmin = auth.user?.is_admin || auth.user?.role === 'admin';
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

                    {auth.user && (
                        <>
                            <div className="my-4 border-t" />

                            <Link
                                href="/account"
                                onClick={onClose}
                                className="rounded-xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                Profile
                            </Link>

                            {isAdmin && (
                                <Link
                                    href={products.index()}
                                    onClick={onClose}
                                    className="rounded-xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                >
                                    Dashboard
                                </Link>
                            )}

                            <button
                                onClick={() =>
                                    router.post(
                                        '/logout',
                                        {},
                                        {
                                            preserveScroll: true,
                                        },
                                    )
                                }
                                className="rounded-xl px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                                Logout
                            </button>
                        </>
                    )}
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


const {
    categories = [],
    cartCount = 0,
    wishlistCount = 0,
    auth,
    settings,
} = usePage<SharedProps>().props;

const isAdmin = auth.user?.is_admin || auth.user?.role === 'admin';
console.log('Auth:', auth);
console.log('User:', auth.user);
console.log('Role:', auth.user?.role);
console.log('Is Admin:', auth.user?.is_admin);
console.log('Computed isAdmin:', isAdmin);
console.log(auth.user);
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
                                    <p className="font-bold">
                                        {settings.site_name}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* CENTER */}
                        <SearchBar categories={categories} />

                        {/* RIGHT */}
                        <div className="flex items-center gap-2">
                            <div className="hidden md:block">
                                <NavIconButton
                                    href="/wishlist"
                                    icon={<Heart size={20} />}
                                    badge={wishlistCount}
                                />
                            </div>

                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 rounded-xl"
                                        >
                                            <User size={20} />
                                            <span className="hidden md:inline">
                                                {auth.user.name}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56"
                                    >
                                        <DropdownMenuItem asChild>
                                            <Link href="/account">Profile</Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link href="/settings/profile">
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>

                                        {isAdmin && (
                                            <>
                                                <DropdownMenuSeparator />

                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={products.index()}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </DropdownMenuItem>
                                            </>
                                        )}

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={() =>
                                                router.post(
                                                    '/logout',
                                                    {},
                                                    {
                                                        preserveScroll: true,
                                                    },
                                                )
                                            }
                                            className="text-red-600"
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <NavIconButton
                                    href="/login"
                                    icon={<User size={20} />}
                                    label="Login"
                                    sublabel="Sign In"
                                />
                            )}

                            <NavIconButton
                                href={'/cart'}
                                icon={<ShoppingCart size={20} />}
                                badge={cartCount}
                            />
                        </div>
                    </div>

                    {!isScrolled && <DesktopNavigation />}
                </nav>
            </header>

            <MobileSidebar
                open={mobileOpen}
                auth={auth}
                onClose={() => setMobileOpen(false)}
            />
            <div className={isScrolled ? 'h-16' : 'h-24'} />
        </>
    );
}
