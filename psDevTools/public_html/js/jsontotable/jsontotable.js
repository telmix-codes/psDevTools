// buildHtmlTable(data, '#tableSqlResponse');
// Builds the HTML Table out of myList.
var dataTableJsonCopy = "";
function buildHtmlTable(dataTable, selector) {
    $(selector).html('');
    table$ = $('<table class="cell-border hover tableSqlResponse"/>');

    if (whatIsIt(dataTable) == "Array") {
        dataTableJsonCopy = dataTable;

        var columns = addAllColumnHeaders(dataTable, table$);
        $('#panelButtonstableSqlResponse').html(`
            <button onclick="copyTextJson(dataTableJsonCopy);" title="Copy Json to Clipboard" class="btn btn-light btn-sm"><i class="fa fa-clipboard"></i> Copy Json</button>
            <button onclick="downloadObjectAsJson(dataTableJsonCopy,'devToolsJson')" class="btn btn-light btn-sm"><i class="fa fa-download" ></i> Download Json</button>
            <button onclick="downloadCSVFromJson(dataTableJsonCopy,'devToolsCsv');" class="btn btn-light btn-sm"> <i class="fa fa-download" ></i> Download Csv</button>
        `);
    } else {
        $('#panelButtonstableSqlResponse').html(``);
    }

    tbody$ = $('<tbody/>');
    for (var i = 0; i < dataTable.length; i++) {
        var row$ = $('<tr/>');
        row$.append($('<td class="text-right"/>').html(i + 1));

        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = dataTable[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(htmlEntities(cellValue)));
        }
        tbody$.append(row$);
    }
    $(table$).append(tbody$);
    $(selector).append(table$);
    table$.DataTable();

}

function whatIsIt(object) {
    var stringConstructor = "test".constructor;
    var arrayConstructor = [].constructor;
    var objectConstructor = ({}).constructor;
    if (object === null) {
        return "null";
    }
    if (object === undefined) {
        return "undefined";
    }
    if (object.constructor === stringConstructor) {
        return "String";
    }
    if (object.constructor === arrayConstructor) {
        return "Array";
    }
    if (object.constructor === objectConstructor) {
        return "Object";
    } else {
        return "don't know";
    }
}
// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(dataTable, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    if (whatIsIt(dataTable) == "Array") {
        headerTr$.append($('<th class="dark" width="30"/>').html("#"));
    }
    for (var i = 0; i < dataTable.length; i++) {
        var rowHash = dataTable[i];
        for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th class="dark"/>').html(htmlEntities(key)));
            }
        }
    }
    headerTr$ = $('<thead/>').html(headerTr$)
    selector.append(headerTr$);

    return columnSet;
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

downloadObjectAsJson = (exportObj, exportName) => {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


copyTextJson = (jsonData) => {
    let selPre = document.createElement('pre');
    let selBox = document.createElement('textarea');
    selPre.appendChild(selBox);
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selPre.style.position = 'fixed';
    selPre.style.left = '0';
    selPre.style.top = '0';
    selPre.style.opacity = '0';
    selBox.value = JSON.stringify(jsonData, null, "    ");
    document.body.appendChild(selPre);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selPre);
}

downloadCSVFromJson = (arrayOfJson, filename) => {
    // convert JSON to CSV
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(arrayOfJson[0])
    let csv = arrayOfJson.map(row => header.map(fieldName =>
        JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename + ".csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};