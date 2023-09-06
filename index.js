const arr = []; //Массив 10х10

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Минимально возможное число
let minValue = {
  value: 101,
  index: 0,
};

//Карта минимальных положитльных чисел
let minPositiveNumMap = {};

//Карта повторений
let repeatedMap = {};

for (let i = 0; i < 10; i++) {
  const subArr = [];
  let minPositiveNum = 101;
  let cntRepeatedNum = 0;
  let cntPos = 0;
  let cntNeg = 0;
  for (let y = 0; y < 10; y++) {
    const randomNum = getRandomNum(-100, 100);

    if (randomNum >= 0) {
      //Повторения положительных чисел
      ++cntPos;
      if (subArr[y - 1] < 0 || y === 9) {
        if (cntNeg >= 3) {
          cntRepeatedNum += Math.floor(cntNeg / 3);
        }

        if (y === 9 && cntPos >= 3) {
          cntRepeatedNum += Math.floor(cntPos / 3);
        }

        cntNeg = 0;
      }
    }

    if (randomNum < 0) {
      //Повторение отрицательных чисел
      ++cntNeg;
      if (subArr[y - 1] >= 0 || y === 9) {
        if (cntPos >= 3) {
          cntRepeatedNum += Math.floor(cntPos / 3);
        }

        if (y === 9 && cntNeg >= 3) {
          cntRepeatedNum += Math.floor(cntNeg / 3);
        }

        cntPos = 0;
      }
    }

    if (randomNum < minPositiveNum && randomNum > 0) {
      minPositiveNum = randomNum; //Получение минимального положительного числа
    }

    if (randomNum < minValue.value) {
      minValue.value = randomNum; //Получение минимального числа
      minValue.index = i;
    }

    subArr.push(randomNum);
  }

  minPositiveNumMap[i] = { minNum: minPositiveNum };
  repeatedMap[i] = { repeated: cntRepeatedNum };
  arr.push(subArr);
}

//Итоговая таблица
const tableObject = {};

arr.forEach((elem, index) => {
  if (index === minValue.index) {
    tableObject["*"] = elem;
    tableObject["*"].push({
      min:
        minPositiveNumMap[String(index)].minNum === 101
          ? null
          : minPositiveNumMap[String(index)].minNum,
      replace: repeatedMap[String(index)].repeated,
    });
  } else {
    tableObject[index] = elem;
    tableObject[index].push({
      min:
        minPositiveNumMap[String(index)].minNum === 101
          ? null
          : minPositiveNumMap[String(index)].minNum,
      replace: repeatedMap[String(index)].repeated,
    });
  }
});

console.table(tableObject);
