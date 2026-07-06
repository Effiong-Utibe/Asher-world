<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [

            // Men Clothing
            [
                'department_id' => 1,
                'name' => 'Shirts',
                'slug' => Str::slug('Shirts'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'T-Shirts',
                'slug' => Str::slug('T-Shirts'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'Polo Shirts',
                'slug' => Str::slug('Polo Shirts'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'Jeans',
                'slug' => Str::slug('Jeans'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'Trousers',
                'slug' => Str::slug('Trousers'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'Hoodies',
                'slug' => Str::slug('Hoodies'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'Jackets',
                'slug' => Str::slug('Jackets'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 1,
                'name' => 'Suits',
                'slug' => Str::slug('Suits'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Women Clothing
            [
                'department_id' => 2,
                'name' => 'Dresses',
                'slug' => Str::slug('Dresses'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 2,
                'name' => 'Tops',
                'slug' => Str::slug('Tops'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 2,
                'name' => 'Blouses',
                'slug' => Str::slug('Blouses'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 2,
                'name' => 'Skirts',
                'slug' => Str::slug('Skirts'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 2,
                'name' => 'Jeans',
                'slug' => Str::slug('Women Jeans'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 2,
                'name' => 'Jumpsuits',
                'slug' => Str::slug('Jumpsuits'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_id' => 3,
                'name' => 'Oversized T-Shirts',
                'slug' => Str::slug('Oversized T-Shirts'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Graphic Tees',
                'slug' => Str::slug('Graphic Tees'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Hoodies',
                'slug' => Str::slug('Unisex Hoodies'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Sweatshirts',
                'slug' => Str::slug('Sweatshirts'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Tracksuits',
                'slug' => Str::slug('Tracksuits'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Joggers',
                'slug' => Str::slug('Joggers'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Sneakers',
                'slug' => Str::slug('Unisex Sneakers'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Caps',
                'slug' => Str::slug('Caps'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Backpacks',
                'slug' => Str::slug('Backpacks'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 3,
                'name' => 'Streetwear',
                'slug' => Str::slug('Streetwear'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // kids
            [
                'department_id' => 4,
                'name' => 'Boys Clothing',
                'slug' => Str::slug('Boys Clothing'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 4,
                'name' => 'Girls Clothing',
                'slug' => Str::slug('Girls Clothing'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 4,
                'name' => 'Baby Clothing',
                'slug' => Str::slug('Baby Clothing'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // footware
            [
                'department_id' => 5,
                'name' => 'Sneakers',
                'slug' => Str::slug('Sneakers'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 5,
                'name' => 'Formal Shoes',
                'slug' => Str::slug('Formal Shoes'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 5,
                'name' => 'Boots',
                'slug' => Str::slug('Boots'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 5,
                'name' => 'Sandals',
                'slug' => Str::slug('Sandals'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Accessories
            [
                'department_id' => 6,
                'name' => 'Bags',
                'slug' => Str::slug('Bags'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 6,
                'name' => 'Watches',
                'slug' => Str::slug('Watches'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 6,
                'name' => 'Sunglasses',
                'slug' => Str::slug('Sunglasses'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 6,
                'name' => 'Jewelry',
                'slug' => Str::slug('Jewelry'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Luxury Collection
            [
                'department_id' => 7,
                'name' => 'Designer Clothing',
                'slug' => Str::slug('Designer Clothing'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 7,
                'name' => 'Designer Bags',
                'slug' => Str::slug('Designer Bags'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 7,
                'name' => 'Luxury Watches',
                'slug' => Str::slug('Luxury Watches'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // sportware
            [
                'department_id' => 8,
                'name' => 'Gym Wear',
                'slug' => Str::slug('Gym Wear'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 8,
                'name' => 'Running Wear',
                'slug' => Str::slug('Running Wear'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 8,
                'name' => 'Athleisure',
                'slug' => Str::slug('Athleisure'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Beauty & Grooming
            [
                'department_id' => 9,
                'name' => 'Perfumes',
                'slug' => Str::slug('Perfumes'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 9,
                'name' => 'Skincare',
                'slug' => Str::slug('Skincare'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'department_id' => 9,
                'name' => 'Makeup',
                'slug' => Str::slug('Makeup'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}
