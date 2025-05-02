// Cargar la librería CryptoJS (debe incluirse en el HTML)
const CryptoJS = window.CryptoJS;

// Clave secreta original
const originalSecret = "6LeIYWEcAAAAAHRtSszq7NQNVTDdDbqwQwaDeiIF";

// Función para ajustar la clave secreta a 32 bytes
function normalizeKey(secret) {
    return CryptoJS.SHA256(secret).toString(CryptoJS.enc.Base64).substr(0, 32);
}

// Clave secreta ajustada
const _secret = normalizeKey(originalSecret);

// Función para cifrar con AES en modo CFB
function encryptAES(data, secretKey) {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.lib.WordArray.random(16); // Generar IV aleatorio
    const encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });
    const encryptedWithIV = CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
    return encryptedWithIV;
}

// Datos de prueba
const cedula = "Berenice4";
const password = "bere";
const codigoSeguridad = "";

// Crear el payload cifrado
const payload = {
    operador: encryptAES(cedula, _secret),
    PassWord: encryptAES(password, _secret),
    codigo: encryptAES(codigoSeguridad, _secret),
    esoperador: "N",
};

// Endpoint de la API
const url = "http://localhost:3001/login"; // Ajustar según tu entorno

// Función para realizar las solicitudes automatizadas
(async () => {
    const resultadosDiv = document.getElementById("resultados");
    let successfulRequests = 0;
    let failedRequests = 0;

    for (let i = 1; i <= 100; i++) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                successfulRequests++;
                resultadosDiv.innerHTML += `<p>Solicitud ${i}: Éxito</p>`;
            } else {
                failedRequests++;
                resultadosDiv.innerHTML += `<p>Solicitud ${i}: Fallo - Código ${response.status}</p>`;
            }
        } catch (error) {
            failedRequests++;
            resultadosDiv.innerHTML += `<p>Solicitud ${i}: Fallo - Error desconocido</p>`;
        }
    }

    resultadosDiv.innerHTML += `<h3>Resultados del ataque:</h3>`;
    resultadosDiv.innerHTML += `<p>Solicitudes exitosas: ${successfulRequests}</p>`;
    resultadosDiv.innerHTML += `<p>Solicitudes fallidas: ${failedRequests}</p>`;
})();
