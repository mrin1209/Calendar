class Calendar {
  constructor() {
    const menu = document.querySelectorAll('.menu');
    const moneyList = document.querySelector('.moneyList');
    const dateMoney = document.querySelector('.dateMoney');
    dateList.forEach(function(element) {
      element.addEventListener('click',function(e) {
        if (!moneyInput.classList.contains('active')) {
          if (e.target.tagName === 'TD' && e.target.className != 'other') {
            let moneyLine = [].slice.call(dateList).indexOf(element);
            let moneyColumn = [].slice.call(element.children).indexOf(e.target);
            dateMoney.textContent = `${weeks[moneyLine][moneyColumn].money}円`;
            moneyList.innerHTML = '';
            weeks[moneyLine][moneyColumn].history.map((receipt)=>{
              let moneyListMemo = document.createElement('li');
              moneyListMemo.textContent = `${receipt.memo}:${receipt.sum}円`
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
            moneyInput.classList.add('active');
          }
        } else {
          moneyInput.classList.remove('active');
        }
      });
    });

    menu.forEach(function(element) {
      element.addEventListener('click',function(){
        moneyInput.classList.remove('active');
      })
    })
  }
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
}

/*
// 日付ごとの残高を確認
// 大きい支出があった場合いつから貯め始めたらいいかを算出
// カレンダー表示とその月の支出と収入をリスト化表示とその月の収入と支出を一括表示
// 貯金対応
// 固定収入入力可能
// メモをし忘れたら現在の所持金を設定できる　この設定をすれば過去のお金の変動に影響せずにその日の金額を決められる　以降はその決定した金額を基準に計算する
// 期間が開いた時のために初回起動時にスタート日から現在の日付までを一気に計算する　リロードボタンを設置する
// その月の使用額と貯金額を参照できる

画面遷移の課題
aタグでhtmlを移動
メリット
htmlを分けられて管理が楽
デメリット
遷移の動作が重い 一つテンプレートを変更すれば全てのhtmlを変更しなければならない
値の保持ができない(ローカルストレージを使えば可能だが少し冗長)
インターネット接続がないと全てのページを表示できない

一つのhtmlに全て記述し非表示と表示を繰り返して遷移
メリット
コードが複雑にならない　シンプル
デメリット
標準動作が重い 一つにすべて記述するため管理が面倒

Javascript内にhtmlを記述し動的に遷移
メリット 値の保持が楽
デメリット コードが複雑になる

htmlを埋め込みJavascriptで動的に遷移
メリット htmlを分けつつ値の保持が可能 変更部分だけのhtmlを用意すれば良い
デメリット 遷移の動作が重い可能性があり
*/