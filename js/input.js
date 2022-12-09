class Input {
  constructor() {
    this.inputTabadd = document.querySelector('.inputTabadd');
    this.inputTabsub = document.querySelector('.inputTabsub');
    const inputBtn = document.querySelector('.inputBtn');
    const closeBtn = document.querySelector('.closeBtn');
    this.inputError = document.querySelector('.errorMessage');
    this.editMode = false; //編集中かどうか
    this.inputMoneyisAdd = false;
    this.inputMoney = document.querySelector('.inputMoney');
    this.inputDate = document.querySelector('.inputDate');
    this.inputMemo = document.querySelector('.inputMemo');

    // 入力画面表示
    document.addEventListener('click',function(e) {
      if (e.target.className === 'addMoney') {
        input.inputError.textContent = '';
        input.editMode = false;
        closeBtn.textContent = '閉じる';
        if (screenMode === 'calendar') {
          input.inputMoneyValue('',`${year}-${( '00' + (month) ).slice( -2 )}-${( '00' + calendar.clickDate ).slice( -2 )}`,'');
        } else {
          input.inputMoneyValue('',`${toYear}-${( '00' + (toMonth) ).slice( -2 )}-${( '00' + toDate ).slice( -2 )}`,'');
        }
      }
    })

    // 収入ボタン
    this.inputTabadd.addEventListener('click',function() {
      input.inputTabsub.classList.remove('inputSelect');
      input.inputTabadd.classList.add('inputSelect');
      input.inputMoneyisAdd = true;
      input.inputMoney.className = 'green';
    })

    // 支出ボタン
    this.inputTabsub.addEventListener('click',function() {
      document.querySelector('.inputSelect').classList.remove('inputSelect');
      input.inputTabadd.classList.remove('inputSelect');
      input.inputTabsub.classList.add('inputSelect');
      input.inputMoneyisAdd = false;
      input.inputMoney.className = 'red';
    })

    // 日付詳細の使用履歴をクリックで編集
    moneyList.addEventListener('click',function(e) {
      let editweeksDate = weeks[calendar.moneyLine][calendar.moneyColumn].history[[].slice.call(moneyList.children).indexOf(e.target)];
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
          input.inputMoney.className = 'red';
        } else {
          input.inputTabadd.classList.add('inputSelect');
          input.inputMoneyisAdd = true;
          input.inputMoney.className = 'green';
        }
        input.editMode = true;
        closeBtn.textContent = '消去';
        input.editNum = [].slice.call(moneyList.children).indexOf(e.target);
        input.inputMoneyValue(editInputMoney,editInputDate,editInputMemo);
      } else {
        input.editMode = false;
        closeBtn.textContent = '閉じる';
        input.inputMoneyValue('',editInputDate,'');
      }
    })

    // 登録ボタン
    inputBtn.addEventListener('click',function(e) {
      input.addInputMoney(Number(input.inputMoney.value),input.inputDate.value,input.inputMemo.value);
    })

    // 閉じるボタン 削除ボタン
    closeBtn.addEventListener('click',function(e) {
      if (input.editMode) {
        input.editMode = false;
        closeBtn.textContent = '閉じる';
        setting.hiMoney.history[`${year}-${( '00' + (month) ).slice( -2 )}-${( '00' + (weeks[calendar.moneyLine][calendar.moneyColumn].date) ).slice( -2 )}`].splice(input.editNum,1);
        moneyInfoBox.classList.remove('active');
      }
      changeScreen(screenMode);
      setting.save();
    })
  }

  // 入力画面の初期値設定
  inputMoneyValue(moneyValue,dateValue,memoValue) {
    const inputBox = document.querySelector('.input');
    document.querySelector(`.select`).classList.remove('select');
    inputBox.classList.add('select');
    input.inputMoney.value = moneyValue;
    input.inputDate.value = dateValue;
    input.inputMemo.value = memoValue;
  }

  // 登録処理
  addInputMoney(inputMoney,inputDate,inputMemo,editNum) {
    if (inputMoney && inputDate) {
      moneyInfoBox.classList.remove('active');
      
      if (!this.inputMoneyisAdd) {
        inputMoney = -(inputMoney);
      }

      if (!setting.hiMoney.history[inputDate]) {
        setting.hiMoney.history[inputDate] = [];
      }

      if (!this.editMode) {
        setting.hiMoney.history[inputDate].push(
          {
            memo:inputMemo,
            sum:inputMoney,
          }
        )
      } else {
        setting.hiMoney.history[inputDate][this.editNum] = {
          memo:inputMemo,
          sum:inputMoney,
        }
      }
      changeScreen(screenMode);
      setting.save();
    } else {
      this.inputError.textContent = '金額または日付が入力されていません';
    }
  }
}