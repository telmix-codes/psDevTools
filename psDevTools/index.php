<?php
global $G_TMP_MENU;
global $RBAC;

if ($RBAC->userCanAccess('PS_DEVTOOLS') == 1) {
    G::loadClass('pmFunctions');
    require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/class.PublishSmarty.php';
    require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/devToolsFunctions.php';

    $config['skin'] = $_SESSION['currentSkin'];

    //Select all Configuration Variables
    // $aConfigData = json_decode(aadGetConfiguration(), true);

    $publish = new PublishSmarty();
    $publish->addVarJs('config', $config);
    // $publish->addVarJs("aConfigData", $aConfigData);
    $publish->smarty->assign('pathSQLTemplate', PATH_PLUGIN_PS_DEVTOOLS . 'templates' . PATH_SEP . 'sqlConsolePage.html');
    $publish->smarty->assign('pathFinderTemplate', PATH_PLUGIN_PS_DEVTOOLS . 'templates' . PATH_SEP . 'finderPage.html');

    if (isset($_SESSION['devTools_Authenticated']) && $_SESSION['devTools_Authenticated'] == true) {
        $publish->render('devToolsPage');
    } else {
        unset($_SESSION['devTools_Authenticated']);
        $publish->render('devToolsLogin');
    }

} else {
    echo "<h2 style='text-align: center'>You do not have permissions for this page, please contact your Administrator for further instrucctions.</h2>";
}
