let themeswich = document.getElementById("themeswich");
themeswich.onclick = function(){
    let theme = document.getElementById("theme");
    let theme2 = document.getElementById("theme2")
    if(theme.getAttribute("href") == "../mainpage/mainpage.css" && theme2.getAttribute("href")=="../secondpage/secondpage.css"){
        theme2.href = "../secondpage/BlackTheme.css";
        theme.href = "../mainpage/BlackTheme.css"
    }
    else{
        theme2.href = "../secondpage/secondpage.css";
        theme.href = "../mainpage/mainpage.css";
    }
}