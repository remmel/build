function EnviromentPanelController(domObj, initObj){
    let selectedItem = -1;
    let settingsObj;
    let expanded = false;
    let buttonsArr = [];
    let expandedPanelWidth;
    let closedPanelWidth;

    initObj = initObj || {};


    function closePanel(){
        for(i=0;i<buttonsArr.length;i++){
            buttonsArr[i].hidden = true;
        }
        domObj.style.width = closedPanelWidth + "px";
    }

    function openPanel(){
        for(i=0;i<buttonsArr.length;i++){
           buttonsArr[i].hidden = false;
        }
        domObj.style.width = expandedPanelWidth + "px";
    }

    function onExpandButtonClick(){
        if(expanded){
            closePanel()
        }else{
            openPanel()
        }
        expanded = !expanded;
    }

    function getButton(){
        const retobj = document.createElement("div");
        retobj.classList.add("volu-env-panel-buttons");
        return retobj;
    }

    function selectItem(selectedItem){
        for(i=0;i<buttonsArr.length;i++){
            if(i === selectedItem){
                buttonsArr[i].style.borderStyle = "groove";
            }else{
                buttonsArr[i].style.borderStyle = "none";
            }
        }
    }

    function onItemSelected(e){

        if(e.target.dataId !==  selectedItem ){
            initObj.onItemSelected?initObj.onItemSelected(settingsObj[e.target.dataId], e.target.dataId):null;
        }
        selectedItem = e.target.dataId;
        selectItem(selectedItem)

    }
    function bodyclick(e){
        if(!e.target.classList.contains("volu-env-panel-buttons") && expanded){
            expanded = false;
            closePanel();
        }
    }

    function buildButtons(settings){
        closedPanelWidth = domObj.offsetWidth;
        const style = getComputedStyle(document.body);
        const distBetweenButtons = 5;

        console.log('--enviromentpanel-paddings =', distBetweenButtons);

        let btnWidth;

        for( i = 0 ;i < settings.length ; i++){
            const btn = getButton();
            domObj.appendChild(btn);
            btnWidth =btn.offsetWidth;
            const rstyle = "calc("+ (settings.length-i) + " * var(--enviromentpanel-button-size));"
            btn.style.right = (i + 1) * btnWidth*1.1 + 20 + "px";
            if(settings[i].thumb){
                btn.style.backgroundImage = "url("+settings[i].thumb + ")";
            }
            buttonsArr.push(btn);
            btn.dataId = i;
            btn.onclick = onItemSelected;
            btn.hidden = true;
        }



        expandedPanelWidth = (settings.length+1)*btnWidth*1.1 + 25;

        document.body.addEventListener("pointerdown",bodyclick);
    }

    function init(){
        if(initObj.settings){
            buildButtons(initObj.settings);
            settingsObj = initObj.settings;
        }

        const expandButton = domObj.querySelector("div");
        expandButton.onclick = onExpandButtonClick;

    }
    init()
}