$(function(){
    $.get("/api/comments",(res)=>{
        let html = template('list',{list:res.data});
        console.log(res.data)
        $("#tbody").html(html);
    })
})