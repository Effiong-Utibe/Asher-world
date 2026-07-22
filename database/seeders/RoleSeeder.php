<?php

namespace Database\Seeders;

use App\Enum\PermissionEnum;
use App\Enum\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
          $userRoles=Role::create([
            'name'=>RolesEnum::User->value,
            'guard_name' => 'web'
          ]);
        $adminRoles = Role::create([
            'name' => RolesEnum::Admin->value,
            'guard_name' => 'web'
        ]);

        $SellProducts=Permission::create(['name'=>PermissionEnum::SellProducts->value]);
        $BuyProducts=Permission::create(['name'=>PermissionEnum::BuyProducts->value]);

        $userRoles->syncPermissions([$BuyProducts]);
        $adminRoles->syncPermissions([$SellProducts,$BuyProducts]);
    }
}
