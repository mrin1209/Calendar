class Input {
  constructor() {
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        if (screenMode === 'calendar') {
          input.enterAmount(year,month,calendar.clickDate);
        } else {
          input.enterAmount(year,month,toDate);
        }
      }
    }) 
  }

  enterAmount(year,month,date) {
    console.log(year,month,date);
  }
}