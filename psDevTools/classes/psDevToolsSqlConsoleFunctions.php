<?php
G::loadClass('pmFunctions');

/**
 * runSqlConsole
 *
 * @param [type] $SQL_TEXT
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function runSqlConsole($SQL_TEXT)
{
    try {
        // $SQL_TEXT = str_replace("'", "\'", $SQL_TEXT);
        $SQL_TEXT = $SQL_TEXT;
        // $searchDELETE = stripos($SQL_TEXT, 'delete ');
        // if ($searchDELETE !== false) {
        //     throw new Exception('You cannot use the DELETE command');
        // }

        // $searchUPDATE = stripos($SQL_TEXT, 'update ');
        // if ($searchUPDATE !== false) {
        //     throw new Exception('You cannot use the UPDATE command');
        // }

        // $searchINSERT = stripos($SQL_TEXT, 'insert ');
        // if ($searchINSERT !== false) {
        //     throw new Exception('You cannot use the INSERT command');
        // }

        // $searchDROP = stripos($SQL_TEXT, 'drop ');
        // if ($searchDROP !== false) {
        //     throw new Exception('You cannot use the DROP command');
        // }

        // $searchTRUNCATE = stripos($SQL_TEXT, 'truncate ');
        // if ($searchTRUNCATE !== false) {
        //     throw new Exception('You cannot use the TRUNCATE command');
        // }

        // $searchCREATE = stripos($SQL_TEXT, 'create ');
        // if ($searchCREATE !== false) {
        //     throw new Exception('You cannot use the CREATE command');
        // }

        // $searchALTER = stripos($SQL_TEXT, 'alter ');
        // if ($searchALTER !== false) {
        //     throw new Exception('You cannot use the ALTER command');
        // }

        $multipleSQLTEXT = explode(';', $SQL_TEXT);
        $firstSQL_TEXT = array_shift($multipleSQLTEXT);
        $resSOutput = devToolsPropelExecuteQuery($firstSQL_TEXT);
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
 * getNamesTableAndColums
 *
 * @return void
 *
 * Ronald Nina - ronald.nina@processmaker.com
 */
function getNamesTableAndColums()
{
    try {
        $SQL = ' SHOW TABLES';

        $resSOutput = devToolsPropelExecuteQuery($SQL);

        $dataResponse = [];
        foreach ($resSOutput as $table) {
            $tableName = $table['Tables_in_wf_' . SYS_SYS];

            $sqlColumnsTable = "SELECT
                            COLUMN_NAME AS columna FROM
                            information_schema.columns WHERE
                            table_schema = '$bdName'
                            AND
                            table_name = '$tableName'
                             ";
            $resColumsName = devToolsPropelExecuteQuery($sqlColumnsTable);

            $namesColumns = [];
            foreach ($resColumsName as $resColumName) {
                $namesColumns[] = $resColumName['columna'];
            }
            $implodeNameColumns = implode(',', $namesColumns);
            // $dataResponse[] = ['nameTable' => "$tableName",'columns' => $namesColumns]; //$tableName;
            $dataResponse[$tableName] = $namesColumns; //$tableName;
        }
        $response = [
            'status' => 1,
            'data' => $dataResponse
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
