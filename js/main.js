'use strict';

class Calendar {
  constructor() {
    const today = new Date();
    this.toYear = today.getFullYear();
    this.toMonth  = today.getMonth();
    this.toDate = today.getDate();
    let year = this.toYear
    let month = this.toMonth

    this.dateList = document.querySelector('.dateList');
    this.title = document.querySelector('.title');

    this.createCalendar(year,month);
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
      if (i === this.toDate && month === this.toMonth && year === this.toYear) {
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

    // 今月の最後の曜日を取得
    for (let i = 1; i < 15; i++) {
      dates.push({
        date: i,
        today:false,
        other:true
      });
    }

    // １週間ごとに配列分け
    let weeks = [];
    for (let i = 0; i < 6; i++) {
      weeks.push(dates.splice(0,7));
    }

    this.displayCalendar(weeks);
  }

  displayCalendar(weeks) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        this.dateList.children[i].children[j].textContent = weeks[i][j].date;
        if (weeks[i][j].other === true) {
          this.dateList.children[i].children[j].className = 'other';
        }
        if (weeks[i][j].today === true) {
          this.dateList.children[i].children[j].className = 'today';
        }
      }
    }
    this.title.textContent = `${this.toYear}/${this.toMonth + 1}月`;
  }
}

const calendar = new Calendar();