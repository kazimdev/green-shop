<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return  [
            'title' => $this->faker->title(),
            'description' => $this->faker->text(),
            'price' => '40',
            'stock' => 100,
            'status' => 'active'
        ];
    }
}
