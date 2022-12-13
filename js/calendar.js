class Calendar {
  constructor() {
    const menu = document.querySelectorAll('.menu');
    const dateMoney = document.querySelector('.dateMoney');
    // 日付をタップしたらその日の詳細を表示
    dateList.forEach(function(element) {
      element.addEventListener('click',function(e) {
        if (!moneyInfoBox.classList.contains('active')) {
          if (e.target.tagName === 'TD' && e.target.className != 'other') {
            calendar.moneyLine = [].slice.call(dateList).indexOf(element);
            calendar.moneyColumn = [].slice.call(element.children).indexOf(e.target);
            dateMoney.textContent = `${weeks[calendar.moneyLine][calendar.moneyColumn].money}円`;
            calendar.clickDate = weeks[calendar.moneyLine][calendar.moneyColumn].date;
            // 使用履歴
            moneyList.innerHTML = '';
            if (weeks[calendar.moneyLine][calendar.moneyColumn].history.length === 0) {
              let moneyListMemo = document.createElement('li');
              moneyListMemo.textContent = '使ったお金はありません。';
              moneyList.appendChild(moneyListMemo);
            } else {
              weeks[calendar.moneyLine][calendar.moneyColumn].history.map((receipt)=>{
                let moneyListMemo = document.createElement('li');
                moneyListMemo.textContent = `${receipt.memo}:${receipt.sum}円`;
                switch (Math.sign(receipt.sum)) {
                  case -1:
                    moneyListMemo.className = 'red';
                    break
                  case 1:
                    moneyListMemo.className = 'green';
                    break;
                }
                moneyList.appendChild(moneyListMemo);
              })
            }
            // 固定費
            fixedList.innerHTML = '';
            if (weeks[calendar.moneyLine][calendar.moneyColumn].fixed.length === 0) {
              let fixedListMemo = document.createElement('li');
              fixedListMemo.textContent = '固定収入、または固定支出がありません。';
              fixedList.appendChild(fixedListMemo);
            } else {
              weeks[calendar.moneyLine][calendar.moneyColumn].fixed.map((receipt)=>{
                let fixedListMemo = document.createElement('li');
                fixedListMemo.textContent = `${receipt.memo}:${receipt.sum}円`;
                switch (Math.sign(receipt.sum)) {
                  case -1:
                    fixedListMemo.className = 'red';
                    break
                  case 1:
                    fixedListMemo.className = 'green';
                    break;
                }
                fixedList.appendChild(fixedListMemo);
              })
            }
            moneyInfoBox.classList.add('active');
          }
        } else {
          moneyInfoBox.classList.remove('active');
        }
      });
    });
    menu.forEach(function(element) {
      element.addEventListener('click',function(){
        moneyInfoBox.classList.remove('active');
      })
    })
  }

  createCalendar(year,month) {
    let dates = [];
    
    // 前月の最後の日付を取得
    const d = new Date(year,month-1,0).getDate();
    // 今月の最初の曜日を取得
    const n = new Date(year,month-1,1).getDay();
    for (let i = 0; i < n; i++) {
      dates.unshift({
        date:d - i,
        today:false,
        other:true,
      });
    }

    // 今月の最後の日付を取得
    const lastDate = new Date(year,month,0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      if (i === toDate && month === toMonth && year === toYear) {
        dates.push({
          date: i,
          today:true,
          other:false,
        });
      } else {
        dates.push({
          date: i,
          today:false,
          other:false,

        });
      }
    }

    // 今月の最後の曜日を取得
    for (let i = 1; i < 15; i++) {
      dates.push({
        date: i,
        today:false,
        other:true,
      });
    }

    // １週間ごとに配列分け
    let weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(dates.splice(0,7));
    }

    money.give(weeks,year,month);//金額計算へ
    return weeks
  }
}

/*
日付ごとの残高を確認
大きい支出があった場合いつから貯め始めたらいいかを算出
カレンダー表示とその月の支出と収入をリスト化表示とその月の収入と支出を一括表示
貯金対応
固定収入入力可能
メモをし忘れたら現在の所持金を設定できる　この設定をすれば過去のお金の変動に影響せずにその日の金額を決められる　以降はその決定した金額を基準に計算する
期間が開いた時のために初回起動時にスタート日から現在の日付までを一気に計算する　リロードボタンを設置する
その月の使用額と貯金額を参照できる
数値入力の際に演算子を使用できる。
TODAYボタン
定期収入入力ボタン
編集　削除
その日の所持金入力ボタン
日付詳細表示のときに矢印ボタンで次の日付
固定費のスタート日
*/