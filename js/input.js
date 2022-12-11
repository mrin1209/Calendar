class Input {
  constructor() {
    this.moneyMode = 'history';
    this.oldMoneyMode = 'history';
    this.inputTabadd = document.querySelector('.inputTabadd');
    this.inputTabsub = document.querySelector('.inputTabsub');
    const inputBtn = document.querySelector('.inputBtn');
    this.loopMoney = document.querySelector('.loopMoney');
    this.closeBtn = document.querySelector('.closeBtn');
    this.inputError = document.querySelector('.errorMessage');
    this.loopMoney = document.querySelector('.loopMoney');
    this.editMode = false; //編集中かどうか
    this.inputMoneyisAdd = false;
    this.inputForm = document.forms.input;

    // 入力画面表示
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        input.inputError.textContent = '';
        input.editMode = false;
        input.closeBtn.textContent = '閉じる';
        if (screenMode === 'calendar') {
          input.inputMoneyValue('',`${year}-${( '00' + (month) ).slice( -2 )}-${( '00' + calendar.clickDate ).slice( -2 )}`,'',1);
        } else {
          input.inputMoneyValue('',`${toYear}-${( '00' + (toMonth) ).slice( -2 )}-${( '00' + toDate ).slice( -2 )}`,'',1);
        }
      }
    })

    // 収入ボタン
    this.inputTabadd.addEventListener('click',function() {
      input.inputTabsub.classList.remove('inputSelect');
      input.inputTabadd.classList.add('inputSelect');
      input.inputMoneyisAdd = true;
      input.inputForm.money.className = 'green';
    })

    // 支出ボタン
    this.inputTabsub.addEventListener('click',function() {
      document.querySelector('.inputSelect').classList.remove('inputSelect');
      input.inputTabadd.classList.remove('inputSelect');
      input.inputTabsub.classList.add('inputSelect');
      input.inputMoneyisAdd = false;
      input.inputForm.money.className = 'red';
    })

    // 日付詳細の使用履歴をクリックで編集
    moneyList.addEventListener('click',function(e) {
      input.moneyMode = 'history';
      input.oldMoneyMode = 'history';
      input.moneyEditScreen(e.target,moneyList);
    })

    fixedList.addEventListener('click',function(e) {
      input.moneyMode = 'fixed';
      input.oldMoneyMode = 'fixed';
      input.moneyEditScreen(e.target,fixedList);
    })

    // 登録ボタン
    inputBtn.addEventListener('click',function(e) {
      let inputDay = new Date(input.inputForm.date.value).getDay()
      let inputDate = input.inputForm.date.value.replace(/-/g, "")
      input.addInputMoney(Number(input.inputForm.money.value),inputDate,input.inputForm.memo.value,inputDay);
    })

    // 閉じるボタン 削除ボタン
    this.closeBtn.addEventListener('click',function(e) {
      if (input.editMode) {
        input.editMode = false;
        input.closeBtn.textContent = '閉じる';
        if (input.moneyMode === 'history') {
          console.log(setting.hiMoney.history[`${year}${( '00' + (month) ).slice( -2 )}${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`]);
          setting.hiMoney.history[`${year}${( '00' + (month) ).slice( -2 )}${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`].splice(input.editNum,1);
        } else {
          console.log(setting.hiMoney.receipts);
          setting.hiMoney.receipts.splice([weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index],1);
        }
        moneyInfoBox.classList.remove('active');
      }
      changeScreen(screenMode);
      setting.save();
    })

    // 繰り返しを設定したら
    this.inputForm.frequency.addEventListener('change', function(){
      input.changeFrequency();
    });
  }

  changeFrequency() {
    if (this.inputForm.frequency.selectedIndex === 1) {
      this.loopMoney.style.display = 'none';
      this.moneyMode = 'history';
    } else {
      this.loopMoney.style.display = 'block';
      this.moneyMode = 'fixed';
    }
  }

  // 編集
  moneyEditScreen(clickMoney,clickElement) {
    let editweeksDate = weeks[calendar.moneyLine][calendar.moneyColumn][input.moneyMode][[].slice.call(clickElement.children).indexOf(clickMoney)];
    let editInputDate = `${year}-${( '00' + (month) ).slice( -2 )}-${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`;
    input.inputError.textContent = '';
    // 記入済みかどうか
    if (editweeksDate) {
      let editInputMemo = editweeksDate.memo;
      let editInputMoney = editweeksDate.sum;
      document.querySelector('.inputSelect').classList.remove('inputSelect');
      if (Math.sign(editInputMoney) === -1 ) {
        editInputMoney = Math.abs(editweeksDate.sum);
        input.inputTabsub.classList.add('inputSelect');
        input.inputMoneyisAdd = false;
        input.inputForm.money.className = 'red';
      } else {
        input.inputTabadd.classList.add('inputSelect');
        input.inputMoneyisAdd = true;
        input.inputForm.money.className = 'green';
      }
      input.editMode = true;
      input.closeBtn.textContent = '消去';
      input.editNum = [].slice.call(clickElement.children).indexOf(clickMoney);
      if (input.moneyMode === 'fixed') {
        let frequencyValue = setting.hiMoney.receipts[weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index].frequency;
        editInputDate = setting.hiMoney.receipts[weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index].startDate;
          const editInputYear = editInputDate.substring(0, 4);  //2022
          const editInpuMmonth = editInputDate.substring(4, 6); //02
          const editInputDay = editInputDate.substring(6, 8);   //05
          editInputDate = `${editInputYear}-${editInpuMmonth}-${editInputDay}`
          switch (frequencyValue) {
            case 'date':
              frequencyValue = 0;
              break;
            case 'week':
              frequencyValue = 2;
              break;
            case 'month':
              frequencyValue = 3;
              break;
            case 'year':
              frequencyValue = 4;
              break;
          }
        input.inputMoneyValue(editInputMoney,editInputDate,editInputMemo,frequencyValue);
      } else {
        input.inputMoneyValue(editInputMoney,editInputDate,editInputMemo,1);
      }
    } else {
      input.editMode = false;
      input.closeBtn.textContent = '閉じる';
      input.inputMoneyValue('',editInputDate,'',1);
    }
  }

  // 入力画面の初期値設定
  inputMoneyValue(moneyValue,dateValue,memoValue,frequencyValue) {
    const inputBox = document.querySelector('.input');
    document.querySelector(`.select`).classList.remove('select');
    inputBox.classList.add('select');
    input.inputForm.money.value = moneyValue;
    input.inputForm.date.value = dateValue;
    input.inputForm.memo.value = memoValue;
    input.inputForm.frequency.options[frequencyValue].selected = true;
    input.changeFrequency();
  }

  // 登録処理
  addInputMoney(inputMoney,inputDate,inputMemo,inputDay) {
    if (inputMoney && inputDate) {
      moneyInfoBox.classList.remove('active');
      if (!input.inputMoneyisAdd) {
        inputMoney = -(inputMoney);
      }
      if (input.editMode) {
        if (input.oldMoneyMode === 'history') {
          setting.hiMoney.history[`${year}${( '00' + (month) ).slice( -2 )}${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`].splice(input.editNum,1);
        } else {
          setting.hiMoney.receipts.splice([weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index],1);
        }
      }
      if (input.moneyMode === 'history') {
        if (!setting.hiMoney.history[inputDate]) {
          setting.hiMoney.history[inputDate] = [];
        }
  
        setting.hiMoney.history[inputDate].push(
          {
            memo:inputMemo,
            sum:inputMoney,
          }
        )
      } else {
        let dateNum;
        if (!setting.hiMoney.receipts[this.editNum]) {
          setting.hiMoney.history[inputDate] = [];
        }
        switch (input.inputForm.frequency.options[input.inputForm.frequency.selectedIndex].value) {
          case 'date':
            dateNum = [0];
            break;
          case 'week':
            dateNum = [inputDay];
            break;
          case 'month':
            dateNum = [inputDate.slice(-2)];
            break;
          case 'year':
            dateNum = [[month,inputDate.slice(-2)]];
            break;
        }

        setting.hiMoney.receipts.push(
          {
            frequency:[input.inputForm.frequency.options[input.inputForm.frequency.selectedIndex].value][0],
            memo:inputMemo,
            startDate:inputDate,
            num:dateNum,
            sum:inputMoney,
          }
        )
      }
      
      changeScreen(screenMode);
      setting.save();
    } else {
      this.inputError.textContent = '金額または日付が入力されていません';
    }
  }
}