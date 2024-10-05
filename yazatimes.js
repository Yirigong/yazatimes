function getTodayLabel() {
    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    var today = new Date().getDay();
    var todayLabel = week[today];
    return todayLabel;
}

today_week = getTodayLabel();
console.log(today_week);

setTimeout(function(){
    location.reload();
}, 300000);

function getFormattedDate() {
    var now = new Date();
    var d = now.getDate();
    var m = now.getMonth();
    var y = now.getFullYear();
    m = m + 1;
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    return {y: y, m: m, d: d};
}

var date = getFormattedDate();
var weekdayTime = date.m + "/" + date.d + "/" + date.y + " " + "22:50:00";
var weekendTime = date.m + "/" + date.d + "/" + date.y + " " + "22:30:00";

switch(today_week){
    case '토요일':
    case '일요일':
        CountDownTimer(weekendTime, 'second_fin');
        console.log("주말");
        console.log(weekendTime);
        break;
    default:
        CountDownTimer(weekdayTime, 'second_fin');
        console.log("평일");
        console.log(weekdayTime);
        break;
}

function CountDownTimer(targetTime, id) {
    var end = new Date(targetTime);
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById(id).innerHTML = '오늘 하루 수고하셨습니다.';
            document.getElementById('backhome').style.display = "none";
            document.getElementById('remain').style.display = "none";
            return;
        }

        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = hours + '시간 ' + minutes + '분 ' + seconds + '초';
        document.getElementById('day-date').innerHTML = date.y + '년 ' + date.m + '월 ' + date.d + '일 ' + today_week + ' 입니다.';
    }

    timer = setInterval(showRemaining, 1000);
}
