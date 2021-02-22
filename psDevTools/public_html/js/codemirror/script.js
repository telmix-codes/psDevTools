let dataJson = `{"name":"T1 - P1 - Revision del Solicitante","description":"Revisidel Solicitante","items":[{"type":"form","variable":"","var_uid":"","dataType":"","id":"4679478035f5ba3080be901090054687"}],"name1":"T1 - P1 - Revisidel Solicitante","description1":"Revisdel Solicitante","items1":[{"type":"form","variable":"","var_uid":"","dataType1":"","id":"4679478035f5ba3080be901090054687"}]}`;
let codejson = document.getElementById("codejson");
codejson.innerHTML = JSON.stringify(JSON.parse(dataJson), null, 2);

let dataPHP = `global $G_TMP_MENU;
global $RBAC;

if ($RBAC->userCanAccess('PS_DEVTOOLS') == 1) {
G::loadClass("pmFunctions");
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/class.PublishSmarty.php';
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/devToolsFunctions.php';

$config["skin"] = $_SESSION["currentSkin"];

//Select all Configuration Variables
// $aConfigData = json_decode(aadGetConfiguration(), true);

$publish = new PublishSmarty();
$publish->addVarJs("config", $config);
// $publish->addVarJs("aConfigData", $aConfigData);
$publish->render('devToolsPage');
} else {
echo "<h2 style='text-align: center'>You do not have permissions for this page, please contact your Administrator for further instrucctions.</h2>";
}`;
let codephp = document.getElementById("codephp");
codephp.innerHTML = dataPHP;


var configuration = {
    lineNumbers: true,
    // showToken: /\w/,
    theme: 'dracula',
    readOnly: true,
    highlightSelectionMatches: { searchInitalWord: 1, wordSearch: "type" },
    mode: { name: "javascript", json: true }
}
var cmEditor = CodeMirror.fromTextArea(document.getElementById("codejson"), configuration);

configuration.mode = { name: "application/x-httpd-php" }
configuration.mode = { name: "text/x-php" }
var cmEditorPHP = CodeMirror.fromTextArea(document.getElementById("codephp"), configuration);

boton.addEventListener('click', function () {
    cmEditor.setOption('highlightSelectionMatches', { searchInitalWord: 1, wordSearch: "id" })
    cmEditorPHP.setOption('highlightSelectionMatches', { searchInitalWord: 1, wordSearch: "$publish" })
})

