let themeswich = document.getElementById("themeswich");
themeswich.onclick = function(){
    let theme = document.getElementById("theme");
    let theme1 = document.getElementById("theme1")
    if(theme.getAttribute("href") == "../mainpage/mainpage.css" && theme1.getAttribute("href")=="../firstpage/firstpage.css"){
        theme1.href = "../firstpage/BlackTheme.css";
        theme.href = "../mainpage/BlackTheme.css"
    }
    else{
        theme1.href = "../firstpage/firstpage.css";
        theme.href = "../mainpage/mainpage.css";
    }
}