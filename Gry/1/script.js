const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔', '💰'];
const spinButton = document.getElementById('spin-button');
const depositButton = document.getElementById('deposit-button');
const resultDisplay = document.getElementById('result');
const balanceDisplay = document.getElementById('balance');
const betInput = document.getElementById('bet-input');

let balance = 500; // Początkowe saldo
let winChance = 50; // Szansa na wygraną w procentach (można ustawić dowolną wartość od 0 do 100)
let isSpinning = false; // Zmienna kontrolująca, czy animacja jest w toku

// Obsługa obrotu
spinButton.addEventListener('click', () => {
    if (isSpinning) return; // Jeśli animacja jest w toku, blokujemy możliwość kolejnego zakręcenia

    const betAmount = parseInt(betInput.value); // Kwota obstawiona przez gracza

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        resultDisplay.textContent = 'Wprowadź prawidłową kwotę obstawienia!';
        return;
    }

    balance -= betAmount; // Odejmujemy kwotę zakładu od salda
    updateBalanceDisplay();

    const slots = document.querySelectorAll('.slot');
    const spinDuration = 1500; // Czas trwania animacji losowania
    const intervalDuration = 100; // Czas między zmianami emotek
    isSpinning = true; // Ustawiamy, że animacja jest w toku

    slots.forEach(slot => {
        slot.classList.add('spinning'); // Dodajemy klasę animacji
    });

    const spinInterval = setInterval(() => {
        slots.forEach(slot => {
            slot.textContent = getRandomSymbol();
        });
    }, intervalDuration);

    setTimeout(() => {
        clearInterval(spinInterval); // Zatrzymujemy losowanie

        const winRoll = Math.random() * 100; // Losowa wartość od 0 do 100

        let finalSlots;
        if (winRoll < winChance) {
            // Jeśli trafiliśmy w zakres wygranej, ustawiamy identyczne symbole
            const winningSymbol = getRandomSymbol();
            finalSlots = [winningSymbol, winningSymbol, winningSymbol];
        } else {
            // W przeciwnym razie losujemy różne symbole
            finalSlots = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
        }

        // Ustawienie końcowych symboli i zakończenie animacji
        slots.forEach((slot, index) => {
            slot.textContent = finalSlots[index];
            slot.classList.remove('spinning'); // Usuwamy klasę animacji
        });

        checkResult(finalSlots[0], finalSlots[1], finalSlots[2], betAmount);
        
        // Opóźnienie przed odblokowaniem kolejnego zakręcenia
        setTimeout(() => {
            isSpinning = false; // Odblokowujemy możliwość kolejnego zakręcenia po sekundzie
        }, 1000); // Opóźnienie 1 sekundy

    }, spinDuration);
});

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkResult(slot1, slot2, slot3, betAmount) {
    // Zasady wygranej: wszystkie sloty muszą być takie same
    if (slot1 === slot2 && slot2 === slot3 && slot2 === slot3) {
        const winnings = betAmount * 10; // Wycena wygranej
        balance += winnings; // Dodajemy wygraną do salda
        resultDisplay.textContent = `Gratulacje! Wygrałeś: ${winnings}!`;
    } else {
        resultDisplay.textContent = 'Spróbuj ponownie!';
    }
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    balanceDisplay.textContent = `Saldo: ${balance}`;
}

// Formularz z Hasłem
function checkPassword() {
    const password = document.getElementById("password").value;
    const correctPassword = "mojehaslo"; // Wpisz swoje hasło
    const errorMessage = document.getElementById("error-message");

    if (password === correctPassword) {
        // Zapisz informację o zalogowaniu w Local Storage
        localStorage.setItem("isAuthenticated", "true");
        // Przekierowanie do strony docelowej
        window.location.href = "success.html";
    } else {
        errorMessage.textContent = "Nieprawidłowe hasło. Spróbuj ponownie.";
    }
}
