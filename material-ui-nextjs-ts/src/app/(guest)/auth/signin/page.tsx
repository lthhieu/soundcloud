
import AuthSignIn from '@/components/auth/auth.signin';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/auth.options';
import { redirect } from 'next/navigation'
const SignInPage = async () => {
    const session = await getServerSession(authOptions)
    if (session) {
        return redirect('/')
    }
    return (
        <AuthSignIn />
    );
}
export default SignInPage