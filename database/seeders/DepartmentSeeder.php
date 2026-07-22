<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Men',
                'slug' => Str::slug('Men'),
                'image' => 'departments/men.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Women',
                'slug' => Str::slug('Women'),
                'image' => 'departments/women.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Unisex',
                'slug' => Str::slug('Unisex'),
                'image' => 'departments/unisex.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Kids & Baby',
                'slug' => Str::slug('Kids & Baby'),
                'image' => 'departments/kids-baby.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Footwear',
                'slug' => Str::slug('Footwear'),
                'image' => 'departments/footwear.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Accessories',
                'slug' => Str::slug('Accessories'),
                'image' => 'departments/accessories.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Luxury Collection',
                'slug' => Str::slug('Luxury Collection'),
                'image' => 'departments/luxury-collection.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Sportswear',
                'slug' => Str::slug('Sportswear'),
                'image' => 'departments/sportswear.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Beauty & Grooming',
                'slug' => Str::slug('Beauty & Grooming'),
                'image' => 'departments/beauty-grooming.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Trending Collections',
                'slug' => Str::slug('Trending Collections'),
                'image' => 'departments/trending-collections.jpg',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('departments')->insert($departments);
    }
}