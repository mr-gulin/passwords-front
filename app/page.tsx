import { Encrypt } from '@/components/Encrypt';
import { GoogleSignIn } from '@/components/GoogleSignIn';
import { Test } from '@/components/Test';

export default function Home() {
    return <div>
        <Encrypt />
        <Test />
        <GoogleSignIn />
    </div>;
}
