import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Truck,
    Shield,
    RotateCcw,
} from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
const Footer: React.FC = () => {
    return (
        <footer className="mt-3 border-t border-gray-200 bg-slate-900">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center rounded-md bg-white/5 p-1">
                                <AppLogoIcon />
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                                Asher World
                            </h3>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-300">
                            Premium quality products delivered worldwide. Your
                            satisfaction is our priority.
                        </p>
                        <div className="flex space-x-4">
                            <Facebook className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-white" />
                            <Twitter className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-white" />
                            <Instagram className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-white" />
                            <Youtube className="h-5 w-5 cursor-pointer text-gray-300 transition-colors hover:text-white" />
                        </div>
                    </div>

                    {/* Shop */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium tracking-wide text-gray-900 uppercase">
                            Shop
                        </h4>
                        <ul className="space-y-2">
                            {[
                                'New Arrivals',
                                'Best Sellers',
                                'Sale',
                                'Gift Cards',
                                'Collections',
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium tracking-wide text-gray-900 uppercase">
                            Support
                        </h4>
                        <ul className="space-y-2">
                            {[
                                'Contact Us',
                                'FAQ',
                                'Size Guide',
                                'Returns',
                                'Shipping',
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium tracking-wide text-gray-900 uppercase">
                            Contact
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    hello@shopco.com
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    +1 (555) 123-4567
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    New York, NY
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 sm:flex-row">
                    <p className="text-xs text-gray-500">
                        © 2024 ShopCo. All rights reserved.
                    </p>
                    <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-500">
                            Secure payments
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
