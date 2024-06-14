let themeswich = document.getElementById("themeswich");
themeswich.onclick = function(){
    let theme = document.getElementById("theme");

    if(theme.getAttribute("href") == "../mainpage/mainpage.css"){
        theme.href = "../mainpage/BlackTheme.css";
    }
    else{
        theme.href = "../mainpage/mainpage.css";
    }
}