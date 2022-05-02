/**
 * 名前リストの指定の位置を構成する文字のうち、いずれかをランダムに返却する
 * @param string 取得したい名前リストのキー
 * @return string リスト内からランダムに選択された1文字
 */
function getCharactor(number) {
  const charactor = Math.floor(lists[number].length*Math.random());
  return lists[number][charactor];
}


/**
 * 2文字の名前を取得する
 * @return string 2文字の名前
 */
function getName2() {
  return (getCharactor("f21") + getCharactor("f22"));
}


/**
 * 3文字の名前を取得する
 * @return string 3文字の名前
 */
function getName3() {
  return (getCharactor("f31") + getCharactor("f32") + getCharactor("f33"));
}


/**
 * 入力されたidに従って、対応する名前を取得して表示する
 * @param array 取得したいspan要素のid属性の配列
 */
function reloadNames(ids) {
  for (let i = 0; i < ids.length; i++){
    if (ids[i].match(/^name2_/)) {
      // idが"name2_"から始まる場合、2文字名を取得
      document.getElementById(ids[i]).textContent = getName2();
    } else if (ids[i].match(/^name3_/)) {
      // idが"name3_"から始まる場合、3文字名を取得
      document.getElementById(ids[i]).textContent = getName3();
    }
  }

  // リロード回数加算
  setReloadCount();
}


/**
 * チェックのついていない名前を再読み込みする
 */
function reloadNotCheckedIds() {
  const notCheckedIds = [];

  // 全てのinputタグからcheckbox要素かつチェックのついていないもののみ抽出する
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++){
    if(inputs[i].getAttribute('type') == 'checkbox' && !(inputs[i].checked)){
      notCheckedIds.push(inputs[i].value);
    }
  }
  reloadNames(notCheckedIds);
}


/**
 * 全ての名前表示部を再読み込みする
 * @param boolean true:実行時確認する / false:実行時確認しない
 */
function reloadAllName(doConfirm) {

  // リロード確認を行う場合
  if (doConfirm) {
    let confirmFlg = false;
    // 全てのinputタグからcheckbox要素を抽出する
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++){
      // 一つでもチェックが付いていたら、確認ダイアログを表示するためにフラグを立てる
      if(inputs[i].getAttribute('type') == 'checkbox' && inputs[i].checked){
        confirmFlg = true;
        break;
      }
    }
    if (confirmFlg) {
      // OK:リロード処理に進む キャンセル:何もしないでダイアログを消す
      if(!(window.confirm('チェックが付いている名前があります\n本当に全てリロードしますか？\n（リロードしてもチェックは外れません）'))){
        return;
      }
    }
  }

  // 名前表示部(name属性が'name'から始まるspanの要素）を全て取得する
  const nameLists = document.body.querySelectorAll("span[name^='name']");
  const ids = [];

  // idを配列化
  for (let i = 0; i < nameLists.length; i++){
    ids.push(nameLists[i].id);
  }

  reloadNames(ids);
}


/**
 * 全てのチェックボックスのチェックを操作する
 * @param boolean true:チェックオン / false:チェックオフ
 */
function controllAllCheckbox(controll) {
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++){
    if(inputs[i].getAttribute('type') == 'checkbox'){
      inputs[i].checked = controll;
    }
  }
}


/**
 * 名前とチェックボックスのテーブルを作成、表示する
 * @param string header テーブルの見出し
 * @param string name   id、name要素に入れる文字列。文書内で一意であること
 * @param number row    表示行数
 * @param number column 表示列数
 */
function disprayNamesAndCheckboxes(header, name, row, column) {
  // 一列あたりの幅
  const width = "110";
  let contents = '';
  let id = 0;

  for (let i = 0; i < row; i++) {
    contents = contents + '<tr>';
    for (let j = 0; j < column; j++) {
      let nameId = (name +'_'+ String(id));
      contents = contents + '<td width="'+ width +'"><label for="c_'+ nameId +'"><input type="checkbox" id="c_'+ nameId +'" value="'+ nameId +'" ><span name="'+ name + '" id="'+ nameId +'"></span></label></td>';
      id++;
    }
    contents = contents + '</tr>';
  }

  document.write('<table><th>'+ header +'</th>'+ contents + '</table>');
}


/**
 * リロード回数を取得、加算、表示する
 * @param number count 加算する値。デフォルト1
 */
function setReloadCount(count = 1) {
  // 表示中のリロード回数を取得。HTML上の初期値は0
  const dispCount = document.getElementById('reloadCount').textContent;

  // 引数の数値をリロード回数に加算して出力しなおす
  document.getElementById('reloadCount').textContent = parseInt(dispCount) + parseInt(count);
}


/**
 * ページ読み込み完了時に実行するメソッド
 */
window.onload = function() {
  reloadAllName(false);
  controllAllCheckbox(false);
}
