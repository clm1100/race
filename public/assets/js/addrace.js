$(function () {
    $('#created').datetimepicker({
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        format: 'yyyy-mm-dd hh:ii',
        autoclose: 1,
        weekStart: 1,
        todayBtn:  1,
        todayHighlight: 1,
        startView: 2,
        minView: 0,
        forceParse: 0
    });

    $.get("/api/teams",(res)=>{
        console.log(res);
        var html = template('list',{list:res.data});
        $("#home,#away").html(html);
    })

    $("#btn").on('click',()=>{
        var datastr = $("#reacform").serialize();
        $.post("/api/addrace",datastr,(res)=>{
            console.log(res);
        })
    })



})