class Money {
  // 計算
  give(weeks,year,month) {
    let currentMoney; //現在の所持金
    let adjustDate; //整えた数値
    let adjustMonth = ( '00' + month ).slice( -2 );
    let lastMonth = month; //先月
    let lastYear = year; //去年
    this.receiptMoney = 0;
    this.expenseMoney = 0;
    this.currentMoney = 0;
    lastMonth--;
    if(lastMonth < 1){
      lastYear--;
      lastMonth = 12;
    }
    lastMonth = ( '00' + lastMonth ).slice( -2 );
    if (setting.hiMoney.record[`${lastYear}${lastMonth}`]) {
      currentMoney = setting.hiMoney.record[`${lastYear}${lastMonth}`];
    } else {
      currentMoney = 0;
      setting.hiMoney.record = {...setting.hiMoney.record,...{[`${lastYear}${lastMonth}`]:currentMoney}}
    }

    // 定期収入/支出
    function calculation(i,j,year,adjustMonth,adjustDate) {
      weeks[i][j].add = 0;
      weeks[i][j].sub = 0;
      setting.hiMoney.receipts.map((receipt,index)=>{
        if (`${year}${adjustMonth}${adjustDate}` >= receipt.startDate && (`${year}${adjustMonth}${adjustDate}` <= receipt.endDate || receipt.endDate === false)) { //開始日より後なら表示
          switch (receipt.frequency) {
            case "date":
              if (receipt.endDate) {
                change(receipt,weeks[i][j],weeks[i][j].fixed,index);
              } else {
                weeks[i][j].fixed.push({
                  memo:receipt.memo,
                  sum:receipt.sum,
                  index:index,
                });
                currentMoney += receipt.sum;
                switch (Math.sign(receipt.sum)) {
                  case -1:
                    money.expenseMoney -= receipt.sum;
                    break
                  case 1:
                    money.receiptMoney += receipt.sum;
                    break;
                }
              }
              break;
            case "week":
              receipt.num.map((value)=>{
                if (value == j) {
                  change(receipt,weeks[i][j],weeks[i][j].fixed,index);
                }
              })
              break;
            case "month":
              receipt.num.map((value)=>{
                if (value == weeks[i][j].date) {
                  change(receipt,weeks[i][j],weeks[i][j].fixed,index);
                }
              })
              break;
            case "year":
              receipt.num.map((value)=>{
                if (value[0] == month && value[1] == weeks[i][j].date) {
                  change(receipt,weeks[i][j],weeks[i][j].fixed,index);
                }
              })
              break;
            default:
              return false
          }
        }
      });
    }

    function change(receipt,date,history,index) {
      currentMoney += receipt.sum;
      switch (Math.sign(receipt.sum)) {
        case -1:
          date.sub += receipt.sum;
          money.expenseMoney -= receipt.sum;
          break
        case 1:
          date.add += receipt.sum;
          money.receiptMoney += receipt.sum;
          break;
      }
      history.push({
        memo:receipt.memo,
        sum:receipt.sum,
        index:index,
      })
    }

    function moneyHistory(year,month,date,weeksDate) {
      if (setting.hiMoney.history[`${year}${month}${date}`]) {
        setting.hiMoney.history[`${year}${month}${date}`].map((receipt)=>{
          change(receipt,weeksDate,weeksDate.history,0);
        });
      }
    }

    function currentFixedMoney(year,month,date,weeksDate) {
      if (setting.hiMoney.current[`${year}${month}${date}`] || setting.hiMoney.current[`${year}${month}${date}`] == 0) {
        currentMoney = setting.hiMoney.current[`${year}${month}${date}`];
        weeksDate.currentMoney = currentMoney;
      }
    }
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // １桁の場合０を追加 1→01
        adjustDate = ( '00' + weeks[i][j].date ).slice( -2 );
        weeks[i][j].history = [];
        weeks[i][j].fixed = [];
        if (weeks[i][j].other === false) { //本月ではなかった場合金額非表示
          currentFixedMoney(year,adjustMonth,adjustDate,weeks[i][j]);
          calculation(i,j,year,adjustMonth,adjustDate);
          moneyHistory(year,adjustMonth,adjustDate,weeks[i][j]);
          weeks[i][j].money = currentMoney;
        } else {
          weeks[i][j].money = '';
        }
      }
    }
    setting.saveRecord(year,adjustMonth,currentMoney);
    this.currentMoney = this.receiptMoney - this.expenseMoney;
  }
}