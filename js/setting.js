class Setting {
  constructor() {
    const getjson = localStorage.getItem('HiMoney');
    if (getjson === null) { //新規開始なら新たにオブジェクトを生成
      this.newSetting();
    } else {
      this.hiMoney = JSON.parse(getjson); //ローカルストレージから読み込む
      //this.newSetting();
    }
    this.save(); //ローカルストレージに保存
  }

   //ローカルストレージに保存
  save() {
      let setjson = JSON.stringify(this.hiMoney);
      localStorage.setItem('HiMoney', setjson);
  }

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
      startDate:20221201, //開始日
      // 定期
      receipts:[ //収入　支出
        {
          frequency:"month", //頻度
          memo:'お小遣い', //メモ
          startDate:20221201, //開始日
          num:[1],
          sum:5000, //金額 支出ならマイナス値
        },
        {
          frequency:"week", //頻度
          memo:'毎週水曜に４００円取られる人',
          startDate:20221201, //開始日
          num:[3],
          sum:-400, //金額 支出ならマイナス値
        },
      ],
      record:{},
      history:{}
    }
  }
}