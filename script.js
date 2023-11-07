// Lấy các phần tử HTML
const betAmountInput = document.getElementById("bet-amount");
const oddButton = document.querySelector(".button-odd");
const evenButton = document.querySelector(".button-even");
const resultSection = document.querySelector(".result-section");
const resultText = document.getElementById("result");
const playAgainButton = document.querySelector(".button-play-again");

// Bắt đầu trò chơi khi người dùng chọn Chẵn hoặc Lẻ
oddButton.addEventListener("click", playGame);
evenButton.addEventListener("click", playGame);
playAgainButton.addEventListener("click", resetGame);

function playGame() {
  // Lấy giá trị đặt cược của người chơi
  const betAmount = Number(betAmountInput.value);

  // Tạo số ngẫu nhiên từ 1 đến 6
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const dice3 = Math.floor(Math.random() * 6) + 1;

  // Xác định kết quả Tài Xỉu
  let result = dice1 + dice2 + dice3;
  if (result >= 11 && result <= 17) {
    result = "Tài";
  } else if (result >= 4 && result <= 10) {
    result = "Xỉu";
  }

  resultText.innerText = `Kết quả: ${result}`;
  resultSection.style.display = "block";

  // Hiển thị kết quả và cập nhật số tiền của người chơi
// Thay thế alert bằng SweetAlert
if (result === "Tài") {
  const winnings = betAmount * 2;

  // Sử dụng SweetAlert để hiển thị thông báo thay vì alert
  Swal.fire({
    icon: 'success',
    title: 'Thắng!',
    text: `Bạn đã thắng ${winnings}`,
  });

  betAmountInput.value = winnings;
} else {
  betAmountInput.value = 0;

  // Sử dụng SweetAlert để hiển thị thông báo thay vì alert
  Swal.fire({
    icon: 'error',
    title: 'Thua!',
    text: `Bạn đã thua ${betAmount}`,
  });
}


  // Reset game sau 5 giây
}


// Hàm reset game
function resetGame() {
  // Declare the countdownTimer variable
  let countdownTimer;

  // Reset giá trị đặt cược và kết quả
  betAmountInput.value = "";
  resultText.innerText = "";
  resultSection.style.display = "none";
  
  // Tạm dừng bất kỳ hoạt động nào đang chạy
  clearInterval(countdownTimer);

  // Bắt đầu đếm ngược lại từ 3
  let timeLeft = 3;
  playAgainButton.disabled = true;
  playAgainButton.innerText = `Chơi lại (${timeLeft}s)`;

  // Assign the countdownTimer variable to setInterval()
  countdownTimer = setInterval(function() {
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(countdownTimer);
      playAgainButton.disabled = false;
      playAgainButton.innerText = "Chơi lại";
    } else {
      playAgainButton.innerText = `Chơi lại (${timeLeft}s)`;
    }
  }, 1000);
}

