<?php

namespace App\Http\Responses;

use App\Enum\RolesEnum;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
class LoginResponse implements LoginResponseContract
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {

    }
     public function toResponse($request)
    {
        $user = $request->user();

if ($user->hasRole(RolesEnum::Admin->value)) {
    return redirect()->route('admin.orders.index');
}
        return redirect()->intended(route('users.home'));
    }
}
