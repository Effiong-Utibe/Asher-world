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
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Women',
                'slug' => Str::slug('Women'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Unisex',
                'slug' => Str::slug('Unisex'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Kids $ baby',
                'slug' => Str::slug('Kids & baby'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Footwear',
                'slug' => Str::slug('Footwear'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Accessories',
                'slug' => Str::slug('Accessories'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Luxury Collection',
                'slug' => Str::slug('Luxury Collection'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Sportswear',
                'slug' => Str::slug('Sportswear'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Beauty & Grooming',
                'slug' => Str::slug('Beauty & Grooming'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'name' => 'Trending Collections',
                'slug' => Str::slug('Trending Collections'),
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ];

        DB::table('departments')->insert($departments);
    }
}
