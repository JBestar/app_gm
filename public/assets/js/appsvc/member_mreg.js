var m_accounts = null;

function showIdAndPwd(arrData) {
    var tHtml = "";
    if (arrData != null && arrData.length > 0) {

        for (var idx in arrData) {
            tHtml += "<tr>";
            tHtml += "<td>" + arrData[idx].id + "</td>";
            tHtml += "<td>" + arrData[idx].pwd + "</td>";
            tHtml += "</tr>";
        }
        $("#tb-id").show();
    } else $("#tb-id").hide();

    $("#tb-data-id").html(tHtml);
}

function changePwdType() {
    if ($('#mb_pwd_type').val() == 0) {
        $('#mb_pwd_str').show();
        $('#mb_pwd_digit').hide();
    } else {
        $('#mb_pwd_str').hide();
        $('#mb_pwd_digit').show();
    }
}

function autoCreate() {
    var uid_digit = $("#mb_uid_digit").val();
    
    if (uid_digit < 3 || uid_digit > 50) {
        alert("아이디 길이는 3~50자리입니다.");
        return;
    }

    let pwd_type = $('#mb_pwd_type').val();

    let pwd_str = '';
    let pwd_digit = 0;
    if (pwd_type == 0) {
        pwd_str = $('#mb_pwd_str').val();

        if (pwd_str.length < 3 || pwd_str.length > 20) {
            alert("비번길이는 3~20자리입니다.");
            return;
        }

    } else {
        pwd_digit = $('#mb_pwd_digit').val().length > 0 ? parseInt($('#mb_pwd_digit').val()) : 0;

        if (pwd_digit < 3 || pwd_digit > 20) {
            alert("비번길이는 3~20자리입니다.");
            return;
        }
        if (pwd_digit < 3 || pwd_digit > 20) {
            alert("비번길이는 3~20자리입니다.");
            return;
        }
    }
    

    var create_count = $("#mb_count").val();
    if (create_count < 1) {
        alert("생성갯수를 정확히 입력해주십시오.");
        return;
    }
    if (create_count >= 100) {
        alert("최대 생성갯수를 초과하셧습니다.");
        return;
    }
    var url = getAppUrl("member_createids");

    var send_data = { create_count: create_count, 
        uid_length : uid_digit, pwd_length : pwd_digit, pwd_str :pwd_str };

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: send_data,
        success: function(jResult) {
            // console.log(jResult);
            if (jResult.status == "success") {
                m_accounts = jResult.data;
                showIdAndPwd(jResult.data);
            } else if (jResult.status == "logout") {
                location.replace('/');
            } else if (jResult.status == "fail") {
                alert("잘못된 계정정보입니다.");
            }
        },
        error: function(request, status, error) {
            // console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }

    });

}


function saveMember() {

    var objMember = new Object();
    objMember.mb_name = $("#mb_name").val();
    objMember.mb_emp_fid = $("#mb_emp option:selected").val();
    objMember.mb_time_limit = $("#mb_time_limit").val();
    objMember.mb_vip = $("#mb_vip option:selected").val();
    objMember.mb_accounts = m_accounts;

    if (objMember.mb_emp_fid == undefined ||
        objMember.mb_accounts == null || objMember.mb_accounts.length < 1) {
        alert("회원정보를 정확히 입력해주십시오.");
        return;
    }

    var jsonData = JSON.stringify(objMember);
    //console.log(jsonData);

    if (!confirm("저장하시겠습니까?"))
        return;

    var url = getAppUrl("member_creates");

    $.ajax({
        type: "POST",
        dataType: "json",
        url: url,
        data: { json_: jsonData },
        success: function(jResult) {
            console.log(jResult);
            if (jResult.status == "success") {
                location.replace(getAppUrl("member"));
            } else if (jResult.status == "logout") {
                location.replace('/');
            } else if (jResult.status == "fail") {
                if (jResult.code == 5)
                    alert("중복된 아이디입니다.");
                else if (jResult.code == 6)
                    alert("중복된 닉네임입니다.");
                else alert("등록이 실패되었습니다.");
            }
        },
        error: function(request, status, error) {
            // console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }

    });

}

function cancelMember() {

    location.href = getAppUrl("member");
}