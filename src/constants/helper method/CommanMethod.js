
export const getDate= (timeStamp) => {
    var intval = parseInt(timeStamp);   
    var t = new Date(intval* 1000);
    var day = t.getDay();
    var date = t.getDate();
    var month = ParseMonth(t.getMonth() + 1);
    var year = t.getFullYear();
    var formatted =  month+" "+date +",  "+year
    // console.log("update_date==>", formatted);
    return formatted;
}


export const getTimeAmPm= (timeStamp) => {
    var intval = parseInt(timeStamp);   
    var time = new Date(intval * 1000);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var formatted =  hours + ":" + minutes + ":" + seconds + " " + ampm;
    console.log("update_date==>", formatted);
    return formatted;
}



export const getDateTime = (timestamp) => {
    //=========Get Date==============
    var intval = parseInt(timestamp);

    var t = new Date(intval* 1000);
    console.log("Ints s==>", t);

    var day = t.getDay();
    var date = t.getDate();
    var month = t.getMonth() +1;
    var year = t.getFullYear();
    //============Get Time =============
    var time = new Date(intval * 1000);
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    //============Get AM PM============
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //============Formate date according============
    var formatted = date + "-" + month + "-" + year + "  " + hours + ":" + minutes + ":" + seconds + " " + ampm;
    console.log("update_date==>", formatted);
    return formatted;
}




export const ParseMonth=(num)=> {
    let result = "";
    if (num == "01") {
        result = "Jan"
    }
    if (num == "02") {
        result = "Feb"
    }
    if (num == "03") {
        result = "Mar"
    }
    if (num == "04") {
        result = "Apr"
    }
    if (num == "05") {
        result = "May"
    }
    if (num == "06") {
        result = "Jun"
    }
    if (num == "07") {
        result = "Jul"
    }
    if (num == "08") {
        result = "Aug"
    }
    if (num == "09") {
        result = "Sept"
    }
    if (num == "10") {
        result = "Oct"
    }
    if (num == "11") {
        result = "Nov"
    }
    if (num == "12") {
        result = "Dec"
    }
    return result;
}
