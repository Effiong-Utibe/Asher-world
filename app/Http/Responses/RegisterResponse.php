<?php

namespace App\Http\Responses;

use App\Enum\RolesEnum;

class RegisterResponse
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user->hasRole(RolesEnum::Admin->value)) {
    return redirect()->route('admin.orders.index');
}

        return redirect()->route('users.home');
    }
}
