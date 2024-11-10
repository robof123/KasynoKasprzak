const logoutButton = document.getElementById('logout');
const lobbyButton = document.getElementById('lobbyButton');  // Dodanie referencji do przycisku "Wróć do lobby"

// Sprawdzenie, czy użytkownik jest zalogowany
if (localStorage.getItem("isAuthenticated") !== "true") {
    // Jeśli nie, przekierowanie z powrotem na stronę logowania
    window.location.href = "../index.html";
} else {
    // Ustawienie timera do automatycznego wylogowania po 10 sekundach
    setTimeout(() => {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "../index.html";
    }, 10000); // 10 sekund
}

// Obsługa wylogowania po kliknięciu przycisku
logoutButton.addEventListener('click', () => {
    localStorage.removeItem("isAuthenticated");
    window.location.href = "../index.html";
});


