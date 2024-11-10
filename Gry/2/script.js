const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔', '💰'];
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');
const balanceDisplay = document.getElementById('balance');
const betInput = document.getElementById('bet-input');

let balance = 500;
let winChance = 40;
let isSpinning = false;

spinButton.addEventListener('click', () => {
    if (isSpinning) return;

    const betAmount = parseInt(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        resultDisplay.textContent = 'Wprowadź prawidłową kwotę obstawienia!';
        return;
    }

    balance -= betAmount;
    updateBalanceDisplay();

    const slots = document.querySelectorAll('.slot');
    const spinDuration = 1500;
    const intervalDuration = 100;
    isSpinning = true;

    slots.forEach(slot => {
        slot.classList.add('spinning');
    });

    const spinInterval = setInterval(() => {
        slots.forEach(slot => {
            slot.textContent = getRandomSymbol();
        });
    }, intervalDuration);

    setTimeout(() => {
        clearInterval(spinInterval);

        const winRoll = Math.random() * 100;

        let finalSlots;
        if (winRoll < winChance) {
            const winningSymbol = getRandomSymbol();
            finalSlots = [winningSymbol, winningSymbol, winningSymbol, winningSymbol, winningSymbol, winningSymbol];
        } else {
            finalSlots = Array(6).fill().map(() => getRandomSymbol());
        }

        slots.forEach((slot, index) => {
            slot.textContent = finalSlots[index];
            slot.classList.remove('spinning');
        });

        checkResult(finalSlots, betAmount);

        setTimeout(() => {
            isSpinning = false;
        }, 1000);
    }, spinDuration);
});

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkResult(finalSlots, betAmount) {
    if (finalSlots.every(slot => slot === finalSlots[0])) {
        const winnings = betAmount * 10;
        balance += winnings;
        resultDisplay.textContent = `Gratulacje! Wygrałeś: ${winnings}!`;
    } else {
        resultDisplay.textContent = 'Spróbuj ponownie!';
    }
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    balanceDisplay.textContent = `Saldo: ${balance}`;
}
