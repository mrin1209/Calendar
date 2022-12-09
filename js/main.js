const setting = new Setting();

const today = new Date();
const toYear =today.getFullYear();
const toMonth  = today.getMonth() +1;
const toDate =  today.getDate();
let year = toYear;
let month = toMonth;
let weeks;
let screenMode = 'start';
let loadYear = String(setting.hiMoney.startDate).slice(0, 4);
let loadMonth = String(setting.hiMoney.startDate).slice(4, 6);
const moneyInfoBox = document.querySelector('.moneyInfoBox');
const title = document.querySelector('.title');
const dateList = document.querySelectorAll('.dateList tr');
const moneyList = document.querySelector('.moneyList');
const fixedList = document.querySelector('.fixedList');

const money = new Money();
const display = new Display();
const calendar = new Calendar(year,month);
const input = new Input();

while (`${loadYear}${loadMonth}` != `${toYear}${toMonth}`) {
  calendar.createCalendar(loadYear,loadMonth);
  loadMonth++
  if(loadMonth > 11){
    loadYear++
    loadMonth = 0
  }
}

function changeScreen(target) {
  document.querySelectorAll(`.select`).forEach(function(element) {
    element.classList.remove('select');
  });
  // 年月表示
  title.textContent = `${year}/${month}月`;
  document.querySelectorAll(`.${target}`).forEach(function(element) {
    element.classList.add('select');
  });
  weeks = calendar.createCalendar(year,month);
  switch (target) {
    case 'calendar':
      display.displayCalendar(weeks);
      break;
    case 'list':
      display.displayList(weeks,year,month);
      break;
    case 'setting':
      display.displaySetting(weeks,year,month);
      break;
    default:
      display.displayStart(weeks,year,month);
      break;
  }
}

document.addEventListener('click',function(e) {
  switch (e.target.className.split(' ')[0]) {
    case 'prev': //前へ
      month--
      if(month < 1){
        year--;
        month = 12;
      }
      changeScreen(screenMode);
      break
    case 'next': //次へ
      month++
      if(month > 12){
        year++;
        month = 1;
      }
      changeScreen(screenMode);
      break
    case 'menuBtn':
      screenMode = e.target.className.split(' ')[1];
      changeScreen(screenMode);
      break
  }
});

changeScreen(screenMode);