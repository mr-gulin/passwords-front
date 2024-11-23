'use client';

import { SyntheticEvent, useState } from 'react';

import { decrypt, encrypt } from '@/utils/crypto';

export const Encrypt = () => {
    const [value, setValue] = useState('');
    const [password, setPassword] = useState('');

    const [encryptedValue, setEncryptedValue] = useState('');
    const [decryptedValue, setDecryptedValue] = useState('');

    const onEncrypt = async () => {
        console.log('Encrypt');
        const encoded = await encrypt(value, password);
        setEncryptedValue(`${encoded}`);
    };

    const onDecrypt = async () => {
        const decoded = await decrypt(encryptedValue, password);
        setDecryptedValue(`${decoded}`);
    };

    const onValueChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setValue(target.value);
    };

    const onPasswordChange = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        setPassword(target.value);
    };

    return (
        <>
            <input value={value} onInput={onValueChange} />
            <input value={password} onInput={onPasswordChange} />
            <button onClick={onEncrypt}>Encrypt</button>
            <button onClick={onDecrypt}>Decrypt</button>
            <div>
                Encrypted value:
                {encryptedValue}
            </div>
            <div>
                Decrypted value:
                {decryptedValue}
            </div>
        </>
    );
};
