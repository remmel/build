
function MaterialsPanelController(domObj, initObj){

    var selectedItem = 1;
    var buttonsArr ;

    function selectItem(id){

        selectedItem=id;
        for(i=1;i<buttonsArr.length;i++){
            if(i === selectedItem){
                buttonsArr[i].style.borderStyle = "groove";
            }else{
                buttonsArr[i].style.borderStyle = "none";
            }
        }

    }
    function onBntPressed(e){

        var id = e.target.index;
        if(selectedItem !== id){
            selectItem(id);
            if(initObj.onSelected){
                initObj.onSelected(id);
            }
        }

    }
    function init(){
        buttonsArr = [];

        buttonsArr.push(null);//domObj.querySelector(".button-texture"));
        buttonsArr.push(domObj.querySelector(".volu-button-shaded"));
        buttonsArr.push(domObj.querySelector(".volu-button-mtl-solidshade"));
        buttonsArr.push(domObj.querySelector(".volu-button-normals"));
        buttonsArr.push(domObj.querySelector(".volu-button-flat"));



        for(i=1;i<buttonsArr.length;i++){
            buttonsArr[i].index = i;
            buttonsArr[i].addEventListener("click",onBntPressed);
        }
        selectItem(selectedItem )
    }
    init();
}