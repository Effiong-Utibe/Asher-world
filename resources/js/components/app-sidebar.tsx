import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Box,
    FolderGit2,
    LayoutGrid,
    PersonStanding,
    ShoppingCart,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import products from '@/routes/admin/products';
import type { NavItem } from '@/types';
import orders from '@/routes/admin/orders';
import dashboard from '@/routes/admin/dashboard';

const mainNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: dashboard.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Order',
        href: orders.index(),
        icon: ShoppingCart,
    },
    {
        title: 'Products',
        href: products.index(),
        icon: Box,
    },
    {
        title: 'Customers',
        href: products.index(),
        icon: PersonStanding,
    },
    {
        title: 'Analytics',
        href: products.index(),
        icon: Box,
    },
    {
        title: 'Discounts',
        href: products.index(),
        icon: Box,
    },
    {
        title: 'Review',
        href: products.index(),
        icon: Box,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard.index()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
