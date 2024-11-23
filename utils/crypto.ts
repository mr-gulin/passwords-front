export { decrypt, encrypt };

const SEPARATOR = ':::';

// Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    return buffer.buffer;
}

async function generateKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passphraseKey = encoder.encode(passphrase);

    // Derive a key from the passphrase
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        passphraseKey,
        { name: 'PBKDF2' },
        false,
        ['deriveKey'],
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt'],
    );
}

async function encrypt(data: string, passphrase: string): Promise<string> {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM IV should be 12 bytes
    const salt = crypto.getRandomValues(new Uint8Array(16)); // 16 bytes of random salt

    const key = await generateKey(passphrase, salt);
    const encodedData = encoder.encode(data);

    const ciphertext = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
        },
        key,
        encodedData,
    );

    const cipherBase64 = arrayBufferToBase64(ciphertext);
    const ivBase64 = arrayBufferToBase64(iv);
    const saltBase64 = arrayBufferToBase64(salt);

    const fullString = `${cipherBase64}${SEPARATOR}${ivBase64}${SEPARATOR}${saltBase64}`;

    return btoa(fullString);
}

async function decrypt(encryptedStringBase64: string, passphrase: string): Promise<string | null> {
    const encryptedString = atob(encryptedStringBase64);
    const [ciphertextBase64, ivBase64, saltBase64] = encryptedString.split(SEPARATOR);

    const ciphertext = base64ToArrayBuffer(ciphertextBase64);
    const iv = base64ToArrayBuffer(ivBase64);
    const salt = base64ToArrayBuffer(saltBase64);

    const key = await generateKey(passphrase, new Uint8Array(salt));

    try {
        const decryptedData = await crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: new Uint8Array(iv),
            },
            key,
            ciphertext,
        );


        const decoder = new TextDecoder();

        return decoder.decode(decryptedData);
    } catch (error) {
        console.log(error);

        return null;
    }
}
