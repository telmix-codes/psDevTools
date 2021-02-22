var configurationSQL = {
    lineNumbers: true,
    theme: 'dracula',
    mode: { name: "text/x-mariadb" },
    indentWithTabs: true,
    smartIndent: true,
    matchBrackets: true,
    // autofocus: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    hintOptions: {
        tables: {
            users: ["name", "score", "birthDate"],
            countries: ["name", "population", "size"]
        }
    }
}

$(document).ready(function () {

    //Get All Tables and Columns
    getNamesTableAndColums();

    //Import File SQL
    $("#inputFileImportSql").change(function (e) {
        readFileSQL(e);
    });
    //Set Code Mirror SQL
    cmEditorSql = CodeMirror.fromTextArea(document.getElementById("code-sql"), configurationSQL);

    $('#nav-sql-console').keydown(function (event) {
        if (event.ctrlKey && event.shiftKey && event.keyCode === 13) {
            RunSQLQuerySelected();
        } else if (event.ctrlKey && event.keyCode === 13) {
            RunSQLQuery();
        }
    });

});

/**
 * RunSQLQuery
 * Search Parameter(s)
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function RunSQLQuery() {
    //Search parameters
    let query = cmEditorSql.getValue();
    checkSendSqlQuery(query);
}

/**
 * CleanSQLQuery
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function CleanSQLQuery() {
    cmEditorSql.setValue('');
}

/**
 * RunSQLQuerySelected
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function RunSQLQuerySelected() {
    let valueSelected = cmEditorSql.getSelection();
    if (valueSelected != "") {
        checkSendSqlQuery(valueSelected);
    }
}
/**
 * RunSQLQuerySelected
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function ExportSQLQuery() {
    let valueSql = cmEditorSql.getValue();
    if (valueSql != "") {
        downloadSQLText(valueSql, 'devTools');
    }
}

/**
 * checkSendSqlQuery
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function checkSendSqlQuery(query) {
    var sendRunSqlConsole = false;
    if (searchWord("select", query, false)) {
        if (!searchWord("limit", query, false)) {
            bootbox.confirm("Are you sure to execute a SELECT without a LIMIT?", function (result) {
                if (result) {
                    sendRunSqlConsole = true;
                    runSqlConsole(query)
                }
            });
        } else {
            runSqlConsole(query)
        }
    } else {

        let commandsSQLRestrict = ['delete', 'update', 'insert', 'drop', 'truncate', 'create', 'alter'];

        var openPrompt = false;
        commandsSQLRestrict.forEach(element => {
            if (searchWord(element, query, false)) {
                openPrompt = true;
                return true;
            }
        });

        if (openPrompt) {
            bootbox.prompt({
                title: 'Enter the password to execute the SQL',
                message: '',
                inputType: 'text',
                callback: function (passwordValue) {
                    if (passwordValue !== null) {
                        if (checkPasswordExecuteSql(passwordValue)) {
                            runSqlConsole(query);
                        } else {
                            bootbox.alert("Password is incorrect");
                        }
                    }
                }
            });
        } else {
            runSqlConsole(query);
        }

    }
}

/**
 * checkPasswordExecuteSql
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function checkPasswordExecuteSql(passwordValue) {

    responseCheckPassword = false;
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'async': false,
        'data': {
            'option': 'checkpassword',
            'passwordValue': passwordValue
        },
        before: function () {
            $(".bootbox-input-text").attr("disabled");
            $("[data-bb-handler=confirm]").attr("disabled");

        },
        complete: function () {
            $(".bootbox-input-text").removeAttr("disabled");
            $("[data-bb-handler=confirm]").removeAttr("disabled");
        },
        success: function (response) {
            if (response.status == "1") {
                responseCheckPassword = true;
            } else {
                responseCheckPassword = false;
            }
        },
        error: function (e) {

        }
    });

    return responseCheckPassword;
}
/**
 * runSqlConsole
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function runSqlConsole(query) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'runSqlConsole',
            'SQL_TEXT': query
        },
        beforeSend: function () {
            // $("#flowsConditionsTitleCard").html('');
            var customElement = $("<div>", {
                "class": "cssload-coffee",
            });
            $("#nav-sql-console").LoadingOverlay("show", {
                // imageColor: "#2378D4",
                image: "",
                custom: customElement,
                background: "rgba(0, 0, 0, 0.776)",
                text: "Running Query...",
                textColor: "#FFF"
            });
        },
        success: function (response) {
            $("#tableSqlResponse").html('');
            if (response.status == '1') {
                buildHtmlTable(response.data, "#tableSqlResponse");
            } else {
                // buildHtmlTable("", "#tableSqlResponse");
                let error = `<div class="p-5" style="background-color: #290000 !important;">
                <span class="red" style="font-family: monospace; font-size: 1.2rem;">${response.data}</span></div>`;
                $("#tableSqlResponse").html(error);
                $("#nav-sql-console").LoadingOverlay("hide");
            }
        },
        error: function (e) {
        },
        complete: function (params) {
            // var interval  = setInterval(function(){
            //     $("#nav-sql-console").LoadingOverlay("hide");
            // }, 5000);
            $("#nav-sql-console").LoadingOverlay("hide");
        }
    });
}


/**
 * highlightMatches
 * @param {string} str
 *
 * by Ronald Nina
 */
const searchWord = (stringSearch, stringOrigin, caseSensitive) => {
    let sensitive = caseSensitive ? "g" : "ig";
    var regEx = new RegExp(stringSearch, sensitive);
    let resultSearchWord = stringOrigin.search(regEx);
    return resultSearchWord == -1 ? false : true;
}






/**
 * downloadSQLText
 * @param {string} exportText
 * @param {string} exportName
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
downloadSQLText = (exportText, exportName) => {
    var dataStr = "data:text/sql;charset=utf-8," + encodeURIComponent(exportText);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".sql");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

/**
 * readFileSQL
 * @param e
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function readFileSQL(e) {
    var fileSQL = e.target.files[0];
    if (!fileSQL) {
        return;
    }
    var readerSQL = new FileReader();
    readerSQL.onload = function (e) {
        var contentFile = e.target.result;
        showTextSqlFile(contentFile);
    };
    readerSQL.readAsText(fileSQL);
}

/**
 * showTextSqlFile
 * @param {string} contentFile
 *
 * by Ronald Nina - ronald.nina@processmaker.com
 */
function showTextSqlFile(contentFile) {
    cmEditorSql.setValue(contentFile);
}

/**
 * getNamesTableAndColums
 * Get All Tables and Columns
 *
 * @return none
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function getNamesTableAndColums() {
    $.ajax({
        'method': 'POST',
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'data': {
            'option': 'getNamesTableAndColums'
        },
        beforeSend: function () {
            $.LoadingOverlay("text", "Loading...");
        },
        success: function (response) {
            if (response.status == '1') {
                configurationSQL.hintOptions.tables = response.data;
                for (table in response.data) {
                    let row = `<tr class="list-group-item-action"><td>
                    <span class="small" style="cursor:pointer;">
                        <span class="btn btn-light" onclick="moveToEditor('${table}')" data-toggle="tooltip" title="Add to Editor" data-placement="left"><i class="fa fa-toggle-left"></i></span>
                        <span class="btn btn-light" onclick="copyToClipboard('${table}')" data-toggle="tooltip" title="Copy to Clipboard" data-placement="right"><i class="fa fa-clipboard"></i></span>
                        <span ondblclick="moveToEditor('${table}')">${table}</span>
                    </span>
                    </td></tr>`;
                    $("#table-list").append(row);
                }
            }
        }
    });
}