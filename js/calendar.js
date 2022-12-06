class Calendar {
  createCalendar(year,month) {
    let dates = [];
    
    // 前月の最後の日付を取得
    const d = new Date(year,month,0).getDate();
    // 今月の最初の曜日を取得
    const n = new Date(year,month,1).getDay();
    for (let i = 0; i < n; i++) {
      dates.unshift({
        date:d - i,
        today:false,
        other:true,
      });
    }

    // 今月の最後の日付を取得
    const lastDate = new Date(year,month+1,0).getDate();
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

  // 描画
  displayCalendar(weeks,year,month) {
    const title = document.querySelector('.title');
    const dateList = document.querySelector('.dateList');
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
        let dateMoney = document.createElement('p');
        if (date.className != 'other') {
          dateMoney.textContent = weeks[i][j].money ? `${weeks[i][j].money}円` : "0円";
        }
        dateMoney.className = 'money'
        date.appendChild(dateMoney);
      }
    }
    // 年月表示
    title.textContent = `${year}/${month + 1}月`;
  }
}
// 日付ごとの残高を確認
// 大きい支出があった場合いつから貯め始めたらいいかを算出
// カレンダー表示とその月の支出と収入をリスト化表示とその月の収入と支出を一括表示
// 貯金対応
// 固定収入入力可能
// メモをし忘れたら現在の所持金を設定できる　この設定をすれば過去のお金の変動に影響せずにその日の金額を決められる　以降はその決定した金額を基準に計算する
// 期間が開いた時のために初回起動時にスタート日から現在の日付までを一気に計算する　リロードボタンを設置する