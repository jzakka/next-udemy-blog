'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/lib/actions/authentication';
import { useActionState } from 'react';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>
                    ログイン
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-4">
                    <div className='space-y-2'>
                        <Label htmlFor='email'>メールアドレス</Label>
                        <Input id='email' type='email' name="email" required />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>パスワード</Label>
                        <Input id='password' type='password' name="password" required />
                    </div>
                    <Button type="submit" className="w-full">ログイン</Button>
                    {errorMessage && (
                        <div className="h-5 w-5 text-red-500">
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}