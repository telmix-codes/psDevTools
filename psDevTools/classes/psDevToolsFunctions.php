<?php
G::loadClass('pmFunctions');

/**
 * getProcesses
 *
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getProcesses()
{
    try {
        $sqlSOutput = 'SELECT PRO_UID,
                              PRO_ID,
                              PRO_TITLE,
                              PRO_DESCRIPTION,
                              PRO_PARENT,
                              PRO_CREATE_DATE,
                              PRO_UPDATE_DATE
                       FROM PROCESS
                       ORDER BY PRO_TITLE
                       ';

        // aadPropelExecuteQuery
        // $con = Propel::getConnection('workflow');
        // $stmt = $con->createStatement();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);
        // g::pr($resSOutput);
        // $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);
        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];

        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * aadPropelExecuteQuery
 * Execute queries with propel connection.
 *
 * @param $sqlStatement (String) //SQL code statement
 *
 * @return array
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function devToolsPropelExecuteQuery($sqlStatement = '')
{
    try {
        $connection = Propel::getConnection('workflow');
        $oPropel = $connection->createStatement();
        $resultQuery = $oPropel->executeQuery($sqlStatement, ResultSet::FETCHMODE_ASSOC);
        $response = true;
        if (gettype($resultQuery->getResource()) == 'object') {
            $response = [];
            while ($resultQuery->next()) {
                array_push($response, $resultQuery->getRow());
            }
        }
        return $response;
    } catch (Exception $e) {
        throw new Exception($e->getMessage(), 1);
    }
}

/**
 * searchDynaforms
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param integer $TEXT_CASE_SENSITIVE
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchDynaforms($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE = 0)
{
    try {
        // $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        // $TEXT_SEARCH = str_replace('\\', '\\\\\\', $TEXT_SEARCH);
        $TEXT_SEARCH = addslashes($TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $sqlSOutput = "SELECT DYN_UID,
                              DYN_ID,
                              DYN_TITLE,
                              DYN_DESCRIPTION,
                              DYN_VERSION,
                              DYN_UPDATE_DATE
                       FROM DYNAFORM
                       WHERE PRO_UID =  '$PRO_UID'
                       and
                       (
                           DYN_CONTENT LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                           DYN_TITLE LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                           DYN_DESCRIPTION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                       ORDER BY DYN_TITLE
                       ";
        // echo $sqlSOutput;
        // exit();

        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];

        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * getDynaform
 *
 * @param [type] $DYN_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getDynaform($DYN_UID)
{
    try {
        $sqlSOutput = "SELECT DYN_UID,
                              DYN_ID,
                              DYN_TITLE,
                              DYN_DESCRIPTION,
                              DYN_VERSION,
                              DYN_UPDATE_DATE,
                              DYN_CONTENT
                       FROM DYNAFORM
                       WHERE DYN_UID =  '$DYN_UID'
                       ";
        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];

        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * searchTriggers
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param integer $TEXT_CASE_SENSITIVE
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchTriggers($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE = 0)
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $sqlSOutput = "SELECT TRI_UID,
                              TRI_TITLE,
                              TRI_DESCRIPTION
                       FROM TRIGGERS
                       WHERE PRO_UID =  '$PRO_UID'
                       and
                       (
                            TRI_WEBBOT LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            TRI_TITLE LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            TRI_DESCRIPTION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                        ORDER BY TRI_TITLE
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * getTrigger
 *
 * @param [type] $TRI_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getTrigger($TRI_UID)
{
    try {
        $sqlSOutput = "SELECT TRI_UID,
                              TRI_TITLE,
                              TRI_DESCRIPTION,
                              TRI_WEBBOT
                       FROM TRIGGERS
                       WHERE TRI_UID =  '$TRI_UID'

                       ";
        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];

        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * searchOutputDocuments
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param integer $TEXT_CASE_SENSITIVE
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchOutputDocuments($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE = 0)
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $sqlSOutput = "SELECT OUT_DOC_UID,
                              OUT_DOC_ID,
                              OUT_DOC_TITLE,
                              OUT_DOC_DESCRIPTION,
                              OUT_DOC_FILENAME,
                              OUT_DOC_REPORT_GENERATOR,
                              OUT_DOC_MEDIA,
                              OUT_DOC_TYPE,
                              OUT_DOC_DESTINATION_PATH
                       FROM OUTPUT_DOCUMENT
                       WHERE PRO_UID =  '$PRO_UID'
                       and
                       (
                            OUT_DOC_TITLE LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            OUT_DOC_DESCRIPTION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            OUT_DOC_FILENAME LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            OUT_DOC_TEMPLATE LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            OUT_DOC_DESTINATION_PATH LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                       ORDER BY OUT_DOC_TITLE
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * getOutputDocument
 *
 * @param [type] $OUT_DOC_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getOutputDocument($OUT_DOC_UID)
{
    try {
        $sqlSOutput = "SELECT OUT_DOC_UID,
                              OUT_DOC_ID,
                              OUT_DOC_TITLE,
                              OUT_DOC_DESCRIPTION,
                              OUT_DOC_FILENAME,
                              OUT_DOC_REPORT_GENERATOR,
                              OUT_DOC_MEDIA,
                              OUT_DOC_TYPE,
                              OUT_DOC_DESTINATION_PATH,
                              OUT_DOC_TEMPLATE
                       FROM OUTPUT_DOCUMENT
                       WHERE OUT_DOC_UID =  '$OUT_DOC_UID'
                       ORDER BY OUT_DOC_TITLE
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * searchSteps
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param integer $TEXT_CASE_SENSITIVE
 * @param string $TAS_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchSteps($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE = 0, $TAS_UID = '')
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $whereTAS_UID = '';
        if ($TAS_UID != '') {
            $whereTAS_UID = "AND s.TAS_UID='$TAS_UID'";
        }
        $sqlSOutput = "SELECT s.STEP_UID,
                              s.TAS_UID,
                              s.STEP_TYPE_OBJ,
                              s.STEP_UID_OBJ,
                              s.STEP_CONDITION,
                              s.STEP_POSITION,
                              s.STEP_MODE,
                              t.TAS_TITLE,
                              t.TAS_DESCRIPTION
                       FROM STEP s,TASK t
                       WHERE s.PRO_UID =  '$PRO_UID'
                       $whereTAS_UID
                       and
                       (
                            s.STEP_CONDITION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                       and t.TAS_UID=s.TAS_UID
                        ORDER BY STEP_POSITION
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * searchStepsTrigger
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param [type] $TEXT_CASE_SENSITIVE
 * @param string $TAS_UID
 * @param string $TRI_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchStepsTrigger($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE, $TAS_UID = '', $TRI_UID = '')
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $whereTAS_UID = '';
        if ($TAS_UID != '') {
            $whereTAS_UID = "AND s.TAS_UID='$TAS_UID'";
        }
        $whereTRI_UID = '';
        if ($TRI_UID != '') {
            $whereTRI_UID = "AND s.TRI_UID='$TRI_UID'";
        }

        $sqlSOutput = "SELECT s.STEP_UID,
                              s.TAS_UID,
                              s.TRI_UID,
                              s.ST_TYPE,
                              s.ST_CONDITION,
                              s.ST_POSITION,
                              t.TAS_TITLE,
                              t.TAS_DESCRIPTION,
                              tr.TRI_TITLE,
                              st.STEP_TYPE_OBJ,
                              id.INP_DOC_UID,
                              id.INP_DOC_TITLE,
                              id.INP_DOC_DESCRIPTION,
                              od.OUT_DOC_UID,
                              od.OUT_DOC_TITLE,
                              od.OUT_DOC_DESCRIPTION,
                              dy.DYN_TITLE,
                              dy.DYN_DESCRIPTION,
                              dy.DYN_UID
                       FROM STEP_TRIGGER s
                       JOIN TASK t
                       ON  t.TAS_UID=s.TAS_UID
                       JOIN TRIGGERS tr
                       ON s.TRI_UID=tr.TRI_UID
                       LEFT JOIN STEP st
                       ON s.STEP_UID= st.STEP_UID
                       LEFT JOIN INPUT_DOCUMENT id
                       ON st.STEP_UID_OBJ= id.INP_DOC_UID
                       LEFT JOIN OUTPUT_DOCUMENT od
                       ON st.STEP_UID_OBJ= od.OUT_DOC_UID
                       LEFT JOIN DYNAFORM dy
                       ON st.STEP_UID_OBJ= dy.DYN_UID
                       WHERE t.PRO_UID =  '$PRO_UID'
                       $whereTAS_UID
                       $whereTRI_UID
                       and
                       (
                            s.ST_CONDITION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                        ORDER BY ST_POSITION
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * getStepsByTask
 *
 * @param [type] $PRO_UID
 * @param string $TAS_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getStepsByTask($PRO_UID, $TAS_UID = '')
{
    try {
        $sqlSOutput = "SELECT   s.STEP_UID,
                                s.STEP_TYPE_OBJ,
                                s.STEP_UID_OBJ,
                                s.STEP_CONDITION,
                                s.STEP_POSITION,
                                s.STEP_MODE,
                                t.TAS_TITLE,
                                t.TAS_DESCRIPTION,
                                d.DYN_TITLE,
                                od.OUT_DOC_TITLE
                        FROM STEP s
                        JOIN TASK t
                        ON t.TAS_UID=s.TAS_UID
                        LEFT JOIN DYNAFORM d
                        ON d.DYN_UID = s.STEP_UID_OBJ
                        LEFT JOIN OUTPUT_DOCUMENT od
                        ON od.OUT_DOC_UID = s.STEP_UID_OBJ
                        WHERE t.PRO_UID =  '$PRO_UID'
                        AND s.TAS_UID='$TAS_UID'
                        ORDER BY STEP_POSITION
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * getStepDetails
 *
 * @param [type] $PRO_UID
 * @param string $STEP_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getStepDetails($PRO_UID, $STEP_UID = '')
{
    try {
        $sqlSOutput = "SELECT   st.STEP_UID,
                                st.TAS_UID,
                                st.TRI_UID,
                                st.ST_CONDITION,
                                st.ST_TYPE,
                                st.ST_POSITION,
                                tr.TRI_TITLE,
                                tr.TRI_DESCRIPTION,
                                t.TAS_TITLE,
                                t.TAS_DESCRIPTION

                        FROM STEP_TRIGGER st
                        JOIN TASK t
                        ON t.TAS_UID=st.TAS_UID
                        LEFT JOIN TRIGGERS tr
                        ON st.TRI_UID = tr.TRI_UID
                        WHERE t.PRO_UID =  '$PRO_UID'
                        AND st.STEP_UID='$STEP_UID'
                        ORDER BY st.ST_TYPE DESC,st.ST_POSITION
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * searchFlowCondition
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param [type] $TEXT_CASE_SENSITIVE
 * @param string $TAS_UID
 * @param string $TRI_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchFlowCondition($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE, $TAS_UID = '', $TRI_UID = '')
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $whereTAS_UID = '';
        if ($TAS_UID != '') {
            $whereTAS_UID = "AND s.TAS_UID='$TAS_UID'";
        }
        $whereTRI_UID = '';
        if ($TRI_UID != '') {
            $whereTRI_UID = "AND s.TRI_UID='$TRI_UID'";
        }

        $sqlSOutput = "SELECT f.FLO_UID,
                              f.FLO_NAME,
                              f.FLO_TYPE,
                              f.FLO_ELEMENT_ORIGIN,
                              f.FLO_ELEMENT_ORIGIN_TYPE,
                              tor.TAS_TITLE as TAS_TITLE_ORIGIN,
                              tor.TAS_DESCRIPTION as TAS_DESCRIPTION_ORIGIN,
                              tor.TAS_ID as TAS_ID_ORIGIN,
                              gor.GAT_NAME as GAT_NAME_ORIGIN,
                              gor.GAT_TYPE as GAT_TYPE_ORIGIN,
                              eor.EVN_NAME as EVN_NAME_ORIGIN,
                              eor.EVN_TYPE as EVN_TYPE_ORIGIN,

                              f.FLO_ELEMENT_DEST,
                              f.FLO_ELEMENT_DEST_TYPE,
                              tde.TAS_TITLE as TAS_TITLE_DEST,
                              tde.TAS_DESCRIPTION as TAS_DESCRIPTION_DEST,
                              tde.TAS_ID as TAS_ID_DEST,
                              gde.GAT_NAME as GAT_NAME_DEST,
                              gde.GAT_TYPE as GAT_TYPE_DEST,
                              ede.EVN_NAME as EVN_NAME_DEST,
                              ede.EVN_TYPE as EVN_TYPE_DEST,




                              f.FLO_CONDITION,
                              f.FLO_POSITION
                       FROM BPMN_FLOW f
                       LEFT JOIN TASK tor
                       ON f.FLO_ELEMENT_ORIGIN = tor.TAS_UID
                       LEFT JOIN BPMN_GATEWAY gor
                       ON f.FLO_ELEMENT_ORIGIN = gor.GAT_UID
                       LEFT JOIN BPMN_EVENT eor
                       ON f.FLO_ELEMENT_ORIGIN = eor.EVN_UID

                        LEFT JOIN TASK tde
                        ON f.FLO_ELEMENT_DEST = tde.TAS_UID
                        LEFT JOIN BPMN_GATEWAY gde
                        ON f.FLO_ELEMENT_DEST = gde.GAT_UID
                        LEFT JOIN BPMN_EVENT ede
                       ON f.FLO_ELEMENT_DEST = ede.EVN_UID

                       WHERE f.PRJ_UID =  '$PRO_UID'
                       $whereTAS_UID
                       $whereTRI_UID
                       and
                       (
                            f.FLO_CONDITION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                        ORDER BY f.FLO_POSITION
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}

/**
 * searchVariables
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param [type] $TEXT_CASE_SENSITIVE
 * @param string $TAS_UID
 * @param string $TRI_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchVariables($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE, $TAS_UID = '', $TRI_UID = '')
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $whereTAS_UID = '';
        if ($TAS_UID != '') {
            $whereTAS_UID = "AND s.TAS_UID='$TAS_UID'";
        }
        $whereTRI_UID = '';
        if ($TRI_UID != '') {
            $whereTRI_UID = "AND s.TRI_UID='$TRI_UID'";
        }

        $sqlSOutput = "SELECT v.VAR_UID,
                              v.VAR_NAME,
                              v.VAR_FIELD_TYPE,
                              v.VAR_FIELD_SIZE,
                              v.VAR_LABEL,
                              v.VAR_SQL,
                              v.VAR_ACCEPTED_VALUES
                       FROM PROCESS_VARIABLES v
                       WHERE v.PRJ_UID =  '$PRO_UID'
                       $whereTAS_UID
                       $whereTRI_UID
                       and
                       (
                            v.VAR_NAME LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            v.VAR_SQL LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            v.VAR_ACCEPTED_VALUES LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                        ORDER BY v.VAR_NAME
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}
/**
 * searchInputDocuments
 *
 * @param [type] $PRO_UID
 * @param [type] $TEXT_SEARCH
 * @param [type] $TEXT_CASE_SENSITIVE
 * @param string $TAS_UID
 * @param string $TRI_UID
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function searchInputDocuments($PRO_UID, $TEXT_SEARCH, $TEXT_CASE_SENSITIVE, $TAS_UID = '', $TRI_UID = '')
{
    try {
        $TEXT_SEARCH = str_replace("'", "\'", $TEXT_SEARCH);
        $addBinaryTextSensitive = '';
        if ($TEXT_CASE_SENSITIVE == 1) {
            $addBinaryTextSensitive = 'BINARY';
        }
        $whereTAS_UID = '';
        if ($TAS_UID != '') {
            $whereTAS_UID = "AND s.TAS_UID='$TAS_UID'";
        }
        $whereTRI_UID = '';
        if ($TRI_UID != '') {
            $whereTRI_UID = "AND s.TRI_UID='$TRI_UID'";
        }

        $sqlSOutput = "SELECT i.INP_DOC_UID,
                              i.INP_DOC_ID,
                              i.INP_DOC_TITLE,
                              i.INP_DOC_DESCRIPTION,
                              i.INP_DOC_DESTINATION_PATH,
                              i.INP_DOC_TAGS,
                              i.INP_DOC_TYPE_FILE,
                              i.INP_DOC_MAX_FILESIZE_UNIT
                       FROM INPUT_DOCUMENT i
                       WHERE i.PRO_UID =  '$PRO_UID'
                       $whereTAS_UID
                       $whereTRI_UID
                       and
                       (
                            i.INP_DOC_TITLE LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            i.INP_DOC_DESCRIPTION LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            i.INP_DOC_DESTINATION_PATH LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%' OR
                            i.INP_DOC_TAGS LIKE $addBinaryTextSensitive '%$TEXT_SEARCH%'
                       )
                        ORDER BY i.INP_DOC_TITLE,i.INP_DOC_DESCRIPTION
                       ";

        // echo $sqlSOutput;
        // exit();
        $resSOutput = devToolsPropelExecuteQuery($sqlSOutput);

        $response = [
            'status' => 1,
            'data' => $resSOutput
        ];
        //TRI_WEBBOT
        return $response;
    } catch (Exception $e) {
        $response = [
            'status' => 0,
            'data' => $e->getMessage()
        ];
        return $response;
    }
}
