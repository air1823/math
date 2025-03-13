let question;
let correctAnswer;
let options = [];
let selectedOption = null;
let submitButton;
let retryButton;
let showError = false;
let errorTimer = 0;
let correctCount = 0;
let incorrectCount = 0;
let questionCount = 0;
const maxQuestions = 10;

function setup() {
  createCanvas(windowWidth, windowHeight); // 創建與螢幕大小相同的畫布
  background('#cdb4db'); // 設置背景顏色為黃色
  generateQuestion(); // 生成隨機數學算式題目

  submitButton = createButton('提交答案');
  submitButton.position(10, 10); // 將按鈕放在左上角
  submitButton.mousePressed(checkAnswer); // 設置按鈕點擊事件

  retryButton = createButton('再來一次');
  retryButton.position(windowWidth / 2 - 50, windowHeight / 2 + 50); // 將按鈕放在畫布中間下方
  retryButton.mousePressed(retryQuiz); // 設置按鈕點擊事件
  retryButton.hide(); // 初始隱藏按鈕
}

function draw() {
  background('#cdb4db'); // 確保背景顏色為黃色
  fill('black'); // 設置文字顏色為黑色
  textSize(32); // 設置文字大小
  textAlign(RIGHT, TOP); // 設置文字對齊方式為右上角
  text('413730549 教科一B 林愛倪', windowWidth - 10, 10); // 在右上角顯示文字，並留出10像素的邊距

  textAlign(LEFT, TOP); // 設置文字對齊方式為左上角
  textSize(24); // 設置文字大小
  text(`答對題數: ${correctCount}`, 10, 50); // 顯示答對題數
  text(`答錯題數: ${incorrectCount}`, 10, 80); // 顯示答錯題數

  if (questionCount >= maxQuestions) {
    textAlign(CENTER, CENTER);
    textSize(48);
    text('好厲害!全部都做完了!', windowWidth / 2, windowHeight / 2);
    retryButton.show(); // 顯示再來一次按鈕
    return;
  }

  retryButton.hide(); // 隱藏再來一次按鈕

  textAlign(CENTER, CENTER); // 設置文字對齊方式為中間
  text(question, windowWidth / 2, windowHeight / 2 - 50); // 在畫布中間顯示題目

  textSize(24); // 設置選項文字大小
  textAlign(LEFT, CENTER); // 設置選項文字對齊方式為左中
  for (let i = 0; i < options.length; i++) {
    let x = windowWidth / 2 - 200 + i * 100; // 設置選項的橫排位置
    let y = windowHeight / 2 + 50; // 設置選項的縱排位置
    ellipse(x - 20, y, 20, 20); // 繪製圓圈
    if (selectedOption === i) {
      fill('blue'); // 如果選中，填充藍色
      ellipse(x - 20, y, 10, 10); // 繪製小圓圈表示選中
      fill('black'); // 恢復文字顏色
    }
    text(options[i], x, y); // 顯示選項
  }

  if (showError) {
    fill('red');
    textSize(64);
    textAlign(CENTER, CENTER);
    text('✖', windowWidth / 2, windowHeight / 2);
    errorTimer--;
    if (errorTimer <= 0) {
      showError = false;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < options.length; i++) {
    let x = windowWidth / 2 - 200 + i * 100; // 設置選項的橫排位置
    let y = windowHeight / 2 + 50; // 設置選項的縱排位置
    if (dist(mouseX, mouseY, x - 20, y) < 10) {
      selectedOption = i; // 設置選中的選項
    }
  }
}

function checkAnswer() {
  if (options[selectedOption] === correctAnswer) {
    correctCount++; // 增加答對題數
  } else {
    incorrectCount++; // 增加答錯題數
    showError = true; // 顯示錯誤標記
    errorTimer = 60; // 設置錯誤標記顯示時間
  }
  questionCount++;
  if (questionCount < maxQuestions) {
    generateQuestion(); // 生成下一題
  }
  selectedOption = null; // 重置選中的選項
}

function generateQuestion() {
  const operations = ['+', '-', '*', '/'];
  const operation = random(operations);
  let num1, num2;

  if (operation === '/') {
    num1 = floor(random(1, 10)) * floor(random(1, 10)); // 确保 num1 是 num2 的倍数
    num2 = floor(random(1, 10));
  } else {
    num1 = floor(random(1, 10));
    num2 = floor(random(1, 10));
  }

  switch (operation) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case '*':
      correctAnswer = num1 * num2;
      break;
    case '/':
      correctAnswer = num1 / num2;
      break;
  }

  question = `${num1} ${operation} ${num2} = ?`;

  options = [correctAnswer];
  while (options.length < 5) {
    let option = floor(random(1, 20));
    if (!options.includes(option)) {
      options.push(option);
    }
  }

  shuffle(options, true); // 隨機打亂選項順序
}

function retryQuiz() {
  correctCount = 0;
  incorrectCount = 0;
  questionCount = 0;
  generateQuestion(); // 生成新題目
  selectedOption = null; // 重置選中的選項
  retryButton.hide(); // 隱藏再來一次按鈕
}