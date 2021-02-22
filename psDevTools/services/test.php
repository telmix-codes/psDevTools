<?php
G::LoadClass('pmFunctions');
// $_REQUEST['option'] = 'getProcesses';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchDynaforms';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TEXT_SEARCH'] = 'Información del gestor';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'getDynaform';
// $_REQUEST['DYN_UID'] = '6369852065f5bea93e475e5093700009';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchTriggers';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TEXT_SEARCH'] = 'Gestor';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'getTrigger';
// $_REQUEST['TRI_UID'] = '1023682415f8a23d6a4ff30076093099';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchOutputDocuments';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TEXT_SEARCH'] = 'patrimonial';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'getOutputDocument';
// $_REQUEST['OUT_DOC_UID'] = '1467240795faf0551a04537033230598';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchSteps';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TAS_UID'] = '7416574345fd221a3ad8146031542481';  //Optional
// $_REQUEST['TEXT_SEARCH'] = '';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchStepsTrigger';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';  //2047826255f5b883a9ff835071983075
// $_REQUEST['TAS_UID'] = '';  //Optional 1068150395fd22a8c4dcf29077664845
// $_REQUEST['TRI_UID'] = ''; //Optional 8929008295f627b7bb776d3077659334
// $_REQUEST['TEXT_SEARCH'] = 'sol';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'getStepsByTask';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TAS_UID'] = '9145072545f5b8b85c2f975006250643';
// // $_REQUEST['TRI_UID'] = '8929008295f627b7bb776d3077659334'; //Optional
// // $_REQUEST['TEXT_SEARCH'] = 'SOL_DESESTIMAR_SOLICITUD';
// // $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchFlowCondition';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TEXT_SEARCH'] = '';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'getStepDetails';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['STEP_UID'] = '1119886295fd258e9649548028008112';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

$_REQUEST['option'] = 'searchInputDocuments';
$_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
$_REQUEST['TEXT_SEARCH'] = 'trabajo';
$_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

/*
*
* SQL CONSOLE
*
*/
// $_REQUEST['option'] = 'runSqlConsole';
// $_REQUEST['SQL_TEXT'] = '
// SELECT PRO_UID,
//             PRO_ID,
//             PRO_TITLE,
//             PRO_DESCRIPTION,
//             PRO_PARENT,
//             PRO_CREATE_DATE,
//             PRO_UPDATE_DATE
//     FROM PROCESS
//     ORDER BY PRO_TITLE
// ';

// // // DELETE
// // // UPDATE
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

$_REQUEST['option'] = 'getNamesTableAndColums';
require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';

// $_REQUEST['option'] = 'searchVariables';
// $_REQUEST['PRO_UID'] = '2047826255f5b883a9ff835071983075';
// $_REQUEST['TEXT_SEARCH'] = 'ServicioGarante';
// $_REQUEST['TEXT_CASE_SENSITIVE'] = '0';
// require_once PATH_PLUGIN_PS_DEVTOOLS . 'controllers/devToolsAjax.php';
