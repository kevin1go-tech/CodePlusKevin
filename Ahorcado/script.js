document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const playButton = document.getElementById('playButton');
    const winModal = document.getElementById('winModal');
    const restartButton = document.getElementById('restartButton');
    const closeButton = document.querySelector('.close');

    const drawHanger = () => {
        ctx.beginPath();
        ctx.moveTo(50, 350);
        ctx.lineTo(150, 350);
        ctx.lineTo(100, 300);
        ctx.lineTo(50, 350);
        ctx.lineTo(50, 50);
        ctx.lineTo(200, 50);
        ctx.lineTo(200, 100);
        ctx.stroke();
    };

    const drawMan = (step) => {
        switch (step) {
            case 1:
                ctx.beginPath();
                ctx.arc(200, 150, 50, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 2:
                ctx.beginPath();
                ctx.moveTo(200, 200);
                ctx.lineTo(200, 300);
                ctx.stroke();
                break;
            case 3:
                ctx.beginPath();
                ctx.moveTo(200, 220);
                ctx.lineTo(150, 250);
                ctx.stroke();
                break;
            case 4:
                ctx.beginPath();
                ctx.moveTo(200, 220);
                ctx.lineTo(250, 250);
                ctx.stroke();
                break;
            case 5:
                ctx.beginPath();
                ctx.moveTo(200, 300);
                ctx.lineTo(150, 350);
                ctx.stroke();
                break;
            case 6:
                ctx.beginPath();
                ctx.moveTo(200, 300);
                ctx.lineTo(250, 350);
                ctx.stroke();
                break;
            default:
                break;
        }
    };

    const drawGameOver = () => {
        winModal.style.display = 'block';
    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHanger();
    };

    let gameStarted = false;
    let gameOver = false;
    let step = 0;

    playButton.addEventListener('click', () => {
        if (!gameOver) {
            if (!gameStarted) {
                clearCanvas();
                gameStarted = true;
            } else {
                step++;
                drawMan(step);
                if (step >= 6) {
                    drawGameOver();
                    gameOver = true;
                }
            }
        }
    });

    restartButton.addEventListener('click', () => {
        winModal.style.display = 'none';
        gameStarted = false;
        gameOver = false;
        step = 0;
        clearCanvas();
    });

    closeButton.addEventListener('click', () => {
        winModal.style.display = 'none';
    });
});
