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