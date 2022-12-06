const today = new Date();
const toYear =today.getFullYear();
const toMonth  = today.getMonth();
const toDate =  today.getDate();
let year = toYear;
let month = toMonth;
let weeks;
let loadYear = String(setting.hiMoney.startDate).slice(0, 4);
let loadMonth = String(setting.hiMoney.startDate).slice(4, 6);
const calendar = new Calendar(year,month);
while (`${loadYear}${loadMonth}` != `${toYear}${toMonth}`) {
  calendar.createCalendar(loadYear,loadMonth);
  loadMonth++
  if(loadMonth > 11){
    loadYear++
    loadMonth = 0
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
      weeks = calendar.createCalendar(year,month);
      calendar.displayCalendar(weeks,year,month);
      break
    case 'next': //次へ
      month++
      if(month > 11){
        year++
        month = 0
      }
      weeks = calendar.createCalendar(year,month);
      calendar.displayCalendar(weeks,year,month);
      break
  }
});

weeks = calendar.createCalendar(year,month);
calendar.displayCalendar(weeks,year,month);