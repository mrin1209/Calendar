$(function(){
  var today = new Date();
  var todate = new Date().getDate();
  var year = today.getFullYear();
  var toyear = today.getFullYear();
  var month = today.getMonth();
  var tomonth = today.getMonth();
  var month_en = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May.',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]

  function create_calendar() {
    dates = []
    
    // 前月
    // 前月の最後の日付を取得
    var d = new Date(year,month,0).getDate();
    // 今月の最初の曜日を取得
    var n = new Date(year,month,1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({
        date:d - i,
        today:false,
        other:true
      });
    }

    // 今月
    // 今月の最後の日付を取得
    var last_date = new Date(year,month+1,0).getDate();
    $('.today').removeClass('today');

    for (let i = 1; i <= last_date; i++) {
      if (i === todate && month === tomonth && year === toyear) {
        dates.push({
          date: i,
          today:true,
          other:false
        });
      } else {
        dates.push({
          date: i,
          today:false,
          other:false
        });
      }
    }

    // 来月
    // 今月の最後の曜日を取得
    var last_day = new Date(year,month+1,0).getDay();

    for (let i = 1; i < 15; i++) {
      dates.push({
        date: i,
        today:false,
        other:true
      });
    }

    // １週間ごとに配列分け
    weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(dates.splice(0,7));
    }

    // 描画
    $('.other').removeClass('other');
    $('.today').removeClass('today');
    
    // 薄い日付
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (weeks[i][j].other === true) {
          $('tbody').find('tr').eq(i).find('td').eq(j).addClass('other');
        }

        // 今日
        if (weeks[i][j].today === true) {
          $('tbody').find('tr').eq(i).find('td').eq(j).addClass('today');
        }
        $('tbody').find('tr').eq(i).find('td').eq(j).text(weeks[i][j].date);
      }
    }
    $('.title').text(`${year}/${month_en[month]}${month + 1}`);
  }

  create_calendar()

  // 戻るボタンを押したとき
  $('.prev').click(function(){
    month--
    if(month < 0){
      year--
      month = 11
    }
    create_calendar()
  })

  // 次へボタンを押したとき
  $('.next').click(function(){
    month++
    if(month > 11){
      year++
      month = 0
    }
    create_calendar()
  })

  // TODATボタンを押したとき
  $('.todaybtn').click(function(){
    month = tomonth;
    year = toyear;
    create_calendar()
  })
});