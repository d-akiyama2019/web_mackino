var mk_list = [];
var buffer = [];
var trash = [];
var select = -1;

/** JSONファイルの読み込み **/
const input = document.getElementById('JSON_File');
const reader = new FileReader();
var input_txt = "";
input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    //ファイルの種類を絞る
    if (file.type === 'application/json') {
        reader.onload = () => {
            input_txt = reader.result;
        }
        reader.readAsText(file);
    }
});

function JSON_Import() {
    var json_list = JSON.parse(input_txt);
    for (var i = 1; i <= 22; i++) {
        var data = json_list[i - 1];
        document.getElementById("term" + i).value = data[1];
        document.getElementById("ans" + i).value = data[2];
    }
}
/** JSONファイルの書き出し **/
function JSON_Export() {
    mk_list = [];
    for (var i = 1; i <= 22; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        mk_list.push([i, term.value, ans.value]);
    }
    const blob = new Blob([JSON.stringify(mk_list)], {
        type: "application/json"
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mackino_List.json';
    link.click();
}
/** マッキーノリストの作成 **/
function MKStart() {
    mk_list = [];
    for (var i = 1; i <= 22; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        if (!term.value) continue;
        mk_list.push([i, term.value, ans.value]);
    }
    if (mk_list.length < 22) {
        alert("単語を22個登録してください");
        return;
    }

    buffer = [];
    trash = [];
    ans_flag = true;
    for (var i = 1; i <= 22; i++) buffer.push(i);
    document.getElementById("buffer").textContent = buffer;
    location.href = "#title";
}

/** マッキーノ開始 **/
var ans_flag = true;

function NextQuestion() {
    if (buffer.length < 1) MKStart();
    if (!ans_flag) {
        ViewAns();
        return;
    }
    var num = Math.random() * buffer.length | 0;
    select = buffer.splice(num, 1);
    trash.push(select);

    var select_data = mk_list[select - 1];
    document.getElementById("buffer").textContent = buffer;
    document.getElementById("trash").textContent = trash;
    document.getElementById("question").textContent = select + ": " + select_data[1];
    document.getElementById("answer").textContent = select + ": ";
    ans_flag = false;
}

function ViewAns() {
    var select_data = mk_list[select - 1];
    document.getElementById("answer").textContent = select + ": " + select_data[2];
    ans_flag = true;
}
