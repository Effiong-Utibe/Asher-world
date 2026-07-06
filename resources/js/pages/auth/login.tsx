import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

import { register } from '@/routes';

import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <div className="space-y-6">
                {status && (
                    <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {status}
                    </div>
                )}

                <Form
                    action={store.url()}
                    method="post"
                    resetOnSuccess={['password']}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>

                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        tabIndex={1}
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>

                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-sm"
                                                tabIndex={5}
                                            >
                                                Forgot Password?
                                            </TextLink>
                                        )}
                                    </div>

                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        tabIndex={2}
                                    />

                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />

                                    <Label
                                        htmlFor="remember"
                                        className="cursor-pointer"
                                    >
                                        Remember me
                                    </Label>
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="h-11 w-full"
                                disabled={processing}
                                tabIndex={4}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <>
                                        <Spinner />
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            {/* Registration */}
                            <div className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <TextLink href={register()} tabIndex={5}>
                                    Create Account
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
