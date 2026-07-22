<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Department;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class ProductShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_product_show_page_returns_the_expected_product_payload(): void
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $department = Department::create([
            'name' => 'Accessories',
            'slug' => 'accessories',
            'description' => 'Accessories department',
            'is_active' => true,
        ]);

        $category = Category::create([
            'department_id' => $department->id,
            'name' => 'Bags',
            'slug' => 'bags',
            'description' => 'Bags category',
            'is_featured' => true,
            'is_active' => true,
        ]);

        $product = Product::create([
            'department_id' => $department->id,
            'category_id' => $category->id,
            'name' => 'Classic Tote',
            'slug' => 'classic-tote',
            'short_description' => 'A premium tote',
            'description' => 'A premium tote for everyday use.',
            'material' => 'Leather',
            'color' => 'Black',
            'price' => 120.00,
            'discount_percent' => 10,
            'final_price' => 108.00,
            'stock_quantity' => 15,
        ]);

        $response = $this->actingAs($user)
            ->get(route('admin.products.show', $product));

        $response->assertOk();

        // Dump Inertia response to storage for debugging
        $response->assertInertia(function (AssertableInertia $page) {
            $data = $page->toArray();
            file_put_contents(storage_path('test_product_show.json'), json_encode($data, JSON_PRETTY_PRINT));

            $page->component('admin/products/show')
                ->has('product')
                ->where('product.name', 'Classic Tote')
                ->has('relatedProducts');
        });
    }
}
