let themeswich = document.getElementById("themeswich");
themeswich.onclick = function(){
    let theme = document.getElementById("theme");
    let theme3 = document.getElementById("theme3")
    if(theme.getAttribute("href") == "../mainpage/mainpage.css" && theme3.getAttribute("href")=="../thirdpage/thirdpage.css"){
        theme3.href = "../thirdpage/BlackTheme.css";
        theme.href = "../mainpage/BlackTheme.css"
    }
    else{
        theme3.href = "../thirdpage/thirdpage.css";
        theme.href = "../mainpage/mainpage.css";
    }
}