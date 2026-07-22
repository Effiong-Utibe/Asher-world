import { Search, ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';
import { product_detail } from '@/actions/App/Http/Controllers/UserController';

interface Category {
    id: number;
    name: string;
    products: number;
    image: string;
    featured?: boolean;
    slug: string;
}
interface Department {
    id: number;
    name: string;
    products: number;
    image: string;
    featured?: boolean;
    slug: string;
}

interface Props {
    categories: Category[];
     departments: Department[];
}


export default function ProductDepartments({ departments,categories }: Props) {
    const [search, setSearch] = useState('');

    const filtereddepartments = useMemo(() => {
        return departments.filter((departments) =>
            departments.name.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);
     const filteredCategories = useMemo(() => {
         return categories.filter((categories) =>
             categories.name.toLowerCase().includes(search.toLowerCase()),
         );
     }, []);

    return (
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                {/* Header */}

                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Shop by Category
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                        Browse thousands of premium products across our most
                        popular shopping categories.
                    </p>
                </div>

                {/* Search */}

                <div className="relative mx-auto mb-10 max-w-lg">
                    <Search className="absolute top-3.5 left-4 h-5 w-5 text-muted-foreground" />

                    <Input
                        placeholder="Search category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-12 rounded-xl pl-11"
                    />
                </div>

                {/* Categories */}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filtereddepartments.map((departments) => (
                        <Card
                            key={departments.id}
                            className="group overflow-hidden rounded-2xl border-0 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={departments.image}
                                    alt={departments.name}
                                    loading="lazy"
                                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
                                />

                                {departments.featured && (
                                    <Badge className="absolute top-4 left-4">
                                        Featured
                                    </Badge>
                                )}
                            </div>

                            <CardContent className="space-y-4 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {departments.name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {departments.products} Products
                                        </p>
                                    </div>
                                    <Link
                                        href={product_detail(departments.slug)}
                                    >
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full transition group-hover:bg-primary group-hover:text-white"
                                        >
                                            <ArrowRight size={18} />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
