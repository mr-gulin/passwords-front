'use client';

import React, { useEffect, useRef, useState } from 'react';

import { REFRESH_TOKEN_LOCALSTORAGE_KEY, TOKEN_LOCALSTORAGE_KEY } from '@/api/constants';
import { useApi } from '@/api/helpers';
import {
    GOOGLE_SCRIPT_SRC,
} from '@/components/GoogleSignIn/constants';
import { GoogleCredentialsResponse } from '@/components/GoogleSignIn/types';

interface IProps {
    apiUrl: string;
    googleClientId: string;
    isSignUp?: boolean;
}

export const GoogleSignIn = ({ apiUrl, googleClientId, isSignUp = false }: IProps) => {
    const { POST } = useApi(apiUrl);

    const [isClient, setIsClient] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    const googleClientContainerRef = useRef<HTMLDivElement | null>(null);
    const googleSignInButtonRef = useRef<HTMLDivElement | null>(null);

    const onSignIn = async (credentials: GoogleCredentialsResponse) => {
        if (!credentials.credential) {
            return;
        }

        const path = isSignUp ? '/sign-up' : '/login';

        const res = await POST(path, {
            token: credentials.credential,
        });

        localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, res.access);
        localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, res.refresh);
    };

    const initGoogleSignIn = () => {
        const context = isSignUp ? 'sign_up' : 'sign_in';
        const text = isSignUp ? 'signup_with' : 'signin_with';

        window?.google?.accounts?.id?.initialize({
            client_id: googleClientId,
            ux_mode: 'popup',
            context,
            itp_support: 'true',
            callback: onSignIn,
        });

        window.google.accounts.id.renderButton(googleSignInButtonRef.current, {
            type: 'standard',
            shape: 'pill',
            theme: 'outline',
            text,
            size: 'large',
            locale: 'en-US',
            logo_alignment: 'left',
        });
    };

    useEffect(() => {
        setIsClient(true);
        const googleClientEl = googleClientContainerRef.current;

        if (!googleClientEl) {
            return;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
            setIsScriptLoaded(true);
        };
        script.src = GOOGLE_SCRIPT_SRC;

        googleClientEl.appendChild(script);
    }, []);

    useEffect(() => {
        if (!isScriptLoaded || !isClient) {
            return;
        }

        initGoogleSignIn();
    }, [isScriptLoaded, isClient]);

    return (
        <>
            <div ref={googleClientContainerRef}></div>
            <div ref={googleSignInButtonRef}></div>
        </>
    );
};
