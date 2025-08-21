document.getElementById('secret-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const secretText = document.getElementById('secret').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = 'Memproses...';

    try {
        const response = await fetch('https://eu.onetimesecret.com/api/v2/secret/conceal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // API One-Time Secret menggunakan otentikasi. 
                // Anda mungkin perlu menambahkan header 'Authorization'
                // dengan token API Anda jika diperlukan.
            },
            body: JSON.stringify({ secret: secretText })
        });

        if (!response.ok) {
            throw new Error('Terjadi kesalahan saat menghubungi API.');
        }

        const data = await response.json();
        
        if (data.status === 'ok') {
            const secretUrl = `https://eu.onetimesecret.com/secret/${data.secret_key}`;
            resultDiv.innerHTML = `
                <p>Rahasia Anda telah disembunyikan! Bagikan tautan ini:</p>
                <a href="${secretUrl}" target="_blank">${secretUrl}</a>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: red;">Gagal menyembunyikan rahasia: ${data.message || 'Pesan kesalahan tidak diketahui.'}</p>`;
        }

    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});
