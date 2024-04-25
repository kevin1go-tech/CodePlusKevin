document.addEventListener("DOMContentLoaded", function() {
    const captchaContainer = document.querySelector('.captcha');
    const captchaInput = document.getElementById('captchaInput');
    const captchaRefreshButton = document.getElementById('captchaRefreshButton');
    const submitButton = document.getElementById('submitButton');
    const successModal = document.getElementById('successModal');
    const reloadButton = document.getElementById('reloadButton');
    const cardTypeSelect = document.getElementById('cardType');
    const cardNumberInput = document.getElementById('cardNumber');
    const documentTypeSelect = document.getElementById('documentType');
    const documentNumberInput = document.getElementById('documentNumber');
    const internetKeyInput = document.getElementById('internetKey');
    const virtualKeyboard = document.querySelector('.virtual-keyboard');

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return captcha;
    };

    let currentCaptcha = generateCaptcha();
    captchaContainer.innerHTML = `<img src="captcha.php?captcha=${currentCaptcha}" alt="Captcha">${currentCaptcha}`;

    captchaRefreshButton.addEventListener('click', () => {
        currentCaptcha = generateCaptcha();
        captchaContainer.innerHTML = `<img src="captcha.php?captcha=${currentCaptcha}" alt="Captcha">${currentCaptcha}`;
    });

    const handleSubmit = () => {
        successModal.style.display = 'block';
    };

    submitButton.addEventListener('click', handleSubmit);

    reloadButton.addEventListener('click', () => {
        successModal.style.display = 'none';
        cardNumberInput.value = '';
        documentNumberInput.value = '';
        internetKeyInput.value = '';
        generateCaptchaImage();
    });

    documentTypeSelect.addEventListener('change', () => {
        const selectedOption = documentTypeSelect.value;
        if (selectedOption === 'DNI') {
            documentNumberInput.placeholder = 'Número de DNI (8 dígitos)';
            documentNumberInput.maxLength = 8;
        } else if (selectedOption === 'Pasaporte') {
            documentNumberInput.placeholder = 'Número de Pasaporte (12 dígitos)';
            documentNumberInput.maxLength = 12;
        }
    });

    const keyboardButtons = Array.from(virtualKeyboard.querySelectorAll('button'));

    keyboardButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Limpiar') {
                internetKeyInput.value = '';
            } else {
                internetKeyInput.value += button.textContent;
            }
        });
    });

    const generateVirtualKeyboard = () => {
        const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
        numbers.push(0);
        shuffleArray(numbers);
        const cleanButton = document.createElement('button');
        cleanButton.textContent = 'Limpiar';
        cleanButton.addEventListener('click', () => {
            internetKeyInput.value = '';
        });
        virtualKeyboard.innerHTML = '';
        numbers.forEach(number => {
            const button = document.createElement('button');
            button.textContent = number;
            button.addEventListener('click', () => {
                internetKeyInput.value += number;
            });
            virtualKeyboard.appendChild(button);
        });
        virtualKeyboard.appendChild(cleanButton); // Agregar el botón "Limpiar" al final
    };

    generateVirtualKeyboard();

    const generateCaptchaImage = () => {
        currentCaptcha = generateCaptcha();
        captchaContainer.innerHTML = `<img src="captcha.php?captcha=${currentCaptcha}" alt="Captcha">${currentCaptcha}`;
    };

    captchaRefreshButton.addEventListener('click', generateCaptchaImage);

    generateCaptchaImage();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
