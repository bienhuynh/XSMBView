
var profitall = 0;
var profitbymonths = [];
var profitmonth = 0;
var ox = [];
d3.json("https://raw.githubusercontent.com/bienhuynh/XSMBView/main/data/resultlotterytable.json", function (error, data) {
    if (error)
        throw error;
    var _640s = [101, 102, 103, 104, 106, 107, 108, 109,
        201, 202, 203, 204, 206, 207, 208, 209,
        301, 302, 303, 304, 306, 307, 308, 309,
        501, 502, 503, 504, 506, 507, 508, 509,
        601, 602, 603, 604, 606, 607, 608, 609,
        701, 702, 703, 704, 706, 707, 708, 709,
        801, 802, 803, 804, 806, 807, 808, 809,
        901, 902, 903, 904, 906, 907, 908, 909,

        110, 112, 113, 114, 115, 117, 118, 119,
        210, 212, 213, 214, 215, 217, 218, 219,
        310, 312, 313, 314, 315, 317, 318, 319,
        510, 512, 513, 514, 515, 517, 518, 519,
        610, 612, 613, 614, 615, 617, 618, 619,
        710, 712, 713, 714, 715, 717, 718, 719,
        810, 812, 813, 814, 815, 817, 818, 819,
        910, 912, 913, 914, 915, 917, 918, 919,

        120, 121, 123, 124, 125, 126, 128, 129,
        220, 221, 223, 224, 225, 226, 228, 229,
        320, 321, 323, 324, 325, 326, 328, 329,
        520, 521, 523, 524, 525, 526, 528, 529,
        620, 621, 623, 624, 625, 626, 628, 629,
        720, 721, 723, 724, 725, 726, 728, 729,
        820, 821, 823, 824, 825, 826, 828, 829,
        920, 921, 923, 924, 925, 926, 928, 929,

        130, 131, 132, 134, 135, 136, 137, 139,
        230, 231, 232, 234, 235, 236, 237, 239,
        330, 331, 332, 334, 335, 336, 337, 339,
        530, 531, 532, 534, 535, 536, 537, 539,
        630, 631, 632, 634, 635, 636, 637, 639,
        730, 731, 732, 734, 735, 736, 737, 739,
        830, 831, 832, 834, 835, 836, 837, 839,
        930, 931, 932, 934, 935, 936, 937, 939,

        140, 141, 142, 143, 145, 146, 147, 148,
        240, 241, 242, 243, 245, 246, 247, 248,
        340, 341, 342, 343, 345, 346, 347, 348,
        540, 541, 542, 543, 545, 546, 547, 548,
        640, 641, 642, 643, 645, 646, 647, 648,
        740, 741, 742, 743, 745, 746, 747, 748,
        840, 841, 842, 843, 845, 846, 847, 848,
        940, 941, 942, 943, 945, 946, 947, 948,

        151, 152, 153, 154, 156, 157, 158, 159,
        251, 252, 253, 254, 256, 257, 258, 259,
        351, 352, 353, 354, 356, 357, 358, 359,
        551, 552, 553, 554, 556, 557, 558, 559,
        651, 652, 653, 654, 656, 657, 658, 659,
        751, 752, 753, 754, 756, 757, 758, 759,
        851, 852, 853, 854, 856, 857, 858, 859,
        951, 952, 953, 954, 956, 957, 958, 959,

        160, 162, 163, 164, 165, 167, 168, 169,
        260, 262, 263, 264, 265, 267, 268, 269,
        360, 362, 363, 364, 365, 367, 368, 369,
        560, 562, 563, 564, 565, 567, 568, 569,
        660, 662, 663, 664, 665, 667, 668, 669,
        760, 762, 763, 764, 765, 767, 768, 769,
        860, 862, 863, 864, 865, 867, 868, 869,
        960, 962, 963, 964, 965, 967, 968, 969,

        170, 171, 173, 174, 175, 176, 178, 179,
        270, 271, 273, 274, 275, 276, 278, 279,
        370, 371, 373, 374, 375, 376, 378, 379,
        570, 571, 573, 574, 575, 576, 578, 579,
        670, 671, 673, 674, 675, 676, 678, 679,
        770, 771, 773, 774, 775, 776, 778, 779,
        870, 871, 873, 874, 875, 876, 878, 879,
        970, 971, 973, 974, 975, 976, 978, 979,

        180, 181, 182, 184, 185, 186, 187, 189,
        280, 281, 282, 284, 285, 286, 287, 289,
        380, 381, 382, 384, 385, 386, 387, 389,
        580, 581, 582, 584, 585, 586, 587, 589,
        680, 681, 682, 684, 685, 686, 687, 689,
        780, 781, 782, 784, 785, 786, 787, 789,
        880, 881, 882, 884, 885, 886, 887, 889,
        980, 981, 982, 984, 985, 986, 987, 989,

        190, 191, 192, 193, 195, 196, 197, 198,
        290, 291, 292, 293, 295, 296, 297, 298,
        390, 391, 392, 393, 395, 396, 397, 398,
        590, 591, 592, 593, 595, 596, 597, 598,
        690, 691, 692, 693, 695, 696, 697, 698,
        790, 791, 792, 793, 795, 796, 797, 798,
        890, 891, 892, 893, 895, 896, 897, 898,
        990, 991, 992, 993, 995, 996, 997, 998
    ];
    var _64s_str = '[01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 16, 20, 21, 23, 27, 29, 30, 31, 32, 33, 35, 36, 37, 38, 40, 41, 44, 45, 46, 47, 50, 53, 54, 55, 56, 59, 60, 61, 63, 64, 65, 66, 67, 68, 70, 73, 74, 76, 77, 79, 80, 83, 86, 88, 89, 90, 92, 95, 98]';
    //create th
    //var ths = $('.itable>thead>tr');
    //_64s.forEach(function (el, index) {
    //    var th = document.createElement("th");
    //    th.class = "text-center";
    //    th.innerText = (index + 1) + 'th';
    //    ths.append(th);
    //});

    var table = $('.itable>tbody');
    table[0].innerHTML = '';
    var html = '';

    //Find Datelottery
    var datelotterys = [];
    data.forEach(function (element, index) {
        if (!datelotterys.includes(element.DateLottery)) {
            datelotterys.push(element.DateLottery);
        }
    });
    datelotterys.forEach(function (date, index) {

        var resultlotterybydate = [];
        data.find(function (element) {
            if (element.DateLottery === date) {
                resultlotterybydate.push(element);
            }
        });
        var rl_html = '<tr>';
        rl_html += '<td class="text-center text-loterry">' + date + '</td>';
        var profit = -2 * _640s.length;
        resultlotterybydate.forEach(function (element, index) {
            if (element.NameLottery === "G00") {
                var g00_3 = element.Value.substring(element.Value.length - 3, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_640s.includes(parseInt(g00_3)) ? "text-true" : "text-fail") + '">' + g00_3 + '</td>';
                if (_640s.includes(parseInt(g00_3))) {
                    profit += 972.5;
                }
            }

            if (element.NameLottery === "G11") {
                var g11_3 = element.Value.substring(element.Value.length - 3, element.Value.length);
                rl_html += '<td class="text-center text-loterry ' + (_640s.includes(parseInt(g11_3)) ? "text-true" : "text-fail") + '">' + g11_3 + '</td>'
                if (_640s.includes(parseInt(g11_3))) {
                    profit += 972.5;
                }
            }
        });
        rl_html += '<td class="text-center text-loterry ' + (profit > 0 ? "text-true" : "text-fail") + '">' + profit + '</td>';
        rl_html += '</tr>';
        profitall += profit;
        if (date.substring(date.length - 2, date.length) === '01') {
            profitbymonths.push(profitmonth);
            ox.push(date);
            profitmonth = 0;
        }
        profitmonth += profit;
        html += rl_html;
    });
    console.log(profitall);
    console.log(profitbymonths);
    table[0].innerHTML = html;

    //chart
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ox,
            datasets: [{
                label: '# profit',
                data: profitbymonths,
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
})