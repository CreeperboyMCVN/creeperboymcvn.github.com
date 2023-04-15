$(".create-rand-num").click(function (e) { 
    e.preventDefault();
    let num = $("#amt").val();
    let min = $("#min").val();
    let max = $("#max").val();
    let norp = $("#no_repeat").prop('checked');
    createRandomNums(num, min, max, norp);
});

function createRandomNums(num, min, max, norp) {
    $(".result").text(" ");
    if (parseInt(num) > 999 || parseInt(num) < 1) {
        $(".result").text("Số lần tạo phải giữa 1 và 999");
        return 0;
    }

    if (Math.abs(parseInt(min)) > 999999 || Math.abs(parseInt(max)) > 999999) {
        $(".result").text("Giá trị tối đa là +/-999999");
        return 0;
    }
    if (max < min) {
        $(".result").text("Số thứ 2 phải lớn hơn số thứ nhất nha .-.");
        return 0;
    }
    let range = (max - min) + 1;
    if ((num > range) && (norp)) {
        $(".result").text(`Khoảng có ${range} số mà đòi ${num} số khác nhau thì có cái nịt.`);
        return 1;
    }
    let r = [];
    let i = 0;
    while (i < num) {
        let random = parseInt(min)+Math.floor(Math.random()*range);
        if (norp) {
            if (!(r.includes(random))) {
                r[i] = random;
                
                i++;
            }
        } else {
            r[i] = random;
            
            i++;
        }
    }
    let res = "";
    for (i = r.length - 1; i >= 0; i--) {
        res += r[i]+", ";
    }
    $(".result").text(res);
    return r;
}