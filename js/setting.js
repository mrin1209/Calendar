class Setting {
  constructor() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    const version = 1.0;
    const getjson = localStorage.getItem('HiMoney');
    if (getjson === null) { //新規開始なら新たにオブジェクトを生成
      this.newSetting(version);
    } else {
      this.hiMoney = JSON.parse(getjson); //ローカルストレージから読み込む
      if (this.hiMoney.version != version) {
        this.newSetting(version);
      }
    }
    this.save(); //ローカルストレージに保存

    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    });
  }

   //ローカルストレージに保存
  save() {
      let setjson = JSON.stringify(this.hiMoney);
      localStorage.setItem('HiMoney', setjson);
  }

  newSetting(version) {
    this.hiMoney = {
      version:version,
      current:{},
      receipts:[],
      record:{},
      history:{}
    }
  }

  // 今月の残高を保存
  saveRecord(year,month,currentMoney) {
    this.hiMoney.record[`${year}${month}`] = currentMoney;
    this.save();//ローカルストレージに保存
  }

  reload() {
    let loadYear = String(setting.hiMoney.startDate).slice(0, 4);
    let loadMonth = String(setting.hiMoney.startDate).slice(4, 6);
    while (`${loadYear}${loadMonth}` != `${toYear}${toMonth}`) {
      calendar.createCalendar(loadYear,loadMonth);
      loadMonth++;
      if(loadMonth > 12){
        loadYear++;
        loadMonth = 1;
      }
    }
  }
}