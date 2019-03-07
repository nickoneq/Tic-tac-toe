let ceil = document.getElementsByClassName('game-item'),
	reset = document.getElementById('reset-game'),
	message = document.getElementById('message'),
	player = 'X',
	stepCount = 0,
	winCombinations = [
		[1, 2, 3],
		[1, 4, 7],
		[1, 5, 9],
		[2, 5, 8],
		[3, 6, 9],
		[4, 5, 6],
		[7, 8, 9],
		[3, 5, 7]
	],
	dataX = [],
	dataO = [];

for (let i = 0; i < ceil.length; i++) {
	ceil[i].addEventListener('click', currentStep);
}

/////////// ход игрока
function currentStep() {
	let num = +this.getAttribute('data-ceil');

	if (!this.textContent) {
		this.innerText = player;
		player === 'X' ? dataX.push(num) && this.classList.add('x') : dataO.push(num) && this.classList.add('o');
		if (
			(dataX.length > 2 || dataO.length > 2) &&
			(checkWin(dataO, num) || checkWin(dataX, num))
		) {
			for (let i = 0; i < ceil.length; i++) {
				ceil[i].removeEventListener('click', currentStep);
			}
			return message.innerText = 'Победил игрок ' + player
		}
		changePlayer();
		stepCount++;
		stepCount === 9 ? message.innerText = 'Ничья' : message.innerText = 'Ходит игрок ' + player;
	}
}

///////// смена игрока
function changePlayer() {
	player === 'X' ? player = 'O' : player = 'X';
}

///////// очистка поля
reset.addEventListener('click', function () {
	for (let i = 0; i < ceil.length; i++) {
		ceil[i].innerText = '';
		dataX = [];
		dataO = [];
		player = 'X';
		stepCount = 0;
		message.innerText = 'Ходит игрок ' + player;
		for (let i = 0; i < ceil.length; i++) {
				ceil[i].addEventListener('click', currentStep);
				ceil[i].classList.remove('x', 'o');
			}
	}
})

//////////// проверка победителя
function checkWin(arr, number) {
	for (let i = 0; i < winCombinations.length; i++) {
		let someWinArr = winCombinations[i],
			count = 0;
		if (someWinArr.indexOf(number) !== -1) {
			for (let i = 0; i < someWinArr.length; i++) {
				if (arr.indexOf(someWinArr[i]) !== -1) {
					count++;
					if (count === 3) {
						return true;
					}
				}
			}
			count = 0;
		}
	}
}