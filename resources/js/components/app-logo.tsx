import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-md bg-sidebar-accent text-sidebar-primary-foreground">
                <AppLogoIcon className="size-10 fill-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    ASHERS WORLD
                </span>
                <span className="text-xs text-muted-foreground">
                    Management System
                </span>
            </div>
        </>
    );
}
