$(function () {

    function initrender(){
        $.get("/api/teams",(result)=>{
            let html = template("list",{"list":result.data});
            $("#tbody").html(html)
        })
    }
    initrender();
    $("#slug").on('change',(e)=>{
        let formdata = new FormData();
        formdata.append('avatar',e.target.files[0]);
        $.ajax({
            type:'post',
            data:formdata,
            url:"/api/upload",
            contentType:false,
            processData:false,
        }).done(function (res) {
            console.log(res);
            $("#teamLogo").prop("src",res.src);
            $('input[name=logo]').val(res.src);
        })
    })
    $("#addteam").on('click',()=>{
        if(!$('input[name=logo]').val()|| !$("#name").val()){
            alert("请输入信息");
            return
        }
        console.log($("#teamform").serialize());
        $.post("/api/addteams",$("#teamform").serialize(), function (data) {
            $("#teamform")[0].reset();
            $('input[name=logo]').val("");
            $("#teamLogo").prop("src",'/assets/img/user.svg');
            if(data.code==200){
                initrender()
            }
        })
    })
})