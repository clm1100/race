$(function(){
    $.get("/api/races",(res)=>{
        if(res.code==200){
            let html = template('list',{list:res.data});
            console.log(res.data)
            $("#tbody").html(html);
        }
    })
})