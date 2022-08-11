$(document).ready(function() {

    requestPage();
    loop();
});


function loop() {

    requestConnector();

    setTimeout(function() { loop(); }, 60000);

}


function findConnector() {
    requestPage();
}


function requestList() {
    requestConnector();
}



function requestPage() {
    var strSearch = $('#search_txt').val();
    var strEmp = $("#stf_emp option:selected").val();
    if (strEmp == undefined)
        return;
    var send_data = { stf_emp: strEmp, search: strSearch };

    var url = getAppUrl("connector_count");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: send_data,
        success: function(jResult) {
            // console.log(jResult);
            if (jResult.status == "success") {
                TotalCount = jResult.data;
                setFirstPage();
                requestConnector();
            } else if (jResult.status == "fail") {
                alert('잘못된 계정정보입니다.');

            } else if (jResult.status == "logout") {
                location.replace('/');
            }
        },
        error: function(request, status, error) {
            //console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}


function requestConnector() {
    var strSearch = $('#search_txt').val();
    var strEmp = $("#stf_emp option:selected").val();
    if (strEmp == undefined)
        return;
    var nPage = getActivePage();
    if (nPage < 0)
        nPage = 1;
    var send_data = { stf_emp: strEmp, search: strSearch, page: nPage, cntper: CountPerPage };

    var url = getAppUrl("connector_list");

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: send_data,
        success: function(jResult) {
            // console.log(jResult);
            if (jResult.status == "success") {
                showConnector(jResult.data, jResult.field);
            } else if (jResult.status == "fail") {
                alert('잘못된 계정정보입니다.');

            } else if (jResult.status == "logout") {
                location.replace('/');
            }
        },
        error: function(request, status, error) {
            // console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

function getTdHtml(field, objSess) {
    tHtml = "";
    switch(field) {
        case "user_info":
            tHtml += "<td>";
            if (objSess.sess_mb_uid.length > 0) {
                tHtml += "<a href=\"/" + $('#category_name').text() + "/member?uid=" + objSess.sess_mb_uid;
                tHtml += "\" >" + objSess.sess_mb_uid + "</a>";
            }
            if (parseInt(objSess.mb_vip) > 0)
                tHtml += "<br>(VIP)";
            tHtml += "</td>";
            break;
        case "memo_1":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_1;
            tHtml +="</td>";
            break;
        case "memo_2":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_2;
            tHtml +="</td>";
            break;
        case "memo_3":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_3;
            tHtml +="</td>";
            break;
        case "memo_4":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_4;
            tHtml +="</td>";
            break;
        case "memo_5":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_5;
            tHtml +="</td>";
            break;
        case "memo_6":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_6;
            tHtml +="</td>";
            break;
        case "memo_7":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_7;
            tHtml +="</td>";
            break;
        case "memo_8":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_8;
            tHtml +="</td>";
            break;
        case "memo_9":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_9;
            tHtml +="</td>";
            break;
        case "memo_10":
            tHtml +="<td>";
            tHtml += objSess.sess_memo_10;
            tHtml +="</td>";
            break;
        case "prop_1":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_1.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_2":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_2.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_3":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_3.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_4":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_4.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_5":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_5.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_6":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_6.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_7":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_7.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_8":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_8.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_9":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_9.toLocaleString();
            tHtml +="</td>";
            break;
        case "prop_10":
            tHtml +="<td>";
            tHtml += objSess.sess_prop_10.toLocaleString();
            tHtml +="</td>";
            break;
        case "sess_time":
            tHtml +="<td>";
            if(objSess.sess_time_begin.length > 18)
                tHtml += "시작:"+objSess.sess_time_begin.substr(5, 11);
            if(objSess.sess_time_last.length > 18)
                tHtml += "<br>업뎃:"+objSess.sess_time_last.substr(5, 11);
            tHtml += "</td>";
            break;
        case "ip_addr":
            tHtml += "<td>";
            tHtml += objSess.sess_pub_addr;
            tHtml += "</td>";
            break;
        }
        return tHtml;
    }