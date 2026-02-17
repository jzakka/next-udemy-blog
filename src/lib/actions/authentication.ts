'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });

        redirect('/dashboard');
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'メールアドレスまたはパスワードが正しくありません。';
                default:
                    return '何か問題が発生しました。もう一度お試しください。';
            }
        }
        throw error;
    }
}