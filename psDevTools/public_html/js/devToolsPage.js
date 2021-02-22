var cmEditor = null;
var search;
var caseSensitive;
var configuration = {
    lineNumbers: true,
    // showToken: /\w/,
    lineWrapping: true,
    theme: 'dracula',
    readOnly: true,
    highlightSelectionMatches: { annotateScrollbar: true, searchInitalWord: 0, wordSearch: "" },
    mode: { name: "javascript", json: true }
}

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});

$(document).ready(function () {
    //Set Code Mirror
    cmEditor = CodeMirror.fromTextArea(document.getElementById("result-code-detail"), configuration);
    //Get Process Lists
    getProcesses();

    //Select/Deselect All Filter Options
    $('#filter-all').change(function () {
        $("#filter-dynaforms").prop("checked", $(this).prop('checked'));
        $("#filter-document").prop("checked", $(this).prop('checked'));
        $("#filter-step-trigger").prop("checked", $(this).prop('checked'));
        $("#filter-trigger").prop("checked", $(this).prop('checked'));
        $("#filter-step").prop("checked", $(this).prop('checked'));
        $("#filter-flow").prop("checked", $(this).prop('checked'));
        $("#filter-variable").prop("checked", $(this).prop('checked'));
        $("#filter-input-document").prop("checked", $(this).prop('checked'));
    });
    //Hide All Results
    $("#results").hide();
    $('#dynaformCard').hide();
    $('#triggerCard').hide();
    $('#outputDocumentCard').hide();
    $('#stepCard').hide();
    $('#stepTriggerCard').hide();
    $('#flowsConditionsCard').hide();
    $('#variablesCard').hide();
    $('#inputDocumentCard').hide();

    $('#modalViewDetail').on('hide.bs.modal', function (event) {
        $("#modalBodyViewDetail").html('');
        $("#modalBodyViewDetail").append('<textarea id="view-detail" class="form-control" style="min-width: 100%;"></textarea>');
    });
    //Enable ToolTip
    $('[data-toggle="tooltip"]').tooltip();



    // Back to Top
    $("#back2Top").click(function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });


    $('#nav-finder').keydown(function (event) {
        if (event.ctrlKey && event.keyCode === 13) {
            SearchParameter();
        }
        if (event.ctrlKey && event.keyCode === 65) {
            let val = $("#filter-all").prop('checked');
            $('#filter-all').prop('checked', !val).change();
        }

    });

    $("body").keydown(function (event) {
        if (event.keyCode === 27) {
            document.getElementById("closeModalDevTools").click();
            document.getElementById("closeModalTaskDevTools").click();
        }
    })

    // $('#mainSplitter').jqxSplitter({ width: '99%', height: '99%', orientation: 'horizontal', panels: [{ size: 350 }, { size: 300 }] });
});
// $(document).ready(function () {
// let dataJson = `{"name":"T1 - P1 - Revision del Solicitante","description":"Revisidel Solicitante","items":[{"type":"form","variable":"","var_uid":"","dataType":"","id":"4679478035f5ba3080be901090054687"}],"name1":"T1 - P1 - Revisidel Solicitante","description1":"Revisdel Solicitante","items1":[{"type":"form","variable":"","var_uid":"","dataType1":"","id":"4679478035f5ba3080be901090054687"}]}`;
// // let codejson = document.getElementById("codejson");
// codejson = JSON.stringify(JSON.parse(dataJson), null, 2);
// $("#view-detail").html(codejson);
// $("#result-code-detail").html(codejson);


// cmEditor = CodeMirror.fromTextArea(document.getElementById("view-detail"), configuration);
// });
/**
 * addClipboardTitle
 * Allows add new message in the tooltip button (btnCopyJSCode)
 *
 * @param none
 * @return none
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function addTooltipOutput() {
    $('#tooltipOutput').prop('title', "Records marked with * have previous configuration.");
    $('#tooltipOutput').tooltip('show');
    $('#tooltipOutput').prop('title', "");
}

/**
 * logout
 *
 * by Ronald Nina ronald.nina@processmaker.com
 */
function logout() {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'logout',
        },
        beforeSend: function () {
            $("#divLogout").html(`<i class="fa fa-2x fa-spinner fa-pulse white  mt-3 mr-2" ></i>`);
        },
        success: function (response) {
            // window.location = "../psDevTools/index";
            setTimeout(() => {
                location.reload();
            }, 600);
        },
        error: function (e) {

        }
    });
}

/**
 * getDynaform
 * Get Content of Dynaform
 *
 * @return none
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function getDynaform(dyn_uid) {
    $.ajax({
        'method': 'POST',
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'data': {
            'option': 'getDynaform',
            'DYN_UID': dyn_uid
        },
        success: function (response) {
            $("#titleModal").html(response.data[0].DYN_TITLE);
            $("#descriptionModal").html(response.data[0].DYN_DESCRIPTION);
            if (response.status == '1') {
                var detail = JSON.parse(response.data[0].DYN_CONTENT);
                detail = JSON.stringify(detail, null, parseInt(response.data[0].DYN_CONTENT.length));
                cmEditor.setOption('highlightSelectionMatches', { annotateScrollbar: true, searchInitalWord: 1, wordSearch: search })
                cmEditor.setOption('annotateScrollbar', true);
                cmEditor.setOption('mode', { name: "javascript", json: true });
                cmEditor.setSize('100%', '85%');
                cmEditor.setValue(detail);
            }
        }
    });
}

/**
 * getTrigger
 * Get Content of Dynaform
 *
 * @return none
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function getTrigger(tri_uid) {
    $.ajax({
        'method': 'POST',
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'data': {
            'option': 'getTrigger',
            'TRI_UID': tri_uid
        },
        success: function (response) {
            if (response.status == '1') {
                $("#titleModal").html(response.data[0].TRI_TITLE);
                $("#descriptionModal").html(response.data[0].TRI_DESCRIPTION);
                var detail = response.data[0].TRI_WEBBOT;
                cmEditor.setOption('highlightSelectionMatches', { annotateScrollbar: true, searchInitalWord: 1, wordSearch: search });
                cmEditor.setOption('annotateScrollbar', true);
                cmEditor.setOption('mode', 'text/x-php');
                cmEditor.setSize('100%', '85%');
                cmEditor.setValue(detail);
            }
        }
    });
}

/**
 * getOutputDocument
 * Get Content of Dynaform
 *
 * @return none
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function getOutputDocument(out_doc_uid) {
    $.ajax({
        'method': 'POST',
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'data': {
            'option': 'getOutputDocument',
            'OUT_DOC_UID': out_doc_uid
        },
        success: function (response) {
            if (response.status == '1') {
                $("#titleModal").append(response.data[0].OUT_DOC_TITLE);
                var detail = response.data[0].OUT_DOC_TEMPLATE;
                cmEditor.setOption('highlightSelectionMatches', { annotateScrollbar: true, searchInitalWord: 1, wordSearch: search })
                cmEditor.setOption('annotateScrollbar', true);
                cmEditor.setOption('mode', 'text/x-php');
                cmEditor.setSize('100%', '85%');
                cmEditor.setValue(detail);
            }
        }
    });
}

/**
 * getStepsByTask
 * @param {string} process
 * @param {string} task
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function getStepsByTask(process, task) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'getStepsByTask',
            'PRO_UID': process,
            'TAS_UID': task
        },
        success: function (response) {
            if (response.status == '1') {
                $("#taskDetail").html('');
                $("#titleModalTask").html('');
                if (response.data.length > 0) {
                    $("#titleModalTask").append(response.data[0].TAS_TITLE);
                    var result = `<table class="table table-hover table-dark">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Step</th>
                                            <th scope="col">Type</th>
                                            <th scope="col" width="30%">Condition</th>
                                            <th scope="col" width="40%">Title</th>
                                            <th scope="col" width="120px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>`;
                    for (index in response.data) {
                        let title = '';
                        let callFunction = 'console.log';
                        switch (response.data[index].STEP_TYPE_OBJ) {
                            case 'DYNAFORM':
                                title = response.data[index].DYN_TITLE;
                                callFunction = 'getDynaform';
                                break;
                            case 'OUTPUT_DOCUMENT':
                                title = response.data[index].OUT_DOC_TITLE;
                                callFunction = 'getOutputDocument';
                                break;
                            default:
                                break;
                        }
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <span class="grey">${response.data[index].STEP_POSITION}</span>
                            </td>
                            <td>
                                <small class="green">${response.data[index].STEP_TYPE_OBJ}</small>
                            </td>
                            <td>
                                <small class="orange">${response.data[index].STEP_CONDITION}</small>
                            </td>
                            <td>
                                <small class="purple">${title}</small>
                            </td>
                            <td>
                                <a href="#viewModalDevTools" class="link-text" onclick="${callFunction}('${response.data[index].STEP_UID_OBJ}')"><small class="blue">[View Detail]</small></a>
                                <a href="#viewModalTaskDevTools" class="link-text" onclick="getStepDetails('${process}', '${response.data[index].STEP_UID}')"><small class="fuschia">[Step Detail]</small></a>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#taskDetail").append(result);
                }
            }
        }
    });
}

/**
 * getStepDetails
 * @param {string} process
 * @param {string} task
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function getStepDetails(process, step) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'getStepDetails',
            'PRO_UID': process,
            'STEP_UID': step
        },
        success: function (response) {
            if (response.status == '1') {
                $("#taskDetail").html('');
                $("#titleModalTask").html('');
                if (response.data.length > 0) {
                    $("#titleModalTask").append(response.data[0].TAS_TITLE);
                    var result = `<table class="table table-hover table-dark">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Condition</th>
                                            <th scope="col">Trigger Title</th>
                                            <th scope="col" width="120px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td scope="row">${parseInt(index) + 1}</td>
                            <td>
                                <span class="green">${response.data[index].ST_TYPE}</span>
                            </td>
                            <td>
                                <small class="grey">${response.data[index].ST_POSITION}</small>
                            </td>
                            <td>
                                <small class="yellow">${response.data[index].ST_CONDITION}</small>
                            </td>
                            <td>
                                <small class="orange" title="${response.data[index].TRI_DESCRIPTION}">${response.data[index].TRI_TITLE}</small>
                            </td>
                            <td>
                                <a href="#viewModalDevTools" class="link-text" onclick="getTrigger('${response.data[index].TRI_UID}')"><small class="blue">[View Detail]</small></a>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#taskDetail").append(result);
                }
            }
        }
    });
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * getProcesses
 * Get All Processes
 *
 * @return none
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function getProcesses() {
    $.ajax({
        'method': 'POST',
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'data': {
            'option': 'getProcesses'
        },
        beforeSend: function () {
            // $.LoadingOverlay("text", "Get Processes...");
        },
        success: function (response) {
            if (response.status == '1') {
                var select = document.getElementById("process");
                for (index in response.data) {
                    select.options[select.options.length] = new Option(response.data[index].PRO_TITLE, response.data[index].PRO_UID);
                }
            }
        }
    });
}


/**
 * moveToEditor
 * @param {string} str
 *
 * by Ronal Nina
 */
const moveToEditor = str => {
    // cmEditorSql.replaceRange(str, CodeMirror.Pos(cmEditorSql.lastLine()));
    var doc = cmEditorSql.getDoc();
    var cursor = doc.getCursor();
    doc.replaceRange(str, cursor);
};
/**
 * copyToClipboard
 * @param {string} str
 *
 * by Telmo Chiri
 */
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
/**
 * scrollToAnchor
 * @param {string} aid
 *
 * by Telmo Chiri
 */
function scrollToAnchor(aid, idScroll) {
    var aTag = $("div[id='" + aid + "']");
    if ($("#" + idScroll).hasClass('show')) {
        $('#bodyDevTools').animate({ scrollTop: aTag.offset().top - 31 }, 'slow');
    } else {
        $('#' + idScroll).collapse('show');
        $('#' + idScroll).on('shown.bs.collapse', function () {
            $('#bodyDevTools').animate({ scrollTop: aTag.offset().top - 31 }, 'slow');
        })
    }
}
/**
 * highlightMatches
 * @param {string} str
 *
 * by Telmo Chiri
 */
const highlightMatches = str => {
    let sensitive = caseSensitive ? "g" : "ig";
    var regEx = new RegExp(search, sensitive);
    var replaceMask = '<span style="background-color: white; color: black">' + search + '</span>';
    let newStr = str.replace(regEx, (match) => {
        return '<span style="background-color: white; color: black">' + match + '</span>';
    });
    return newStr;
}
/**
 * SearchParameter
 * Search Parameter(s)
 *
 * by Telmo Chiri - telmo.chiri@processmaker.com
 */
function SearchParameter() {
    //Search parameters
    let process = $("#process").val();
    search = $("#search").val();
    // $("#resume-result").html('');
    $("#btn-dynaformCard").hide();
    $("#btn-triggerCard").hide();
    $("#btn-outputDocumentCard").hide();
    $("#btn-stepCard").hide();
    $("#btn-stepTriggerCard").hide();
    $("#btn-flowsConditionsCard").hide();
    $("#btn-variablesCard").hide();
    $("#btn-inputDocumentCard").hide();
    if (process != '') {
        // $("#process").addClass('is-valid');
        $("#process").removeClass('is-invalid');
    } else {
        $("#process").addClass('is-invalid');
        // $("#process").removeClass('is-valid');
    }
    if (search != '') {
        // $("#search").addClass('is-valid');
        $("#search").removeClass('is-invalid');
    } else {
        $("#search").addClass('is-invalid');
        // $("#search").removeClass('is-valid');
    }
    caseSensitive = $("#case-sensitive").prop("checked") ? 1 : 0;
    let showResult = false;
    if (process != '' && search != '') {
        //Search in Dynaforms
        if ($("#filter-dynaforms").prop("checked")) {
            $('#dynaformResult').html('');
            $('#dynaformCard').show();
            showResult = true;
            //Call Method Search Dynaforms
            searchDynaforms(process, search, caseSensitive);
        } else {
            $('#dynaformCard').hide();
            $('#dynaformResult').html('');
        }
        // Output Documents
        if ($("#filter-document").prop("checked")) {
            $('#outputDocumentResult').html('');
            $('#outputDocumentCard').show();
            showResult = true;
            //Call Method Search Output Documents
            searchOutputDocuments(process, search, caseSensitive);
        } else {
            $('#outputDocumentCard').hide();
            $('#outputDocumentResult').html('');
        }
        if ($("#filter-step-trigger").prop("checked")) {
            $('#stepTriggerResult').html('');
            $('#stepTriggerCard').show();
            showResult = true;
            //Call Method Search Steps
            searchTriggersConditions(process, search, caseSensitive);
        } else {
            $('#stepTriggerCard').hide();
            $('#stepTriggerResult').html('');
        }
        // Triggers
        if ($("#filter-trigger").prop("checked")) {
            $('#triggerResult').html('');
            $('#triggerCard').show();
            showResult = true;
            //Call Method Search Triggers
            searchTriggers(process, search, caseSensitive);
        } else {
            $('#triggerCard').hide();
            $('#triggerResult').html('');
        }
        // Steps
        if ($("#filter-step").prop("checked")) {
            $('#stepResult').html('');
            $('#stepCard').show();
            showResult = true;
            //Call Method Search Steps
            searchStepsConditions(process, search, caseSensitive);
        } else {
            $('#stepCard').hide();
            $('#stepResult').html('');
        }
        if ($("#filter-flow").prop("checked")) {
            $('#flowsConditionsResult').html('');
            $('#flowsConditionsCard').show();
            showResult = true;
            //Call Method Flows Conditions
            searchFlowCondition(process, search, caseSensitive);
        } else {
            $('#flowsConditionsCard').hide();
            $('#flowsConditionsResult').html('');
        }
        if ($("#filter-variable").prop("checked")) {
            $('#variablesResult').html('');
            $('#variablesCard').show();
            showResult = true;
            //Call Method Variables
            searchVariables(process, search, caseSensitive);
        } else {
            $('#variablesCard').hide();
            $('#variablesResult').html('');
        }
        // Input Documents
        if ($("#filter-input-document").prop("checked")) {
            $('#inputDocumentResult').html('');
            $('#inputDocumentCard').show();
            showResult = true;
            //Call Method Search Input Documents
            searchInputDocuments(process, search, caseSensitive);
        } else {
            $('#inputDocumentCard').hide();
            $('#inputDocumentResult').html('');
        }
    }
    if (showResult) {
        $("#results").show();
    } else {
        $("#results").hide();
    }
}
/**
 * searchDynaforms
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchDynaforms(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchDynaforms',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#dynaformTitleCard").html('');
            $("#dynaformResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-dynaformCard").show();
            $("#btn-dynaformCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-dynaformCard").html('Dynaforms <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#dynaformTitleCard").append('Dynaforms <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_dynaform">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Last Update</th>
                                            <th scope="col" width="120px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <span class="green" style="font-size: 90%;">${highlightMatches(response.data[index].DYN_TITLE)}</span>
                            </td>
                            <td>
                                <small class="orange">${highlightMatches(response.data[index].DYN_DESCRIPTION)}</small>
                            </td>
                            <td>
                                <small class="grey">${highlightMatches(response.data[index].DYN_UPDATE_DATE)}</small>
                            </td>
                            <td>
                                <a href="#viewModalDevTools" class="link-text" onclick="getDynaform('${response.data[index].DYN_UID}')"><small class="blue">[View Detail]</small></a>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                }
                $("#dynaformResult").append(result);
                $('#table_dynaform').DataTable();
            }
            $("#dynaformResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#dynaformResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchTriggers
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchTriggers(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchTriggers',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#triggerTitleCard").html('');
            $("#triggerResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-triggerCard").show();
            $("#btn-triggerCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-triggerCard").html('Triggers <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#triggerTitleCard").append('Triggers <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_trigger">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col" width="120px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <span class="green" style="font-size: 90%;">${highlightMatches(response.data[index].TRI_TITLE)}</span>
                            </td>
                            <td>
                                <small class="orange">${highlightMatches(response.data[index].TRI_DESCRIPTION)}</small>
                            </td>
                            <td>
                                <a href="#viewModalDevTools" class="link-text" onclick="getTrigger('${response.data[index].TRI_UID}')"><small class="blue">[View Detail]</small></a>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#triggerResult").append(result);
                    $('#table_trigger').DataTable();
                }
            }
            $("#triggerResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#triggerResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchOutputDocuments
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchOutputDocuments(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchOutputDocuments',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#outputDocumentTitleCard").html('');
            $("#outputDocumentResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-outputDocumentCard").show();
            $("#btn-outputDocumentCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-outputDocumentCard").html('Output Documents <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#outputDocumentTitleCard").append('Output Documents <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_output_document">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Destination Path</th>
                                        <th scope="col">File Name</th>
                                        <th scope="col" width="120px">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <span class="green" style="font-size: 90%;">${highlightMatches(response.data[index].OUT_DOC_TITLE)}</span>
                            </td>
                            <td>
                                <small class="orange">${highlightMatches(response.data[index].OUT_DOC_DESCRIPTION)}</small>
                            </td>
                            <td>
                                <small class="fuschia">${highlightMatches(response.data[index].OUT_DOC_DESTINATION_PATH)}</small>
                            </td>
                            <td>
                                <small class="grey">${highlightMatches(response.data[index].OUT_DOC_FILENAME)}</small>
                            </td>
                            <td>
                                <a href="#viewModalDevTools" class="link-text" onclick="getOutputDocument('${response.data[index].OUT_DOC_UID}')"><small class="blue">[View Detail]</small></a>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#outputDocumentResult").append(result);
                    $('#table_output_document').DataTable();
                }
            }
            $("#outputDocumentResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#outputDocumentResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchStepsConditions
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchStepsConditions(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchSteps',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#stepTitleCard").html('');
            $("#stepResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-stepCard").show();
            $("#btn-stepCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-stepCard").html('Steps Conditions <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#stepTitleCard").append('Steps Conditions <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_step_condition">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Condition</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Mode</th>
                                        <th scope="col" width="35%">Task Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <span class="green" style="font-size: 90%;">${response.data[index].STEP_TYPE_OBJ}</span>
                            </td>
                            <td>
                                <small class="orange">${highlightMatches(response.data[index].STEP_CONDITION)}</small>
                            </td>
                            <td>
                                <small class="grey">${response.data[index].STEP_POSITION}</small>
                            </td>
                            <td>
                                <small class="purple">${response.data[index].STEP_MODE}</small>
                            </td>
                            <td>
                                <a href="#viewModalTaskDevTools" class="link-text" onclick="getStepsByTask('${process}', '${response.data[index].TAS_UID}')">
                                    <small class="yellow" title="${response.data[index].TAS_DESCRIPTION}">[${response.data[index].TAS_TITLE}]</small>
                                </a>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#stepResult").append(result);
                    $('#table_step_condition').DataTable();
                }
            }
            $("#stepResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#stepResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchTriggersConditions //Triggers Conditions
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchTriggersConditions(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchStepsTrigger',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#stepTriggerTitleCard").html('');
            $("#stepTriggerResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-stepTriggerCard").show();
            $("#btn-stepTriggerCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-stepTriggerCard").html('Triggers Conditions <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#stepTriggerTitleCard").append('Triggers Conditions <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_trigger_condition">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Condition</th>
                                        <th scope="col">Type</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Task</th>
                                        <th scope="col">Step</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    for (index in response.data) {
                        let dataStep = '';
                        switch (response.data[index].STEP_TYPE_OBJ) {
                            case 'DYNAFORM':
                                dataStep = `<a href="#viewModalDevTools" class="link-text" onclick="getDynaform('${response.data[index].DYN_UID}')"><small class="blue" title="${response.data[index].DYN_DESCRIPTION}">[<span class="badge badge-warning">Dynaform</span> ${response.data[index].DYN_TITLE}]</small></a>`;
                                break;
                            case 'INPUT_DOCUMENT':
                                dataStep = `<small class="fuschia" title="${response.data[index].INP_DOC_DESCRIPTION}"><span class="badge badge-secondary">Input Document</span> ${response.data[index].INP_DOC_TITLE}</small>`;
                                break;
                            case 'OUTPUT_DOCUMENT':
                                dataStep = `<a href="#viewModalDevTools" class="link-text" onclick="getOutputDocument('${response.data[index].OUT_DOC_UID}')"><small class="blue" title="${response.data[index].OUT_DOC_DESCRIPTION}">[<span class="badge badge-danger">Output Document</span> ${response.data[index].OUT_DOC_TITLE}]</small></a>`;
                                break;
                            case null:
                                switch (response.data[index].STEP_UID) {
                                    case '-1':
                                        dataStep = `<small class="fuschia"><span class="badge badge-success">Assignment</span></small>`;
                                        break;
                                    case '-2':
                                        dataStep = `<small class="fuschia"><span class="badge badge-danger">Routing</span></small>`;
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            default:
                                dataStep = `<small class="fuschia"><span class="badge badge-info">${response.data[index].STEP_TYPE_OBJ}</span></small>`;
                                break;
                        }
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <small class="orange">${highlightMatches(response.data[index].ST_CONDITION)}</small>
                            </td>
                            <td>
                                <small class="green">${response.data[index].ST_TYPE}</small>
                            </td>
                            <td>
                                <span class="grey">${response.data[index].ST_POSITION}</span>
                            </td>
                            <td>
                                <a href="#viewModalTaskDevTools" class="link-text" onclick="getStepsByTask('${process}', '${response.data[index].TAS_UID}')">
                                    <small class="yellow" title="${response.data[index].TAS_DESCRIPTION}">[${response.data[index].TAS_TITLE}]</small>
                                </a>
                            </td>
                            <td>
                                ${dataStep}
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#stepTriggerResult").append(result);
                    $('#table_trigger_condition').DataTable();
                }
            }
            $("#stepTriggerResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#stepTriggerResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchFlowCondition
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchFlowCondition(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchFlowCondition',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#flowsConditionsTitleCard").html('');
            $("#flowsConditionsResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-flowsConditionsCard").show();
            $("#btn-flowsConditionsCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-flowsConditionsCard").html('Flows Conditions <span class="badge badge-dark">' + response.data.length + '</a>');
                $("#flowsConditionsTitleCard").append('Flows Conditions <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_flow_condition">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Flow Data</th>
                                        <th scope="col">Condition</th>
                                        <th scope="col" width="25%">Origin</th>
                                        <th scope="col" width="25%">Destiny</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    for (index in response.data) {
                        let flowData = `<div>Name: ${response.data[index].FLO_NAME}</div>
                        <div>Type: ${response.data[index].FLO_TYPE}</div>
                        <div>Position: ${response.data[index].FLO_POSITION}</div>`;
                        let origin = '';
                        switch (response.data[index].FLO_ELEMENT_ORIGIN_TYPE) {
                            case 'bpmnActivity':
                                origin = `<a href="#viewModalTaskDevTools" class="link-text" onclick="getStepsByTask('${process}', '${response.data[index].FLO_ELEMENT_ORIGIN}')">
                                    <small class="yellow" title="${response.data[index].TAS_DESCRIPTION_ORIGIN}">[ <span class="badge badge-warning">Task</span> ${response.data[index].TAS_TITLE_ORIGIN}]</small>
                                </a>`;
                                break;
                            case 'bpmnGateway':
                                origin = `<small class="yellow" title="${response.data[index].GAT_TYPE_ORIGIN}"><span class="badge badge-secondary">Gateway</span> ${response.data[index].GAT_NAME_ORIGIN}</small>`;
                                break;
                            case 'bpmnEvent':
                                origin = `<small class="yellow" title="${response.data[index].EVN_NAME_ORIGIN}"><span class="badge badge-danger">Event</span> ${response.data[index].EVN_TYPE_ORIGIN}</small>`;
                                break;
                            default:
                                origin = `<small class="yellow"><span class="badge badge-warning">${response.data[index].FLO_ELEMENT_ORIGIN_TYPE}</span></small>`;
                                break;
                        }
                        let destiny = '';
                        switch (response.data[index].FLO_ELEMENT_DEST_TYPE) {
                            case 'bpmnActivity':
                                destiny = `<a href="#viewModalTaskDevTools" class="link-text" onclick="getStepsByTask('${process}', '${response.data[index].FLO_ELEMENT_DEST}')">
                                    <small class="yellow" title="${response.data[index].TAS_DESCRIPTION_DEST}">[ <span class="badge badge-warning">Task</span> ${response.data[index].TAS_TITLE_DEST}]</small>
                                </a>`;
                                break;
                            case 'bpmnGateway':
                                destiny = `<small class="yellow" title="${response.data[index].GAT_TYPE_DEST}"><span class="badge badge-secondary">Gateway</span> ${response.data[index].GAT_NAME_DEST}</small>`;
                                break;
                            case 'bpmnEvent':
                                destiny = `<small class="yellow" title="${response.data[index].EVN_NAME_DEST}"><span class="badge badge-danger">Event</span> ${response.data[index].EVN_TYPE_DEST}</small>`;
                                break;
                            default:
                                destiny = `<small class="yellow"><span class="badge badge-warning">${response.data[index].FLO_ELEMENT_DEST_TYPE}</span></small>`;
                                break;
                        }
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <small class="grey">${flowData}</small>
                            </td>
                            <td>
                                <small class="green">${highlightMatches(response.data[index].FLO_CONDITION)}</small>
                            </td>
                            <td>
                                ${origin}
                            </td>
                            <td>
                                ${destiny}
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#flowsConditionsResult").append(result);
                    $('#table_flow_condition').DataTable();
                }
            }
            $("#flowsConditionsResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#flowsConditionsResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchVariables
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchVariables(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchVariables',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#variablesTitleCard").html('');
            $("#variablesResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-variablesCard").show();
            $("#btn-variablesCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-variablesCard").html('Variables <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#variablesTitleCard").append('Variables <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_variable">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Type</th>
                                        <th scope="col" width="30%">Sql</th>
                                        <th scope="col" width="30%">Accepted Values</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <span class="green" style="font-size: 90%;">${highlightMatches(response.data[index].VAR_NAME)}</span>
                            </td>
                            <td>
                                <small class="orange">${response.data[index].VAR_FIELD_TYPE}</small>
                            </td>
                            <td>
                                <small class="grey">${highlightMatches(response.data[index].VAR_SQL)}</small>
                            </td>
                            <td>
                                <small class="purple">${highlightMatches(response.data[index].VAR_ACCEPTED_VALUES)}</small>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#variablesResult").append(result);
                    $('#table_variable').DataTable();
                }
            }
            $("#variablesResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#variablesResult").LoadingOverlay("hide");
        }
    });
}
/**
 * searchInputDocuments
 * @param {string} process
 * @param {string} search
 * @param {int} caseSensitive
 *
 * by Telmo Chiri telmo.chiri@processmaker.com
 */
function searchInputDocuments(process, search, caseSensitive) {
    $.ajax({
        'url': '../psDevTools/controllers/devToolsAjax.php',
        'type': 'POST',
        'data': {
            'option': 'searchInputDocuments',
            'PRO_UID': process,
            'TEXT_SEARCH': search,
            'TEXT_CASE_SENSITIVE': caseSensitive
        },
        beforeSend: function () {
            $("#inputDocumentTitleCard").html('');
            $("#inputDocumentResult").LoadingOverlay("show", {
                imageColor: "#2378D4",
                text: "Searching..."
            });
            $("#btn-inputDocumentCard").show();
            $("#btn-inputDocumentCard").html('');
        },
        success: function (response) {
            if (response.status == '1') {
                $("#btn-inputDocumentCard").html('Input Documents <span class="badge badge-dark">' + response.data.length + '</span>');
                $("#inputDocumentTitleCard").append('Input Documents <span class="badge badge-secondary">' + response.data.length + '</span>');
                if (response.data.length > 0) {
                    var result = `<table class="row-border hover" id="table_input_document">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Destination Path</th>
                                        <th scope="col">Tags</th>
                                        <th scope="col">Type File</th>
                                        <th scope="col">Max File Size</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    for (index in response.data) {
                        result += `
                        <tr>
                            <td class="white">${parseInt(index) + 1}</td>
                            <td>
                                <small class="green">${highlightMatches(response.data[index].INP_DOC_TITLE)}</small>
                            </td>
                            <td>
                                <small class="orange">${highlightMatches(response.data[index].INP_DOC_DESCRIPTION)}</small>
                            </td>
                            <td>
                                <small class="fuschia">${highlightMatches(response.data[index].INP_DOC_DESTINATION_PATH)}</small>
                            </td>
                            <td>
                                <small class="grey">${highlightMatches(response.data[index].INP_DOC_TAGS)}</small>
                            </td>
                            <td>
                                <small class="purple">${response.data[index].INP_DOC_TYPE_FILE}</small>
                            </td>
                            <td>
                                <small class="red">${response.data[index].INP_DOC_MAX_FILESIZE_UNIT}</small>
                            </td>
                        </tr>`;
                    }
                    result += `</tbody>
                    </table>`;
                    $("#inputDocumentResult").append(result);
                    $('#table_input_document').DataTable();
                }
            }
            $("#inputDocumentResult").LoadingOverlay("hide");
        },
        error: function (e) {
            $("#inputDocumentResult").LoadingOverlay("hide");
        }
    });
}

