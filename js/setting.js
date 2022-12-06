class Setting {
  newSetting() {
    /*
      frequency:{
        "date":毎日
        "week":週,numに各曜日の数値
        "month":月,numに日
        "year":年,numに月,numの２番目の値に日
      }
      ※numはmapメソッドを使用しているため配列に格納して記述 frequencyが"year"の場合は二次元配列にする
    */
    this.hiMoney = {
      startMoney:0, //開始日の所持金
      start:20221105, //開始日
      // 定期
      receipts:[ //収入　支出
        {
          frequency:"date", //頻度
          num:[
            [0],
          ],
          sum:200, //金額 支出ならマイナス値
        },
      ],
      record:{},
    }
  }
}