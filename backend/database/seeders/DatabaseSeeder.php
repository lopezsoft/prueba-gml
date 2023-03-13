<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Category::factory()->create([
            'category_name' => 'Cliente'
        ]);
        Category::factory()->create([
            'category_name' => 'Proveedor'
        ]);
        Category::factory()->create([
            'category_name' => 'Funcionario Interno'
        ]);

        \App\Models\User::factory(30)->create();
        \App\Models\Setting::factory(1)->create();
    }
}
