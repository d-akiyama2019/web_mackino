<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous">
    </script>

    <title>マッキーノWeb</title>
</head>

<body>
    <header style="background-color:wheat">
        <h1 class="m-2">マッキーノWeb</h1>
    </header>

    <!-- マッキーノリスト作成 -->
    <div class="container-fluid my-2" style="background-color:lightskyblue">マッキーノリストの作成</div>

    <div class="input-group">
        <input type="file" class="form-control" accept=".csv" id="CSV_File">
        <button type="button" class="btn btn-outline-secondary" onclick="CSV_Import()">インポート</button>
    </div>

    <button type="button" class="btn btn-primary m-1" onclick="MKStart()">マッキーノを始める</button>

    <table class="table table-striped">
        <thead>
            <th scope="col">#</th>
            <th scope="col">用語</th>
            <th scope="col">答え</th>
        </thead>
        <tbody>
            <tr>
                <th scope="row">0</th>
                <td>(例) 仮説実験</td>
                <td>(例) かせつじっけん</td>
            </tr>
            <script>
                for (var i = 1; i <= 22; i++) {
                    document.write(
                        '<tr>' +
                        '<th scope="row">' + i + '</th>' +
                        '<td><input type="text" class="form-control" id="term' + i + '" placeholder="登録する用語を入力">' +
                        '</td>' +
                        '<td><input type="text" class="form-control" id="ans' + i + '" placeholder="登録する答えを入力">' +
                        '</td>' +
                        '</tr>'
                    );
                }
            </script>
        </tbody>
    </table>

    <button type="button" class="btn btn-primary m-1" onclick="MKStart()">マッキーノを始める</button>

    <p style="margin:500px"></p>
    <!-- マッキーノを始める -->
    <a id="title">
        <div class="container-fluid my-2" style="background-color:lightskyblue">マッキーノを始める</div>
    </a>

    <button type="button" class="btn btn-primary m-1" onclick="NextQuestion()">次の問題を表示</button>
    <button type="button" class="btn btn-secondary m-1" onclick="ViewAns()">答えを見る</button>

    <div class="container-fluid">
        <label>残り</label>
        <label id="buffer">なし</label>
    </div>

    <div class="container-fluid">
        <label>登場済み</label>
        <label id="trash">なし</label>
    </div>

    <div class="container-fluid">
        <label>問題</label>
        <label id="question">なし</label>
    </div>
    <div class="container-fluid">
        <label>答え</label>
        <label id="answer">なし</label>
    </div>

    <p style="margin:500px"></p>
    <!-- footer -->
    <footer style="background-color:lightgray">マッキーノWeb動作確認用ページ</footer>
    <script src="./index.js"></script>
</body>

</html>
