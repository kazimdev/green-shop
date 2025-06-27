<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         User::create([
            'name' => 'Mak A',
            'email' => 'mak@gmail.com',
            'password' => Hash::make('mak@gmail.com'), // Always hash passwords!
        ]);
    }
}
