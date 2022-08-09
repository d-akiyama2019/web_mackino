var mk_list = [];
var buffer = [];
var trash = [];
var select = -1;
var count = 22;
// JSON_parseされたマッキーノリスト
var input_txt = "";
// マッキーノリストのID
const mk_table = document.getElementById('MKTable');
// JSONファイルのID
const input = document.getElementById('JSON_File');
// ファイルリーダー（JSONファイル用）
const reader = new FileReader();
// URLのクエリパラメーター
const searchParams = new URLSearchParams(window.location.search);

/** JSONファイルの読み込み **/
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

/** JSONファイルの解析 **/
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

/** URLクエリによる初期設定 **/
if (searchParams.has('src')) {
    var base64_list = searchParams.get('src');
    input_txt = decodeURIComponent(base64_list);
    JSON_Import();
}

/** 共有用URLの生成 **/
function create_queryURL() {
    mk_list = [];
    for (var i = 1; i <= count; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        mk_list.push([i, term.value, ans.value]);
    }
    var queryURL =
        window.location.origin
        + window.location.pathname
        + "?src="
        + encodeURIComponent(JSON.stringify(mk_list))
        + "#title";
    document.getElementById("input_queryURL").value = queryURL;
}

/** 共有用URLをクリップボードにコピー **/
function copy_queryURL() {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(
            document.getElementById("input_queryURL").value
        );
    }
}

/** マッキーノリストの問題入力欄追加 **/
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

    var newCell = newRow.insertCell(-1);
    var input_form = document.createElement('button');
    input_form.type = 'button';
    input_form.className = 'btn btn-success';
    input_form.setAttribute('onclick', 'MKPreview(' + count + ')');
    input_form.textContent = 'プレビュー';
    newCell.appendChild(input_form);

    document.getElementById("count").textContent = count;
}

/** マッキーノリストの問題入力欄削除 **/
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

/** マッキーノのプレビュー **/
function MKPreview(num) {
    var MKModal = new bootstrap.Modal(document.getElementById('MKPreview'));

    mk_list = [];
    for (var i = 1; i <= count; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        mk_list.push([i, term.value, ans.value]);
    }

    var select = num;
    var select_data = mk_list[select - 1];
    document.getElementById("p-question").textContent = select + ": " + select_data[1];
    document.getElementById("p-answer").textContent = select + ": " + select_data[2];
    MathJax.typeset();

    MKModal.toggle();
}

/** マッキーノ開始 **/
var ans_flag = true;

function NextQuestion() {
    if (buffer.length < 1 && trash.length < 1) {
        MKStart();
        return;
    }
    if (!ans_flag) {
        ViewAns();
        return;
    }
    if (buffer.length < 1) return;
    var num = Math.random() * buffer.length | 0;
    select = buffer.splice(num, 1);
    trash.push(select);

    var select_data = mk_list[select - 1];
    document.getElementById("buffer").textContent = buffer;
    document.getElementById("trash").textContent = trash;
    document.getElementById("question").textContent = select + ": " + select_data[1];
    document.getElementById("answer").textContent = select + ": ";
    MathJax.typeset();
    ans_flag = false;
}

function ViewAns() {
    if (buffer.length < 1 && ans_flag) return;
    var select_data = mk_list[select - 1];
    document.getElementById("answer").textContent = select + ": " + select_data[2];
    MathJax.typeset();
    ans_flag = true;
}
