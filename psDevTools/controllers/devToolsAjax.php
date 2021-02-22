<?php
G::LoadClass('pmFunctions');
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/psDevToolsFunctions.php';
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/psDevToolsSqlConsoleFunctions.php';
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/env.php';

$option = $_REQUEST['option'];
header('Content-type:application/json');

switch ($option) {
    //Get getProcesses
    case 'getProcesses':
        $response = getProcesses();
        echo json_encode($response);
        break;
    //Get searchDynaforms
    case 'searchDynaforms':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];
        $response = searchDynaforms($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE);
        echo json_encode($response);
        break;
    //getDynaform
    case 'getDynaform':
        $DYN_UID = $_REQUEST['DYN_UID'];
        $response = getDynaform($DYN_UID);
        echo json_encode($response);
        break;
    //searchTriggers
    case 'searchTriggers':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];
        $response = searchTriggers($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE);
        echo json_encode($response);
        break;

    //getTrigger
    case 'getTrigger':
        $TRI_UID = $_REQUEST['TRI_UID'];
        $response = getTrigger($TRI_UID);
        echo json_encode($response);
        break;

    //searchOutputDocuments
    case 'searchOutputDocuments':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];
        $response = searchOutputDocuments($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE);
        echo json_encode($response);
        break;

    //getOutputDocument
    case 'getOutputDocument':

        $OUT_DOC_UID = $_REQUEST['OUT_DOC_UID'];
        $response = getOutputDocument($OUT_DOC_UID);
        echo json_encode($response);
        break;

    //searchSteps
    case 'searchSteps':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];
        $TAS_UID = $_REQUEST['TAS_UID']; //Optional
        $response = searchSteps($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE, $TAS_UID);
        echo json_encode($response);
        break;
    //searchStepsTrigger
    case 'searchStepsTrigger':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];
        $TAS_UID = $_REQUEST['TAS_UID']; //Optional
        $TRI_UID = $_REQUEST['TRI_UID']; //Optional
        $response = searchStepsTrigger($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE, $TAS_UID, $TRI_UID);
        // g::pr($response);
        echo json_encode($response);
        break;
    //getStepsByTask
    case 'getStepsByTask':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TAS_UID = $_REQUEST['TAS_UID']; //Optional
        $response = getStepsByTask($PRO_UID, $TAS_UID);
        // g::pr($response);
        echo json_encode($response);
        break;

    //searchFlowCondition
    case 'searchFlowCondition':
        $PRO_UID = $_REQUEST['PRO_UID'];
        // $TAS_UID = $_REQUEST['TAS_UID']; //Optional
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];

        $response = searchFlowCondition($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE);
        // g::pr($response);
        echo json_encode($response);
        break;

    //sqlConsole
    case 'runSqlConsole':
        $SQL_TEXT = $_REQUEST['SQL_TEXT'];

        $response = runSqlConsole($SQL_TEXT);
        // g::pr($response);
        echo json_encode($response);
        break;

    //searchVariables
    case 'searchVariables':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];

        $response = searchVariables($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE);
        // g::pr($response);
        echo json_encode($response);
        break;

    //searchInputDocuments
    case 'searchInputDocuments':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $TEXT_SEARCH = $_REQUEST['TEXT_SEARCH'];
        $TEXT_CASE_SENSITIVE = $_REQUEST['TEXT_CASE_SENSITIVE'];

        $response = searchInputDocuments($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE);
        // g::pr($response);
        echo json_encode($response);
        break;

    //getStepDetails
    case 'getStepDetails':
        $PRO_UID = $_REQUEST['PRO_UID'];
        $STEP_UID = $_REQUEST['STEP_UID'];

        $response = getStepDetails($PRO_UID, $STEP_UID);
        // g::pr($response);
        echo json_encode($response);
        break;

    //getNamesTableAndColums
    case 'getNamesTableAndColums':

        $response = getNamesTableAndColums();
        // g::pr($response);
        echo json_encode($response);
        break;

    //logout
    case 'logout':
        unset($_SESSION['devTools_Authenticated']);
        echo json_encode(['status' => 1]);
        break;

    //checkpassword
    case 'checkpassword':
        $passwordValue = $_REQUEST['passwordValue'];
        if ($passwordValue == $configEnv['password']) {
            $dataResponse = ['status' => 1,'password' => $configEnv['password']];
        } else {
            $dataResponse = ['status' => 0,'password' => $configEnv['password']];
        }
        echo json_encode($dataResponse);
        break;
}
