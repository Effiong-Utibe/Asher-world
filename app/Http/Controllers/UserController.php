<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function home()
    {
        // Use PascalCase component path for Inertia (match resources/js/Pages directory)
        return Inertia::render('users/home');
    }
}
