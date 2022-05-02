/** CSVファイルの読み込み **/
const input = document.getElementById('CSV_File');
const reader = new FileReader();
var csv_txt = "";
input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    //ファイルの種類を絞る
    if (file.type === 'text/csv') {
        reader.onload = () => {
            csv_txt = reader.result;
            console.log(csv_txt);
        }
        reader.readAsText(file);
    }
});

function CSV_Import() {
    console.log(csv_txt);
    var csv_list_sub = csv_txt.split("\r\n");
    var csv_list = [];
    for (var i = 0; i < csv_list_sub.length; i++) {
        csv_list.push(csv_list_sub[i].split(", "));
    }
    console.log(csv_list);
    for (var i = 1; i <= 22; i++) {
        var data = csv_list[i - 1];
        document.getElementById("term" + i).value = data[1];
        document.getElementById("ans" + i).value = data[2];
    }
}

/** マッキーノリストの作成 **/
var mk_list = [];
var buffer = [];
var trash = [];
var select = -1;

function MKStart() {
    mk_list = [];
    for (var i = 1; i <= 22; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        mk_list.push([i, term.value, ans.value]);
    }
    console.log(mk_list);

    buffer = [];
    trash = [];
    for (var i = 1; i <= 22; i++) buffer.push(i);
    document.getElementById("buffer").textContent = buffer;
    location.href = "#title";
}

function NextQuestion() {
    var num = Math.random() * buffer.length | 0;
    select = buffer.splice(num, 1);
    trash.push(select);

    var select_data = mk_list[select - 1];
    document.getElementById("buffer").textContent = buffer;
    document.getElementById("trash").textContent = trash;
    document.getElementById("question").textContent = select + ": " + select_data[1];
    document.getElementById("answer").textContent = select + ": ";
}

function ViewAns() {
    var select_data = mk_list[select - 1];
    document.getElementById("answer").textContent = select + ": " + select_data[2];
}
