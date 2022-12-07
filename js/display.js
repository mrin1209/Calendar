class Display {
  displayStart() {
    const receipt = document.querySelector('.receipt');
    const expense = document.querySelector('.expense');
    const current = document.querySelector('.current');
    receipt.textContent = money.receiptMoney;
    expense.textContent = money.expenseMoney;
    current.textContent = money.currentMoney;
  }
  
  displayCalendar(weeks,year,month) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let date = dateList.children[i].children[j];
        date.innerHTML = '';
        date.className = '';

        if (weeks[i][j].other === true) { //本月ではなかった場合薄く表示
          date.className = 'other';
        }
        if (weeks[i][j].today === true) { //今日の日付は強調表示
          date.className = 'today';
        }

        // 日付
        let dateNum = document.createElement('p');
        dateNum.textContent = weeks[i][j].date;
        date.appendChild(dateNum);

        // 金額
        let moneyBox = document.createElement('p');
        moneyBox.className = 'money';

        // 増加額
        let addMoney = document.createElement('p');
        if (date.className != 'other') {
          addMoney.textContent = weeks[i][j].add ? `${weeks[i][j].add}円` : "";
        }
        addMoney.className = 'green';
        moneyBox.appendChild(addMoney);

        // 減少額
        let subMoney = document.createElement('p');
        if (date.className != 'other') {
          subMoney.textContent = weeks[i][j].sub ? `${weeks[i][j].sub}円` : "";
        }
        subMoney.className = 'red';
        moneyBox.appendChild(subMoney);

        date.appendChild(moneyBox);
      }
    }
  }

  displayList() {

  }

  displaySetting() {

  }
}