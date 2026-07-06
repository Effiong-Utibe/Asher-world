import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            src="/images/asher-world.png"
            alt="App Logo"
            width={50}
            height={50}
            {...props}
        />
    );
}
