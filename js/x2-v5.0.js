﻿var indexStart = 0;
var profitall = 0;
var oychart2 = [];
var oxchart2 = [];
var oxchart3 = [];
var oxchart5 = [];
var oxchart6 = [];
var oxchart7 = [];
var investingStartMoney = 20000;
var investTimeSeries = [investingStartMoney];
var oxchart4 = ['start'];
var oychart1 = [];
var profitmonth = 0;
var oxchart1 = [];
var basebet = [1, 3.5, 9.5, 24, 59.3, 146, 354.6, 862.2, 2094.9, 5088.6, 12359, 30015.8, 72896.4];
var lostday = 0;
var lostdaymax = 10;
var LXXs = [37, 23, 44, 71, 24];
var numberx2 = LXXs.length * (LXXs.length - 1) / 2;
var startpoint = 10;
var oychart3 = [];
var oychart5 = [];
var oychart6 = [];
var oychart7 = [];
var investbymonth = 0;
var profitbymonthchart5 = 0;
var revenuebymonthchart7 = 0;
var f_start = indexStart,
    f_end = indexStart + numberx2;

//data for chart
var start_bet_linear = 25;
var oychart4 = [20000];
var oxchart2linear = [];

//Save 100 table
var datax2statics = [];
var chartprioty = [0, 1, 2, 21, 22, 23, 25, 26, 27, 28, 29, 30, 32];
//chart
var ctx = document.getElementById('myChart');
var ctx1 = document.getElementById('myChart1');
var ctx2 = document.getElementById('myChart2');
var ctx3 = document.getElementById('myChart3');
var ctx4 = document.getElementById('myChart4');
var ctx5 = document.getElementById('myChart5');
var ctx6 = document.getElementById('myChart6');
var ctx7 = document.getElementById('myChart7');

var table = $('.itable>tbody');
var table1 = table[0];
var dataglobal = [];


//function
function moneybetDate(numberx2, pointbet, lostday) {
    if (lostday === 0)
        return numberx2 * pointbet;
    else if (lostday < 0)
        return 0;
    return numberx2 * pointbet * basebet[lostday];
}

//Calulator bet
function basebetCalulator(lostdays) {
    if (lostdays === 0)
        return 1;
    else if (lostdays < 0)
        return 0;
    //Số tiền win của n ngày và số tiền cược ngày hôm nay + số tiền cược các ngày trước
    return (((lostdays + 1) * ((17 - numberx2) * startpoint) + moneybetDate(numberx2, startpoint, lostdays - 1)) / 70);
}

function createheadertable() {
    var tablehead = $('.itable>thead');
    tablehead[0].innerHTML = '';
    var htmlheader = '<tr>';
    htmlheader += '<th class="text-center">Date Predict</th>';
    var cols = LXXs;
    for (var i = 0; i < numberx2; i++) {
        htmlheader += '<th class="text-center">X2_' + (i + 1) + '</th>';
    }
    htmlheader += '<th class="text-center">Result</th>';
    htmlheader += '</tr>';
    tablehead[0].innerHTML = htmlheader;
}


function mainstatics(data) {
    numberx2 = LXXs.length * (LXXs.length - 1) / 2;
    createheadertable();
    var datax2statics_elment = datax2statics.find(function (datax2) {
        if (datax2.id === indexStart) {
            return datax2;
        }
    });
    if (datax2statics_elment === undefined) {
        datax2statics_elment = {
            id : indexStart,
            html: '',
            table: [],
            charts : []
        };
    }
    console.log(basebet);

    table1.innerHTML = '';

    var html = '';
    data.forEach(function (element) {
        
        var date = element.DatePredict.substring(0, 10);
        var x2elment = {
            datePredict: date,
            x2List: [],
            resultbet: 0
        };
        var rl_html = '<tr id="tr_'+ date +'">';
        rl_html += '<td class="text-center text-loterry">' + element.DatePredict.substring(0, 10) + '</td>';
        f_start = 0;
        f_end = LXXs.length;
        for (var i = f_start; i < f_end; i++) {
            for (j = i + 1; j < f_end; j++) {
                var loto1 = element.LotoPredicts[LXXs[i] - 1];
                var loto2 = element.LotoPredicts[LXXs[j] - 1];
                var x2 = (loto1.IsTrue ? '(' + loto1.LotoValue + ')' : loto1.LotoValue) + ' ' + (loto2.IsTrue ? '(' + loto2.LotoValue + ')' : loto2.LotoValue);
                rl_html += '<td class="text-center text-loterry ' + (loto1.IsTrue && loto2.IsTrue ? "text-true" : "text-fail") + '">' + x2 + '</td>';
                x2elment.x2List.push({
                    loto1: loto1,
                    loto2: loto2,
                    isTrue: loto1.IsTrue && loto2.IsTrue
                });
            }
        }
        rl_html += '<td id="resultx2_' + date + '" class="resultx2 text-center text-loterry">' + 0 + '</td>';
        rl_html += '</tr>';
        html += rl_html;
        datax2statics_elment.table.push(x2elment);
    });
    table1.innerHTML = html;

    //Tinh doanh thu và lợi nhuận
    for (var k = data.length - 1; k >= 0; k--) {
        var element = data[k];
        var profit = -1 * numberx2 * startpoint * basebet[lostday];
        var profitlinear = -1 * numberx2 * start_bet_linear;
        investbymonth -= profitlinear;
        var date = element.DatePredict.substring(0, 10);
        
        var rl_html = $('#resultx2_' + date);
        f_start = 0;
        f_end = LXXs.length;
        for (var i = f_start; i < f_end; i++) {
            for (j = i + 1; j < f_end; j++) {
                var loto1 = element.LotoPredicts[LXXs[i] - 1];
                var loto2 = element.LotoPredicts[LXXs[j] - 1];
                if (loto1.IsTrue && loto2.IsTrue) {
                    profit += 17 * startpoint * basebet[lostday];
                    profitlinear += 17 * start_bet_linear;
                    revenuebymonthchart7 += 17 * start_bet_linear;
                }
            }
        }
        rl_html.text(profitlinear);
        rl_html.addClass((profitlinear > 0 ? "text-true" : "text-fail"));
        profitall += profit;
        investingStartMoney += profit;
        oychart2.push(profitall);
        profitbymonthchart5 += profitlinear;
        oychart4.push(oychart4.length - 1 >= 0 ? oychart4[oychart4.length - 1] + profitlinear : profitlinear);
        oxchart2.push(date);
        investTimeSeries.push(investingStartMoney);
        oxchart4.push(date);
        if (profit < 0) {
            lostday++;
        }
        else {
            lostday = 0;
        }

        var dlable = date.substring(0, date.length - 2) + '01';
        //Check lable Exist
        var isExistLable = false;
        isExistLable = oxchart1.find(function (label) {
            if (label === dlable) return true;
        });

        if (!isExistLable) {
            oychart1.push(profit);
            oxchart1.push(dlable);
            oychart5.push(profitbymonthchart5);
            profitbymonthchart5 = 0;
            oychart7.push(revenuebymonthchart7);
            revenuebymonthchart7 = 0;
            oychart6.push(investbymonth);
            investbymonth = 0;
            oychart3.push(0);
            //profitmonth = 0;
        }
        else {
            oxchart1.find(function (el, index) {
                if (el === dlable) {
                    oychart1[index] += profit;
                    var invest = 0;
                    for (var i = 0; i <= lostday + 1; i++) {
                        invest += numberx2 * startpoint * basebet[i];
                    }

                    if (oychart3[index] < invest) {
                        oychart3[index] = invest;
                    }
                    return;
                }
            });
        }

        datax2statics_elment.table[k].resultbet = profit;
    };
    console.log(profitall);
    console.log(oychart1);
    console.log(oychart3);
    datax2statics_elment.html = $('.itable>tbody')[0].innerHTML;
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# profit',
                data: oychart1,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx);

    //chart
    var myChart1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: oxchart2,
            datasets: [{
                label: '# profit',
                data: oychart2,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx1);

    //chart
    var myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: oxchart4,
            datasets: [{
                label: '# profit',
                data: investTimeSeries,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx2);
    oxchart3 = oxchart1;
    //chart
    var myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: oxchart3,
            datasets: [{
                label: '# invest',
                data: oychart3,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx3);

    //chart
    var myChart4 = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: oxchart4,
            datasets: [{
                label: '# profit linear',
                data: oychart4,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx4);

    //chart
    var myChart5 = new Chart(ctx5, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# profit linear',
                data: oychart5,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx5);

    //chart
    var myChart6 = new Chart(ctx6, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# profit linear',
                data: oychart6,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx6);

    //chart
    var myChart7 = new Chart(ctx7, {
        type: 'bar',
        data: {
            labels: oxchart1,
            datasets: [{
                label: '# profit linear',
                data: oychart7,
                backgroundColor: 'green',
                borderWidth: 1,
                fill: 'origin'
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    stacked: true
                }]
            }
        }
    });
    datax2statics_elment.charts.push(ctx7);

    datax2statics.push(datax2statics_elment);
}

d3.json("data/result_full_predict.json", function (error, data) {
    if (error)
        throw error;
    dataglobal = data;
    //basebet.splice(0, basebet.length);
    //for (var i = 0; i < lostdaymax; i++) {
    //    var result = basebetCalulator(i);
    //    basebet.push(result.toPrecision(2));
    //}

    for (var i = 0; i < basebet.length; i++) {
        basebet[i] = basebet[i] * 1;
    }
    var colid1 = $('#colid1').val();
    var colid2 = $('#colid2').val();
    var colid3 = $('#colid3').val();
    var colid4 = $('#colid4').val();
    var colid5 = $('#colid5').val();
    var colid6 = $('#colid6').val();
    var colid7 = $('#colid7').val();
    var indexlotos = [];
    if (colid1 > 0) {
        indexlotos.push(colid1);
    }
    if (colid2 > 0) {
        indexlotos.push(colid2);
    }
    if (colid3 > 0) {
        indexlotos.push(colid3);
    }
    if (colid4 > 0) {
        indexlotos.push(colid4);
    }
    if (colid5 > 0) {
        indexlotos.push(colid5);
    }
    if (colid6 > 0) {
        indexlotos.push(colid6);
    }
    if (colid7 > 0) {
        indexlotos.push(colid7);
    }
    LXXs.splice(0, LXXs.length);
    LXXs = indexlotos;
    mainstatics(data);
    $('#table-tile').text(indexStart);
});


$('#table-id').on('change', function (e, v) {
    indexStart = parseInt($(this).val());
    $('#table-tile').text(indexStart);
    console.log(indexStart);
    profitall = 0;
    oychart2 = [];
    oxchart2 = [];
    oychart4 = [20000];
    oxchart2linear = [];
    investingStartMoney = 20000;
    investTimeSeries = [investingStartMoney];
    oxchart4 = ['start'];
    oychart1 = [];
    profitmonth = 0;
    oxchart1 = [];
    lostday = 0;
    oychart3 = [];
    oychart5 = [];
    oychart6 = [];
    oychart7 = [];
    f_start = indexStart;
    f_end = indexStart + numberx2;


    $('#myChart').remove();
    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('#myChart4').remove();
    $('#myChart5').remove();
    $('#myChart6').remove();
    $('#myChart7').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx').append('<canvas style="background-color:white;" id="myChart" width="400" height="400"></canvas>');
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>');
    $('#ctx5').append('<canvas style="background-color:white;" id="myChart5" width="400" height="400"></canvas>');
    $('#ctx6').append('<canvas style="background-color:white;" id="myChart6" width="400" height="400"></canvas>');
    $('#ctx7').append('<canvas style="background-color:white;" id="myChart7" width="400" height="400"></canvas>');
    ctx = document.getElementById('myChart');
    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');
    ctx4 = document.getElementById('myChart4');
    ctx5 = document.getElementById('myChart5');
    ctx6 = document.getElementById('myChart6');
    ctx7 = document.getElementById('myChart7');

    mainstatics(dataglobal);
});

function colidOnchange() {
    oxchart1.splice(1, oxchart1.length);
    oychart1.splice(1, oychart1.length);
    oxchart1 = ['start'];
    oychart1 = [40000];
    oxchart2.splice(1, oxchart2.length);
    oychart2.splice(1, oychart2.length);
    oxchart2 = ['start'];
    oychart2 = [5000];
    oxchart3.splice(1, oxchart3.length);
    oychart3.splice(1, oychart3.length);
    oxchart3 = ['start'];
    oychart3 = [5000];
    oxchart4.splice(1, oxchart4.length);
    oychart4.splice(1, oychart4.length);
    oxchart4 = ['start'];
    oychart4 = [0];
    oxchart5.splice(1, oxchart5.length);
    oychart5.splice(1, oychart5.length);
    oxchart5 = ['start'];
    oychart5 = [];
    oxchart6.splice(1, oxchart6.length);
    oychart6.splice(1, oychart6.length);
    oxchart6 = ['start'];
    oychart6 = [];
    oxchart7.splice(1, oxchart7.length);
    oychart7.splice(1, oychart7.length);
    oxchart7 = ['start'];
    oychart7 = [];
    $('#myChart1').remove();
    $('#myChart2').remove();
    $('#myChart3').remove();
    $('#myChart4').remove();
    $('#myChart5').remove();
    $('#myChart6').remove();
    $('#myChart7').remove();
    $('iframe.chartjs-hidden-iframe').remove();
    $('#ctx1').append('<canvas style="background-color:white;" id="myChart1" width="400" height="400"></canvas>');
    $('#ctx2').append('<canvas style="background-color:white;" id="myChart2" width="400" height="400"></canvas>');
    $('#ctx3').append('<canvas style="background-color:white;" id="myChart3" width="400" height="400"></canvas>');
    $('#ctx4').append('<canvas style="background-color:white;" id="myChart4" width="400" height="400"></canvas>');
    $('#ctx5').append('<canvas style="background-color:white;" id="myChart5" width="400" height="400"></canvas>');
    $('#ctx6').append('<canvas style="background-color:white;" id="myChart6" width="400" height="400"></canvas>');
    $('#ctx7').append('<canvas style="background-color:white;" id="myChart7" width="400" height="400"></canvas>');

    ctx1 = document.getElementById('myChart1');
    ctx2 = document.getElementById('myChart2');
    ctx3 = document.getElementById('myChart3');
    ctx4 = document.getElementById('myChart4');
    ctx5 = document.getElementById('myChart5');
    ctx6 = document.getElementById('myChart6');
    ctx7 = document.getElementById('myChart7');

    var colid1 = $('#colid1').val();
    var colid2 = $('#colid2').val();
    var colid3 = $('#colid3').val();
    var colid4 = $('#colid4').val();
    var colid5 = $('#colid5').val();
    var colid6 = $('#colid6').val();
    var colid7 = $('#colid7').val();
    var indexlotos = [];
    if (colid1 > 0) {
        indexlotos.push(colid1);
    }
    if (colid2 > 0) {
        indexlotos.push(colid2);
    }
    if (colid3 > 0) {
        indexlotos.push(colid3);
    }
    if (colid4 > 0) {
        indexlotos.push(colid4);
    }
    if (colid5 > 0) {
        indexlotos.push(colid5);
    }
    if (colid6 > 0) {
        indexlotos.push(colid6);
    }
    if (colid7 > 0) {
        indexlotos.push(colid7);
    }
    LXXs.splice(0, LXXs.length);
    LXXs = indexlotos;
    mainstatics(dataglobal);
}


$('#colid1').on('change', function (e) {
    colidOnchange();
});
$('#colid2').on('change', function (e) {
    colidOnchange();
});
$('#colid3').on('change', function (e) {
    colidOnchange();
});
$('#colid4').on('change', function (e) {
    colidOnchange();
});
$('#colid5').on('change', function (e) {
    colidOnchange();
});
$('#colid6').on('change', function (e) {
    colidOnchange();
});
$('#colid7').on('change', function (e) {
    colidOnchange();
});
$('#maxlostday').on('change', function (e) {
    maxlostday = $('#maxlostday').val();
    colidOnchange();
});