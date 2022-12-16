class Display {
  displayStart() {
    const receipt = document.querySelector('.receipt');
    const expense = document.querySelector('.expense');
    const current = document.querySelector('.current');
    receipt.textContent = money.receiptMoney;
    expense.textContent = money.expenseMoney;
    current.textContent = money.currentMoney;
  }
  
  displayCalendar(weeks) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        let date = dateList[i].children[j];
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

        if (numMode === true) {
          moneyBox.className = 'numMoney';
          // 現在の所持金
          let currentMoney = document.createElement('p');
          currentMoney.textContent = weeks[i][j].currentMoney != undefined ? `${weeks[i][j].currentMoney}円` : "";
          currentMoney.className = 'blue';
          moneyBox.appendChild(currentMoney);
  
          // 増加額
          let addMoney = document.createElement('p');
          addMoney.textContent = weeks[i][j].add ? `${weeks[i][j].add}円` : "";
          addMoney.className = 'green';
          moneyBox.appendChild(addMoney);
  
          // 減少額
          let subMoney = document.createElement('p');
          subMoney.textContent = weeks[i][j].sub ? `${weeks[i][j].sub}円` : "";
          subMoney.className = 'red';
          moneyBox.appendChild(subMoney);
  
          date.appendChild(moneyBox);
        } else {
          moneyBox.className = 'markMoney';
          // 現在の所持金
          if (date.className != 'other') {
            //減少額
            if (weeks[i][j].sub != 0) {
              let subMoney = document.createElement('span');
              subMoney.textContent = "●";
              subMoney.className = 'red';
              moneyBox.appendChild(subMoney);
            }
            //所持金
            if (weeks[i][j].currentMoney != undefined) {
              let currentMoney = document.createElement('span');
              currentMoney.textContent = `●`;
              currentMoney.className = 'blue';
              moneyBox.appendChild(currentMoney);
            }
            //増加額
            if (weeks[i][j].add != 0) {
              let addMoney = document.createElement('span');
              addMoney.textContent = "●";
              addMoney.className = 'green';
              moneyBox.appendChild(addMoney);
            }

            date.appendChild(moneyBox);
          }  
        }
      }
    }
  }

  displayList() {

  }

  displaySetting() {

  }
}