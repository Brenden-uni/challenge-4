// Call the displayHighScores function when the page loads
document.addEventListener("DOMContentLoaded", displayHighScores);

// Display high scores
function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresElement = document.getElementById("high-scores");
    highScoresElement.innerHTML = "";

    highScores.forEach(highScore => {
        const li = document.createElement("li");
        li.textContent = `${highScore.initials}: ${highScore.score}`;
        highScoresElement.appendChild(li);
    });
}

// Clear high scores
function clearScores() {
    localStorage.removeItem("highScores");
    displayHighScores();
}

// Event Listeners
document.getElementById("clear").addEventListener("click", clearScores);