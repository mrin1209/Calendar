class Money {
  // 計算
  give(weeks,year,month) {
    let currentMoney; //現在の所持金
    let adjustDate; //整えた数値
    let adjustMonth = ( '00' + month ).slice( -2 );
    let lastMonth = month; //先月
    let lastYear = year; //去年
    lastMonth--;
    if(lastMonth < 0){
      lastYear--;
      lastMonth = 11;
    }
    lastMonth = ( '00' + lastMonth ).slice( -2 );
    if (setting.hiMoney.record[`${lastYear}${lastMonth}`]) {
      currentMoney = setting.hiMoney.record[`${lastYear}${lastMonth}`];
    } else {
      currentMoney = 0;
      setting.hiMoney.record = {...setting.hiMoney.record,...{[`${lastYear}${lastMonth}`]:currentMoney}}
    }

    // 定期収入/支出
    function calculation(i,j) {
      weeks[i][j].change = 0;
      setting.hiMoney.receipts.map((receipt)=>{
        switch (receipt.frequency) {
          case "date":
            currentMoney += receipt.sum;
            weeks[i][j].change += receipt.sum;
            break;
          case "week":
            receipt.num.map((value)=>{
              if (value == j) {
                currentMoney += receipt.sum;
                weeks[i][j].change += receipt.sum;
              }
            })
            break;
          case "month":
            receipt.num.map((value)=>{
              if (value == weeks[i][j].date) {
                currentMoney += receipt.sum;
                weeks[i][j].change += receipt.sum;
              }
            })
            break;
          case "year":
            receipt.num.map((value)=>{
              if (value[0] == month && value[1] == weeks[i][j].date) {
                currentMoney += receipt.sum;
                weeks[i][j].change += receipt.sum;
              }
            })
            break;
          default:
            return false
        }
        switch (Math.sign(weeks[i][j].change)) {
          case -1:
            weeks[i][j].color = 'red';
            break
          case 1:
            weeks[i][j].color = 'green';
            break;
        }
      });
      if (`${year}${adjustMonth}${adjustDate}` == setting.hiMoney.startDate) { //開始日より後なら表示
        currentMoney = setting.hiMoney.startMoney;
      }
      if (`${year}${adjustMonth}${adjustDate}` < setting.hiMoney.startDate) { //開始日より後なら表示
        currentMoney = 0;
        weeks[i][j].change = 0;
      }
    }
    
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // １桁の場合０を追加 1→01
        adjustDate = ( '00' + weeks[i][j].date ).slice( -2 );
        if (weeks[i][j].other === false) { //本月ではなかった場合金額非表示
          calculation(i,j);
          weeks[i][j].money = currentMoney;
        } else {
          weeks[i][j].money = '';
        }
      }
    }
    // 今月の残高を保存
    setting.hiMoney.record = {...setting.hiMoney.record,...{[`${year}${adjustMonth}`]:currentMoney}}
    setting.save();//ローカルストレージに保存
  }
}

const setting = new Setting();
const money = new Money();