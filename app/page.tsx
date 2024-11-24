import { Encrypt } from '@/components/Encrypt';
import { GoogleSignIn } from '@/components/GoogleSignIn';
import { Test } from '@/components/Test';

export const dynamic = 'force-dynamic';

export default function Home() {
    const googleClientId = process.env.GOOGLE_CLIENT_ID || '';
    const apiUrl = process.env.API_URL || '';
    console.log(googleClientId);
    console.log(apiUrl);

    return <div>
        <Encrypt />
        <Test apiUrl={apiUrl}/>
        <GoogleSignIn apiUrl={apiUrl} googleClientId={googleClientId} />
        <GoogleSignIn apiUrl={apiUrl} googleClientId={googleClientId} isSignUp={true} />
    </div>;
}
