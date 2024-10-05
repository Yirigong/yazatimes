function getTodayLabel() {
    var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
    var today = new Date().getDay();
    return week[today];
}

var today_week = getTodayLabel();
console.log(today_week);

setTimeout(function() {
    location.reload();
}, 300000); // 5분마다 새로고침

// 날짜 포맷을 계산하는 함수
function getFormattedDate() {
    var now = new Date();
    var d = now.getDate();
    var m = now.getMonth() + 1; // 월은 0부터 시작하므로 1 더함
    var y = now.getFullYear();
    
    if (m < 10) {
        m = "0" + m;
    }
    if (d < 10) {
        d = "0" + d;
    }
    
    return { y: y, m: m, d: d };
}

function getTargetTime() {
    var date = getFormattedDate();
    var weekdayTime = date.m + "/" + date.d + "/" + date.y + " " + "22:50:00";
    var weekendTime = date.m + "/" + date.d + "/" + date.y + " " + "22:30:00";
    
    return (today_week === '토요일' || today_week === '일요일') ? weekendTime : weekdayTime;
}

var targetTime = getTargetTime();
console.log("Target Time:", targetTime);

CountDownTimer(targetTime, 'second_fin');

function CountDownTimer(targetTime, id) {
    var end = new Date(targetTime);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
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

        var hours = Math.floor((distance % (_hour * 24)) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById(id).innerHTML = hours + '시간 ' + minutes + '분 ' + seconds + '초';

        // 매번 날짜를 최신 값으로 갱신하여 표시
        var currentDate = getFormattedDate();
        document.getElementById('day-date').innerHTML = currentDate.y + '년 ' + currentDate.m + '월 ' + currentDate.d + '일 ' + today_week + ' 입니다.';
    }

    timer = setInterval(showRemaining, 1000); // 1초마다 갱신
}
