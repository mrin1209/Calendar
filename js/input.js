class Input {
  constructor() {
    const inputTab = document.querySelectorAll('.inputTab');
    const inputList = document.querySelectorAll('.inputList');
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        if (screenMode === 'calendar') {
          input.enterAmount(year,month,calendar.clickDate);
        } else {
          input.enterAmount(year,month,toDate);
        }
      }
    }) 

    inputTab.forEach(function(element) {
      element.addEventListener('click',function(e) {
        document.querySelector('.inputSelect').classList.remove('inputSelect');
        e.target.classList.add('inputSelect');
      })
    })

    inputList.forEach(function(element) {
      element.addEventListener('click',function(e) {
        console.log('a');
      })
    })
  }

  enterAmount(year,month,date) {
    console.log(year,month,date);
    
  }
}