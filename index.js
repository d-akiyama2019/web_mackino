var mk_list = [];
var buffer = [];
var trash = [];
var select = -1;
var count = 22;

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
    if (json_list.length < count) {
        while (true) {
            MKList_Sub();
            if (json_list.length == count) break;
        }
    }
    if (json_list.length > count) {
        while (true) {
            MKList_Add();
            if (json_list.length == count) break;
        }
    }
    for (var i = 1; i <= count; i++) {
        var data = json_list[i - 1];
        document.getElementById("term" + i).value = data[1];
        document.getElementById("ans" + i).value = data[2];
    }
}
/** JSONファイルの書き出し **/
function JSON_Export() {
    mk_list = [];
    for (var i = 1; i <= count; i++) {
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
/** マッキーノリストの問題数 **/
var mk_table = document.getElementById('MKTable');

function MKList_Add() {
    count++;
    var newRow = mk_table.insertRow(-1);

    var newHeader = document.createElement('th');
    newHeader.scope = "row";
    newRow.appendChild(newHeader);
    var newText = document.createTextNode(count);
    newHeader.appendChild(newText);

    var newCell = newRow.insertCell(-1);
    var input_form = document.createElement('input');
    input_form.type = 'text';
    input_form.className = 'form-control';
    input_form.id = 'term' + count;
    input_form.placeholder = '登録する用語を入力';
    newCell.appendChild(input_form);

    var newCell = newRow.insertCell(-1);
    var input_form = document.createElement('input');
    input_form.type = 'text';
    input_form.className = 'form-control';
    input_form.id = 'ans' + count;
    input_form.placeholder = '登録する答えを入力';
    newCell.appendChild(input_form);

    document.getElementById("count").textContent = count;
}

function MKList_Sub() {
    if (count <= 1) return;
    count--;
    mk_table.deleteRow(-1);
    document.getElementById("count").textContent = count;
}
/** マッキーノリストの作成 **/
function MKStart() {
    mk_list = [];
    for (var i = 1; i <= count; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        if (!term.value || term.value == "") continue;
        mk_list.push([i, term.value, ans.value]);
    }
    if (mk_list.length < count) {
        alert("表の空欄をすべて埋めてください");
        return;
    }

    buffer = [];
    trash = [];
    ans_flag = true;
    for (var i = 1; i <= count; i++) buffer.push(i);
    document.getElementById("buffer").textContent = buffer;
    location.href = "#title";
    document.getElementById("question").textContent = "準備完了";
    document.getElementById("answer").textContent = "";
}

/** マッキーノ開始 **/
var ans_flag = true;

function NextQuestion() {
    if (buffer.length < 1 && trash.length < 1) {
        MKStart();
        return;
    }
    if (buffer.length < 1) return;
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
    if (buffer.length < 1) return;
    var select_data = mk_list[select - 1];
    document.getElementById("answer").textContent = select + ": " + select_data[2];
    ans_flag = true;
}
