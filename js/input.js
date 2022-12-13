class Input {
  constructor() {
    this.moneyMode = 'history';
    this.oldMoneyMode = 'history';
    this.inputTabadd = document.querySelector('.inputTabadd');
    this.inputTabsub = document.querySelector('.inputTabsub');
    this.inputTabCurrent = document.querySelector('.inputTabCurrent');
    const inputBtn = document.querySelector('.inputBtn');
    this.currentInput = document.querySelector('.currentInput');
    this.loopMoney = document.querySelector('.loopMoney');
    this.loopMoneyLimit = document.querySelector('.loopMoneyLimit');
    this.closeBtn = document.querySelector('.closeBtn');
    this.inputError = document.querySelector('.errorMessage');
    this.loopMoney = document.querySelector('.loopMoney');
    this.editMode = false; //編集中かどうか
    this.inputMoneyisAdd = false;
    this.currentInputMode = false;
    this.inputForm = document.forms.input;

    // 入力画面表示
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        input.inputError.textContent = '';
        input.editMode = false;
        input.closeBtn.textContent = '閉じる';
        if (screenMode === 'calendar') {
          let inputDate = `${year}-${( '00' + (month) ).slice( -2 )}-${( '00' + calendar.clickDate ).slice( -2 )}`
          input.inputMoneyValue('',inputDate,'',1,0,inputDate);
        } else {
          let inputDate = `${toYear}-${( '00' + (toMonth) ).slice( -2 )}-${( '00' + toDate ).slice( -2 )}`
          input.inputMoneyValue('',inputDate,'',1,0,inputDate);
        }
      }
    })

    // 収入ボタン
    this.inputTabadd.addEventListener('click',function() {
      document.querySelector('.inputSelect').classList.remove('inputSelect');
      input.inputTabadd.classList.add('inputSelect');
      input.inputMoneyisAdd = true;
      input.currentInputMode = false;
      input.currentInput.style.display = 'block';
      input.inputForm.money.className = 'green';
    })

    // 支出ボタン
    this.inputTabsub.addEventListener('click',function() {
      document.querySelector('.inputSelect').classList.remove('inputSelect');
      input.inputTabsub.classList.add('inputSelect');
      input.inputMoneyisAdd = false;
      input.currentInputMode = false;
      input.currentInput.style.display = 'block';
      input.inputForm.money.className = 'red';
    })

    // 所持金ボタン
    this.inputTabCurrent.addEventListener('click',function() {
      document.querySelector('.inputSelect').classList.remove('inputSelect');
      input.inputTabCurrent.classList.add('inputSelect');
      input.currentInputMode = true;
      input.inputForm.money.className = 'blue';
      input.currentInput.style.display = 'none';
    })

    // 日付詳細の使用履歴をクリックで編集
    moneyList.addEventListener('click',function(e) {
      input.moneyMode = 'history';
      input.oldMoneyMode = 'history';
      input.currentInputMode = false;
      input.moneyEditScreen(e.target,moneyList);
    })

    fixedList.addEventListener('click',function(e) {
      input.moneyMode = 'fixed';
      input.oldMoneyMode = 'fixed';
      input.currentInputMode = false;
      input.moneyEditScreen(e.target,fixedList);
    })

    dateMoney.addEventListener('click',function(e) {
      input.currentInputMode = true;
      input.moneyEditScreen(e.target,dateMoney);
    })

    // 登録ボタン
    inputBtn.addEventListener('click',function(e) {
      let inputDay = new Date(input.inputForm.date.value).getDay();
      let inputDate = input.inputForm.date.value.replace(/-/g, "");
      let inputLoop;
      if (input.LoopMode === false) {
        inputLoop = input.LoopMode;
      } else {
        inputLoop = input.inputForm.loopEnd.value.replace(/-/g, "");
      }
      input.addInputMoney(Number(input.inputForm.money.value),inputDate,input.inputForm.memo.value,inputDay,inputLoop);
    })

    // 閉じるボタン 削除ボタン
    this.closeBtn.addEventListener('click',function(e) {
      if (input.editMode) {
        input.editMode = false;
        input.closeBtn.textContent = '閉じる';
        if (input.currentInputMode) {
          delete setting.hiMoney.current[`${year}${( '00' + (month) ).slice( -2 )}${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`]
        } else {
          if (input.moneyMode === 'history') {
            setting.hiMoney.history[`${year}${( '00' + (month) ).slice( -2 )}${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`].splice(input.editNum,1);
          } else {
            setting.hiMoney.receipts.splice([weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index],1);
          }
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

    this.inputForm.loopLimit.addEventListener('change', function(){
      input.changeLoop();
    });
  }

  changeFrequency() {
    if (this.inputForm.frequency.selectedIndex === 1) {
      this.loopMoney.style.display = 'none';
      this.loopMoneyLimit.style.display = 'none';
      this.moneyMode = 'history';
      this.inputForm.loopLimit.options[0].selected = true;
      this.inputForm.loopEnd.value = this.inputForm.date.value;
    } else {
      this.loopMoney.style.display = 'block';
      this.moneyMode = 'fixed';
    }
  }

  changeLoop() {
    if (this.inputForm.loopLimit.selectedIndex === 0) {
      this.loopMoneyLimit.style.display = 'none';
      this.LoopMode = false;
      this.inputForm.loopEnd.value = this.inputForm.date.value;
    } else {
      this.loopMoneyLimit.style.display = 'block';
      this.LoopMode = this.inputForm.loopEnd.value;
    }
  }

  // 編集
  moneyEditScreen(clickMoney,clickElement) {
    let editweeksDate = weeks[calendar.moneyLine][calendar.moneyColumn][input.moneyMode][[].slice.call(clickElement.children).indexOf(clickMoney)];
    let editInputDate = `${year}-${( '00' + (month) ).slice( -2 )}-${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`;
    input.inputError.textContent = '';
    if (input.currentInputMode) {
      if (weeks[calendar.moneyLine][calendar.moneyColumn].currentMoney || weeks[calendar.moneyLine][calendar.moneyColumn].currentMoney === 0) {
        input.editMode = true;
        input.closeBtn.textContent = '消去';
      } else {
        input.editMode = false;
        input.closeBtn.textContent = '閉じる';
      }
      input.inputMoneyValue(weeks[calendar.moneyLine][calendar.moneyColumn].money,editInputDate,'',1,0,editInputDate);
    } else {
    // 記入済みかどうか
    if (editweeksDate) {
      let editInputMemo = editweeksDate.memo;
      let editInputMoney = editweeksDate.sum;
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
          let loopValue;
          let loopDate;
          if (setting.hiMoney.receipts[weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index].endDate === false) {
            loopValue = 0;
            loopDate = editInputDate;
          } else {
            loopDate = setting.hiMoney.receipts[weeks[calendar.moneyLine][calendar.moneyColumn].fixed[input.editNum].index].endDate;
            const loopInputYear = loopDate.substring(0, 4);  //2022
            const loopInpuMmonth = loopDate.substring(4, 6); //02
            const loopInputDay = loopDate.substring(6, 8);   //05
            loopDate = `${loopInputYear}-${loopInpuMmonth}-${loopInputDay}`
            loopValue = 1;
          }
          input.inputMoneyValue(editInputMoney,editInputDate,editInputMemo,frequencyValue,loopValue,loopDate);
        } else {
          input.inputMoneyValue(editInputMoney,editInputDate,editInputMemo,1,0,editInputDate);
        }
      } else {
        input.editMode = false;
        input.closeBtn.textContent = '閉じる';
        input.inputMoneyValue('',editInputDate,'',1,0,editInputDate);
      }
    }
  }

  // 入力画面の初期値設定
  inputMoneyValue(moneyValue,dateValue,memoValue,frequencyValue,loopValue,loopDate) {
    const inputBox = document.querySelector('.input');
    document.querySelector(`.select`).classList.remove('select');
    inputBox.classList.add('select');
    document.querySelector('.inputSelect').classList.remove('inputSelect');
    if (input.currentInputMode) {
      input.inputTabCurrent.classList.add('inputSelect');
      this.inputForm.money.className = 'blue';
      this.currentInput.style.display = 'none';
    } else {
      this.currentInput.style.display = 'block';
      if (Math.sign(moneyValue) === -1 ) {
        moneyValue = Math.abs(moneyValue);
        input.inputTabsub.classList.add('inputSelect');
        input.inputMoneyisAdd = false;
        input.inputForm.money.className = 'red';
      } else {
        input.inputTabadd.classList.add('inputSelect');
        input.inputMoneyisAdd = true;
        input.inputForm.money.className = 'green';
      }
    }
    input.inputForm.money.value = moneyValue;
    input.inputForm.date.value = dateValue;
    input.inputForm.memo.value = memoValue;
    input.inputForm.frequency.options[frequencyValue].selected = true;
    input.inputForm.loopLimit.options[loopValue].selected = true;
    input.inputForm.loopEnd.value = loopDate;

    input.changeFrequency();
    input.changeLoop();
  }

  // 登録処理
  addInputMoney(inputMoney,inputDate,inputMemo,inputDay,inputLoop) {
    if (input.currentInputMode) {
      if (inputDate) {
        moneyInfoBox.classList.remove('active');
        setting.hiMoney.current[inputDate] = inputMoney;
        changeScreen(screenMode);
        setting.save();
      } else {
        this.inputError.textContent = '日付が入力されていません';
      }
    } else {
      if (inputMoney && inputDate) {
        if (input.inputForm.date.value <= input.inputForm.loopEnd.value || inputLoop === false) {
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
                endDate:inputLoop,
                num:dateNum,
                sum:inputMoney,
              }
            )
          }
          
          changeScreen(screenMode);
          setting.save();
        } else {
          this.inputError.textContent = '開始日が終了日を超えています';
        }
      } else {
        this.inputError.textContent = '金額または日付が入力されていません';
      }
    }
  }
}