class Input {
  constructor() {
    const inputTab = document.querySelectorAll('.inputTab');
    const inputList = document.querySelectorAll('.inputList');
    const inputBox = document.querySelector('.input');
    this.inputMoney = document.querySelector('.inputMoney');
    this.inputDate = document.querySelector('.inputDate');
    this.inputMemo = document.querySelector('.inputMemo');
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        document.querySelector(`.select`).classList.remove('select');
        inputBox.classList.add('select');
        if (screenMode === 'calendar') {
          input.enterAmount(year,month+1,calendar.clickDate);
        } else {
          input.enterAmount(year,month+1,toDate);
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

      })
    })
  }

  enterAmount(year,month,date) {
    console.log(`${year}-${month}-${date}`);
    this.inputMoney.value = '';
    this.inputDate.value = `${year}-${month}-${date}`;
    this.inputMemo.value = '';
  }
}