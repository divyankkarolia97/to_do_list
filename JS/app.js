
var modelList = [];

window.onload = function(){
    var add = document.getElementById("add");
    var input = document.getElementById("input");
    var list = document.getElementById("list");
    var del = document.getElementById("del");
    printList();

    add.onclick = function(){
        if(input.value==""){
            alert("ENTER A VALID INPUT");
            return;
        }
        var object={
            task:input.value,
            done:false
        }

        modelList.push(object);

        localStorage.setItem("storeList",JSON.stringify(modelList));
        input.value="";

        printList();


    }
    del.onclick = function(){
        var f = modelList.filter(function(item,index,modelList){
            if(item.done === false){
                return true;
            }
        })
        modelList = f;
        localStorage.setItem("storeList",JSON.stringify(modelList));
        printList();
    }

    function printList() {
        var s = localStorage.getItem("storeList");
        if(s) {
            modelList = JSON.parse(s);
            printViewList(modelList,list);
        }
    }
    function printViewList(modelList,list){
        list.innerHTML="";
        for(i in modelList){
            var div = document.createElement("li");
            div.className="row list-group-item";

            var checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            checkbox.className = "col-1";
            checkbox.setAttribute("data-id",i);
            checkbox.addEventListener("click",linethrough);

            var ele = document.createElement("span");
            ele.className="col-8";
            ele.style.setProperty("font-size","20px");
            ele.innerText = modelList[i].task;

            var Xbutton = document.createElement("i");
            Xbutton.className="fa fa-times col-1 icn-mv";
            Xbutton.setAttribute("data-id",i);
            Xbutton.addEventListener("click",deleteEle);
            ///////

            var Upbutton = document.createElement("i");
            Upbutton.className="fa fa-arrow-up col-1 icn-mv";
            Upbutton.setAttribute("data-id",i);
            Upbutton.addEventListener("click",moveUp);


            var Downbutton = document.createElement("i");
            Downbutton.className="fa fa-arrow-down col-1";
            Downbutton.setAttribute("data-id",i);
            Downbutton.addEventListener("click",moveDown);

            if(modelList[i].done==true){

                ele.style.setProperty("text-decoration","line-through");
                checkbox.setAttribute("checked","checked");
            }


            div.appendChild(checkbox);
            div.appendChild(ele);
            div.appendChild(Upbutton);
            div.appendChild(Downbutton);
            div.appendChild(Xbutton);

            list.appendChild(div);
        }
    }
    function linethrough(event){
        var s = event.target.getAttribute("checked");
        var id = event.target.getAttribute("data-id");


        if(s=="checked"){
            event.target.setAttribute("checked","unchecked");
            event.target.nextElementSibling.style.setProperty("text-decoration", "");
            modelList[id].done=false;
        }
        else {
            event.target.setAttribute("checked", "checked");
            event.target.nextElementSibling.style.setProperty("text-decoration", "line-through");
            modelList[id].done=true;
        }
        localStorage.setItem("storeList",JSON.stringify(modelList));

    }

    function deleteEle(event){

        var index = event.target.getAttribute("data-id");

        modelList.splice(index,1);
        localStorage.setItem("storeList",JSON.stringify(modelList));
        if(modelList.length>0){

            printList();
        }
        else{
            printViewList(modelList,list);
        }
    }


    function moveUp(event){
        var index = event.target.getAttribute("data-id");
        index = parseInt(index);
        modelList.splice((index-1),0,modelList.splice(index,1)[0]);
        localStorage.setItem("storeList",JSON.stringify(modelList));
        printList();
    }

    function moveDown(event){
        var index = event.target.getAttribute("data-id");
        index = parseInt(index);
        modelList.splice(index+1,0,modelList.splice(index,1)[0]);
        localStorage.setItem("storeList",JSON.stringify(modelList));
        printList();
    }



}