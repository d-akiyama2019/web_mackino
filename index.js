var mk_list = [];
var buffer = [];
var trash = [];
var select = -1;

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
        }
        reader.readAsText(file);
    }
});

function CSV_Import() {
    var csv_txt_sub = csv_txt;
    if (!csv_txt) return;
    if (csv_txt.indexOf("\r\n") > -1) {
        csv_txt_sub = csv_txt_sub.replace("\r\n", "\n");
        csv_txt_sub = csv_txt_sub.replace("\r", "");
    } else if (csv_txt.indexOf("\r") > -1) {
        csv_txt_sub = csv_txt_sub.replace("\r", "\n");
    }
    var csv_list_sub = csv_txt_sub.split("\n");
    var csv_list = [];
    for (var i = 0; i < csv_list_sub.length; i++) {
        csv_list.push(csv_list_sub[i].split(", "));
    }
    for (var i = 1; i <= 22; i++) {
        var data = csv_list[i - 1];
        document.getElementById("term" + i).value = data[1];
        document.getElementById("ans" + i).value = data[2];
    }
}

/** CSVファイルの書き出し **/
function CSV_Export() {
    mk_list = [];
    var dl_csv = "";
    for (var i = 1; i <= 22; i++) {
        var term = document.getElementById("term" + i);
        var ans = document.getElementById("ans" + i);
        mk_list.push([i, term.value, ans.value]);
        dl_csv += i + ", " + term.value + ", " + ans.value + "\r\n";
    }
    const blob = new Blob([dl_csv], {
        type: "text/plain"
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mackino_List.csv';
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
    for (var i = 1; i <= 22; i++) buffer.push(i);
    document.getElementById("buffer").textContent = buffer;
    location.href = "#title";
}

function NextQuestion() {
    if (buffer.length < 1) MKStart();
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
