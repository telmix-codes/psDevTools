<?php
global $G_TMP_MENU;
global $RBAC;

if ($RBAC->userCanAccess('PS_DEVTOOLS') == 1) {
    // $G_TMP_MENU->AddIdRawOption("ID_DEVTOOLS_MENU_01", "../psDevTools/devToolsPage", "Dev Tools", "", "", "settings");
    // $G_TMP_MENU->AddIdRawOption("ID_DEVTOOLS_MENU_01", "../psDevTools/devToolsPage", "Dev Tools", "", "", "");
}
?>