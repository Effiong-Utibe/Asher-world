<?php

namespace Database\Seeders;

use App\Enum\RolesEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      User::factory()->create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password'=>bcrypt('password'),
        ])->assignRole(RolesEnum::User->value);

        User::factory()->create([
            'name' => 'Effiong Utibe',
            'email' => 'Utlite79462@gmail.com',
            'password'=>bcrypt('Engineer7946'),
        ])->assignRole(RolesEnum::Admin->value);
    }
    }

