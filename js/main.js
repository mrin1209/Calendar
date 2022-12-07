const setting = new Setting();

const today = new Date();
const toYear =today.getFullYear();
const toMonth  = today.getMonth();
const toDate =  today.getDate();
let year = toYear;
let month = toMonth;
let weeks;
let loadYear = String(setting.hiMoney.startDate).slice(0, 4);
let loadMonth = String(setting.hiMoney.startDate).slice(4, 6);
const moneyInput = document.querySelector('.moneyInput');
const title = document.querySelector('.title');
const dateList = document.querySelector('.dateList');

const money = new Money();
const display = new Display();
const calendar = new Calendar(year,month);

while (`${loadYear}${loadMonth}` != `${toYear}${toMonth}`) {
  calendar.createCalendar(loadYear,loadMonth);
  loadMonth++
  if(loadMonth > 11){
    loadYear++
    loadMonth = 0
  }
}

function changeScreen() {
  // 年月表示
  title.textContent = `${year}/${month + 1}月`;
  const mode = new URL(window.location.href).searchParams.get("mode");
  if (mode === null) {
    document.querySelectorAll('.start').forEach(function(element) {
      element.classList.add('select');
    });
  } else {
    document.querySelectorAll(`.${mode}`).forEach(function(element) {
      element.classList.add('select');
    });
  }
  weeks = calendar.createCalendar(year,month);
  switch (mode) {
    case 'calendar':
      display.displayCalendar(weeks,year,month);
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
  switch (e.target.className) {
    case 'prev': //前へ
      month--
      if(month < 0){
        year--
        month = 11
      }
      changeScreen();
      break
    case 'next': //次へ
      month++
      if(month > 11){
        year++
        month = 0
      }
      changeScreen();
      break
  }
});

changeScreen();