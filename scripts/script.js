//////////////////////////////////////////////////////////////////////////////////////////
// Kirish qismining kodini boshlanishi

$('#login').change(function () {
    $('.error').css('display', 'none')
})

$('#password').change(function () {
    $('.error').css('display', 'none')
})
$('.open').click(function () {
    $.getJSON('./jsondata/password.json', function (data) {
        if ($('#login').val() == data.login && $('#password').val() == data.password) {
            $('.head').css('display', 'none')
            $('.neck').css('display', 'block')
        } else {
            $('.error').css('display', 'block')
        }
    })
})
// Kirish qismining kodini tugashi
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
// Ma'lumotlar

let teachers
let natija = 0
$.getJSON('./jsondata/teachers.json', function (data) {
    teachers = data
})

let regions = ['Andijon', 'Buxoro', 'Farg`ona', 'Jizzax', 'Namangan', 'Navoiy', 'Qashqadaryo', 'Qoraqalpog`iston', 'Samarqand', 'Sirdaryo', 'Surxondaryo', 'Toshkent', 'Xorazm']
let malumotlar = [0, 0, 0, 0, 0, 0, 0]
let time = 3600
let answers = []
for (let i = 0; i <= 39; i++) {
    answers.push(1)   
}
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
// Tanlash qisminig boshlanishi
regions.forEach(viloyat => {
    $('#viloyat').append(`<option value='${viloyat}'>${viloyat}</option>`)
})
$('#viloyat').change(function () {
    $('#tuman').empty()
    $('#tuman').append(`<option selected>Tumaningizni tanlang</option>`)
    let tuman = []
    teachers.forEach(teacher => {
        let k = 0
        tuman.forEach(tum => {
            if (teacher.tuman == tum) {
                k++
            }
        })
        if (k == 0) {
            tuman.push(teacher.tuman)
        }
    })
    tuman.forEach(tum => {
        $('#tuman').append(`<option value='${tum}'>${tum}</option>`)
    })
    malumotlar[0] = 1
})

$('#tuman').change(function () {
    $('#maktab').empty()
    $('#maktab').append(`<option selected>Maktabingizni tanlang</option>`)
    let maktab = []
    teachers.forEach(teacher => {
        let k = 0
        maktab.forEach(mak => {
            if (teacher.viloyat == $('#viloyat').val() && teacher.tuman == $('#tuman').val()) {
                console.log($('#viloyat').val(), $('#tuman').val())
                if (teacher.maktab == mak) k++
            }
        })
        if (teacher.viloyat == $('#viloyat').val() && teacher.tuman == $('#tuman').val() && k != 1) {
            maktab.push(teacher.maktab)
        }
    })
    maktab.forEach(mak => {
        $('#maktab').append(`<option value='${mak}'>${mak}</option>`)
    })
    malumotlar[1] = 1
})

$('#maktab').change(function () {
    $('#fan').empty()
    $('#fan').append(`<option selected>Faningizni tanlang</option>`)
    let fan = []
    teachers.forEach(teacher => {
        let k = 0
        fan.forEach(fan => {
            if (teacher.viloyat == $('#viloyat').val() && teacher.tuman == $('#tuman').val() && teacher.maktab == $('#maktab').val()) {
                if (teacher.fan == f) k++
            }
        })
        if (teacher.viloyat == $('#viloyat').val() && teacher.tuman == $('#tuman').val() && teacher.maktab == $('#maktab').val() && k != 1) {
            fan.push(teacher.fan)
        }
    })
    fan.forEach(f => {
        $('#fan').append(`<option value='${f}'>${f}</option>`)
    })
    malumotlar[2] = 1
})

$('#fan').change(function () {
    $('#toifa').empty()
    $('#toifa').append(`<option selected>Toifangizni tanlang</option>`)
    $('#name').empty()
    $('#name').append(`<option selected>Ism familiyangizni tanlang</option>`)
    teachers.forEach(teacher => {
        if (teacher.viloyat == $('#viloyat').val() && teacher.tuman == $('#tuman').val() && teacher.maktab == $('#maktab').val() && teacher.fan == $('#fan').val()) {
            $('#name').append(`<option value="${teacher.surname + ' ' + teacher.name + ' ' + teacher.fathername}">${teacher.surname + ' ' + teacher.name + ' ' + teacher.fathername}</option>`)
            $('#toifa').append(`<option value="${teacher.toifa}">${teacher.toifa}</option>`)
        }
    })
    malumotlar[3]
})

$('#name').change(() => {
    malumotlar[4] = 1
})

let languages = ['O`zbek tili', 'Qozoq tili', 'Qoraqolpoq tili', 'Rus tili']
languages.forEach(language => {
    $('#til').append(`<option value='${language}'>${language}</option>`)
})

$('#til').change(() => {
    malumotlar[5] = 1
})

$('#toifa').change(() => {
    malumotlar[6] = 1
})

$('.boshlash').click(() => {
    teachers.forEach(teacher => {
        if (
            teacher.viloyat == $('#viloyat').val() &&
            teacher.tuman == $('#tuman').val() &&
            teacher.maktab == $('#maktab').val() &&
            teacher.fan == $('#fan').val() &&
            teacher.surname + ' ' + teacher.name + ' ' + teacher.fathername == $('#name').val() &&
            teacher.toifa == $('#toifa').val()
        ) {
            if (teacher.fan == 'Informatika' || teacher.fan == 'Matematika' || teacher.fan == 'Fizika' || teacher.fan == 'Kimyo')
                time = 5400
            $('.neck').css('display', 'none')
            $('.body').css('display', 'block')
            $('.name').text(`${$('#name').val()} ` + ` (${$('#toifa').val()})`)
            $('.lesson').text(`Fan: ${$('#fan').val()}`)
            loadtest()
        }
    });
    $('#error').css('display', 'block')
    $('#error').text(`Ma'lumotlarni tanlashda xatolikka yo'l qo'yilgan yoki tizimda mavjud bo'lmagan foydalanuvchi tanlangan. Iltimos ma'lumotlarni qaytadan tekshirib to'ldiring!`)
})
// Tanlash qismining tugashi
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////
// Test ishlash qismining boshlanishi
function loadtest() {
    $.getJSON(`./jsondata/${$('#fan').val()}.json`, function (tests) {
        for (let i = 1; i <= 40; i++) {
            let l = tests.length - 1
            let n = Math.floor(Math.random() * l)
            console.log(n + ' ' + tests[n].savol)
            $(`#savol${i}`).text(tests[n].savol)
            let m = []
            let z = 0
            while (m.length != 4) {
                let k = Math.floor(Math.random() * 4)
                let s = 0
                m.forEach(element => {
                    if (k == element) s++
                })
                if (s == 0) {
                    z++
                    if (k == 0) {
                        $(`#L${i}${z}`).append(tests[n].A)
                        $(`#T${i}${z}`).val(k)
                    }
                    if (k == 1) {
                        $(`#L${i}${z}`).append(tests[n].B)
                        $(`#T${i}${z}`).val(k)
                    }
                    if (k == 2) {
                        $(`#L${i}${z}`).append(tests[n].C)
                        $(`#T${i}${z}`).val(k)
                    }
                    if (k == 3) {
                        $(`#L${i}${z}`).append(tests[n].D)
                        $(`#T${i}${z}`).val(k)
                    }
                    m.push(k)
                }
            }
            tests.splice(n, 1)
        }
    })
}

for (let i = 1; i <= 40; i++) {
    $('.question_numbers').append(`<div class="test_number" id="${i}">${i}</div>`)

    $('.tests').append(`<table id="test${i}" class="d-none">
    <tr><td> <span class="number">${i}.</span>  <span id="savol${i}" class="savol">Savol</span></td></tr>
    <tr><td><label for="T${i}1" id="L${i}1"><input type="radio" name="answers_${i}" id="T${i}1" value ="False" class='answers'></label></td></tr>
    <tr><td><label for="T${i}2" id="L${i}2"><input type="radio" name="answers_${i}" id="T${i}2" value ="False" class='answers'></label></td></tr>
    <tr><td><label for="T${i}3" id="L${i}3"><input type="radio" name="answers_${i}" id="T${i}3" value ="False" class='answers'></label></td></tr>
    <tr><td><label for="T${i}4" id="L${i}4"><input type="radio" name="answers_${i}" id="T${i}4" value ="False" class='answers'></label></td></tr>
</table>`)
}
$('#test1').removeClass('d-none')
$('#1').addClass('bg-red')


let qnumbers = 1

$('.test_number').click(function () {
    let n = this.id
    qnumbers = n
    for (let i = 1; i <= 40; i++) {
        if (n == i) {
            $(`#${n}`).addClass('bg-red')
            $(`#test${n}`).removeClass('d-none')
        } else {
            $(`#${i}`).removeClass('bg-red')
            $(`#test${i}`).addClass('d-none')
        }

    }
})

$('.answers').change(function () {
    let n
    let s
    if (this.id.length > 3) {
        n = this.id[1] + this.id[2]
        s = this.id[3]
    } else {
        n = this.id[1]
        s = this.id[2]
    }
    answers[n-1] = this.value
    if (s == '1') {
        $(`#L${n}1`).addClass('bg-skyblue')
        $(`#L${n}2`).removeClass('bg-skyblue')
        $(`#L${n}3`).removeClass('bg-skyblue')
        $(`#L${n}4`).removeClass('bg-skyblue')
    }
    if (s == '2') {
        $(`#L${n}1`).removeClass('bg-skyblue')
        $(`#L${n}2`).addClass('bg-skyblue')
        $(`#L${n}3`).removeClass('bg-skyblue')
        $(`#L${n}4`).removeClass('bg-skyblue')
    }
    if (s == '3') {
        $(`#L${n}1`).removeClass('bg-skyblue')
        $(`#L${n}2`).removeClass('bg-skyblue')
        $(`#L${n}3`).addClass('bg-skyblue')
        $(`#L${n}4`).removeClass('bg-skyblue')
    }
    if (s == '4') {
        $(`#L${n}1`).removeClass('bg-skyblue')
        $(`#L${n}2`).removeClass('bg-skyblue')
        $(`#L${n}3`).removeClass('bg-skyblue')
        $(`#L${n}4`).addClass('bg-skyblue')
    }
    $(`#${n}`).addClass('bg-blue')
})

$('.next').click(function () {
    if (qnumbers != 40) {
        for (let i = 1; i <= 40; i++) {
            $(`#${i}`).removeClass('bg-red')
            $(`#test${i}`).addClass('d-none')
        }
        qnumbers++
        $(`#${qnumbers}`).addClass('bg-red')
        $(`#test${qnumbers}`).removeClass('d-none')
    }
})

$('.prev').click(function () {
    if (qnumbers != 1) {
        for (let i = 1; i <= 40; i++) {
            $(`#${i}`).removeClass('bg-red')
            $(`#test${i}`).addClass('d-none')
        }
        qnumbers--
        $(`#${qnumbers}`).addClass('bg-red')
        $(`#test${qnumbers}`).removeClass('d-none')
    }
})

$('.end_test').click(() => {
    $('.content').css('display', 'block')
})


$('.yes').click(endtest)

function endtest() {
    let k = 0
    answers.forEach(element => {
        if (element == 0){
            k++
        }
    });
    $('.resultname').text($('#name').val() + ` (${$('#toifa').val()})`)
    $('.test_nomi1').text($('#fan').val())
    $('.tugri_javob1').text(k)
    $('.ball1').text(k*2.5)
    $('.body').css('display', 'none')
    $('.content').css('display', 'none')
    $('.footer').css('display', 'block')
}

$('.no').click(() => {
    $('.content').css('display', 'none')
})
// Test ishlash qisminig tugashi
//////////////////////////////////////////////////////////////////////////////////////////

$('.close').click(() => {
    $('.neck').css('display', 'block')
    $('.footer').css('display', 'none')
})
// Vaqt qisminig boshlanishi


function addTime() {

    let hour = Math.floor(time / 3600)
    let minut = Math.floor((time - hour * 3600) / 60)
    let sek = time - hour * 3600 - minut * 60
    $('#hour').text(`0${hour}`)
    if (minut < 10) {
        $('#minut').text(`0${minut}`)
    } else {
        $('#minut').text(`${minut}`)
    }
    if (sek < 10) {
        $('#second').text(`0${sek}`)
    } else {
        $('#second').text(`${sek}`)
    }
    if (time == 0){
        endtest()
    }
    time--
    
}

setInterval("addTime()", 1000)

// vaqt qismining tugashi