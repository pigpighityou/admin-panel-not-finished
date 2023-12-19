const dateFormat=(date)=>{
    let time=new Date(date);
    let year=time.getFullYear();
    let month=time.getMonth()+1;
    let day=time.getDate();
    function add(num){
        return num<10?'0'+num:num;
    }
    return add(year)+'-'+add(month)+'-'+add(day);
}


export default dateFormat;