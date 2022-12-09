class Input {
  constructor() {
    const inputTab = document.querySelectorAll('.inputTab');
    const inputBox = document.querySelector('.input');
    const inputBtn = document.querySelector('.inputBtn');
    this.inputMoneyisAdd = false;
    this.inputMoney = document.querySelector('.inputMoney');
    this.inputDate = document.querySelector('.inputDate');
    this.inputMemo = document.querySelector('.inputMemo');
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        document.querySelector(`.select`).classList.remove('select');
        inputBox.classList.add('select');
        if (screenMode === 'calendar') {
          input.inputValue(year,( '00' + (month) ).slice( -2 ),( '00' + calendar.clickDate ).slice( -2 ));
        } else {
          input.inputValue(toYear,( '00' + (toMonth) ).slice( -2 ),( '00' + toDate ).slice( -2 ));
        }
      }
    }) 

    inputTab.forEach(function(element) {
      element.addEventListener('click',function(e) {
        document.querySelector('.inputSelect').classList.remove('inputSelect');
        e.target.classList.add('inputSelect');
        input.inputMoneyisAdd = !input.inputMoneyisAdd;
      })
    })

    inputBtn.addEventListener('click',function(e) {
      input.addInputMoney(Number(input.inputMoney.value),input.inputDate.value,input.inputMemo.value);
    })
  }

  addInputMoney(inputMoney,inputDate,inputMemo) {
    moneyInput.classList.remove('active');
    const inputError = document.querySelector('.errorMessage');
    if (!this.inputMoneyisAdd) {
      inputMoney = -(inputMoney);
    }
    if (inputMoney && inputDate) {
      if (!setting.hiMoney.history[inputDate]) {
        setting.hiMoney.history[inputDate] = [];
      }

      setting.hiMoney.history[inputDate].push(
      {
        memo:inputMemo,
        sum:inputMoney,
      })
      inputError.textContent = '';
      changeScreen(screenMode);
      setting.save();
    } else {
      inputError.textContent = '金額または日付が入力されていません';
    }
  }

  inputValue(year,month,date) {
    this.inputMoney.value = '';
    this.inputDate.value = `${year}-${month}-${date}`;
    this.inputMemo.value = '';
  }
}