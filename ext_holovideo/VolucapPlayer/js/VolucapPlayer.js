var VoluInnerHTML = `
        <div class = "volu-threejs-container" style="background-color: #555555">

        </div>
        <div class="volu-player-controls noselect">
            <div class = "volu-time-line">
                <div class = "volu-player-line volu-line-bg"></div>
                <div class = "volu-player-line volu-line-loaded"></div>
                <div class = "volu-player-line volu-line-progres"></div>
                <!--<div id = "line-completed"></div>-->
                <div class = "volu-player-slider" hidden></div>
            </div>
            <div class = "volu-player-controls-buttons volu-button-rewind volu-btnbg"></div>
            <div class = "volu-player-controls-buttons volu-button-play volu-btnbg"></div>

            <div class = "volu-player-file-info"> no file selected</div>
            <div class = "volu-player-controls-buttons volu-button-expand volu-btnbg"></div>
            <div class = "volu-player-controls-buttons volu-button-share volu-btnbg" hidden></div>
            <div class = "volu-player-controls-buttons volu-button-open volu-btnbg" hidden></div>

        </div>

        <div class = "volu-top-panel">
            <img src="images/volucapplayer/vclogo_white.png" class="volu-top-logo noselect">
        </div>

        <div class = "volu-materails-panel">
           <!-- <div class = "material-panel-buttons button-texture"></div>-->
            <div class = "volu-material-panel-buttons volu-button-shaded"></div>
            <div class = "volu-material-panel-buttons volu-button-mtl-solidshade"></div>
            <div class = "volu-material-panel-buttons volu-button-normals"></div>
            <div class = "volu-material-panel-buttons volu-button-flat"></div>

        </div>

        <div class = "volu-env-panel">
            <div class = "volu-env-panel-buttons volu-btn-envpanel"></div>
        </div>

        <div class = "volu-adjustcamera-panelbutton">
            <div class = "volu-adjustpanel-buttons volu-btn-adjust"></div>
            <div class = "volu-adjustpanel-buttons volu-btn-camera"></div>
        </div>

        <div class = "volu-adjustment-panel noselect" hidden >
            <div class="volu-slidernlable" style="top:0">
                <p class="volu-p-left">Light intensity</p>
                <div class="volu-slider-intensity volu_slider"></div>
            </div>

            <div class="volu-slidernlable" style="top:40pt">
                <p class="volu-p-left">Light Position</p>
                <div class="volu-slider-lightPosition volu_slider"></div>
            </div>

            <div class="volu-slidernlable" style="top:80pt">
                <p class="volu-p-left">EnvMap intensity</p>
                <div class="volu-slider-env volu_slider"></div>
            </div>

            <div class="volu-slidernlable" style="top:120pt">
                <p class="volu-p-left">Metalness</p>
                <div  class="volu-slider-metalness volu_slider"></div>
            </div>

            <div class="volu-slidernlable" style="top:160pt">
                <p class="volu-p-left">Shadow opacity</p>
                <p class="volu-p-right">softness</p>
                <div class="volu-slider-shadow volu_slider_halfleft"></div>
                <div class="volu-slider-shadowsoft volu_slider_halfright"></div>
            </div>


            <div class="volu-slidernlable" style="top:200pt">
                <p class="volu-p-left">Scene Exposure</p>
                <div class="volu-slider-gamma volu_slider_75prc"></div>
            </div>


        </div>
        
        <div class = "volu-camera-panel noselect" hidden>
            <div class="volu-slidernlable" style="top:0">
                <p class="volu-p-left">Distance Range</p>
                <div class="volu-slider-cameradistance volu_slider"></div>
            </div>

            <div class="volu-slidernlable" style="top:40pt">
                <p class="volu-p-left">Polar Range</p>
                <div class="volu-slider-camerapolarrange volu_slider"></div>
            </div>

            <div class="volu-slidernlable" style="top:80pt">
                <p class="volu-p-left">Azimuth Min</p>
                <p class="volu-p-right">Azimuth Max</p>
                <div class="volu-slider-camazimuthmin volu_slider_halfleft"></div>
                <div class="volu-slider-camazimuthmax volu_slider_halfright"></div>
            </div>
         
            <div class="volu-slidernlable" style="top:120pt">
                <p class="volu-p-left">Floor Limit</p>
                <p class="volu-p-right">DOF power</p>
                <div class="volu-toggl-floorlimit volu_toggl"></div>
                <div class="volu-slider-DOFpower volu_slider_halfright"></div>
            </div>
            
            <div class="volu-slidernlable" style="top:160pt">
                <p class="volu-p-left">DOF Focus Distance</p>
                <div class="volu-slider-DOFfocus volu_slider_75prc"></div>
                <div class="volu-checkbox-container-right volu-settuielement">
                    <input type="checkbox" id="chDOFautofous" name="chDOFautofous" style="bottom: 0" class="volu-settuielement" checked>
                    <label for="chDOFautofous" class="volu-settuielement">Auto</label>
                </div>
            </div>
            
            <div class="volu-slidernlable" style="top:200pt">
                <p class="volu-p-left">Camera Target Lock</p>
                <div class="volu-checkbox-container-left volu-settuielement">
                    <input type="checkbox" id="chCameraTargetLockX" name="chCameraTargetLockX" style="bottom: 0" class="volu-settuielement">
                    <label for="chCameraTargetLockX" class="volu-settuielement">X</label>
                </div>
                <div class="volu-checkbox-container-center volu-settuielement">
                    <input type="checkbox" id="chCameraTargetLockY" name="chCameraTargetLockY" style="bottom: 0" class="volu-settuielement">
                    <label for="chCameraTargetLockY" class="volu-settuielement">Y</label>
                </div>
                <div class="volu-checkbox-container-right volu-settuielement">
                    <input type="checkbox" id="chCameraTargetLockZ" name="chCameraTargetLockZ" style="bottom: 0" class="volu-settuielement">
                    <label for="chCameraTargetLockZ" class="volu-settuielement">Z</label>
                </div>
            </div>
           
        </div>

        <div class = "volu-message">The link has been copied to clipboard</div>

        <div class = "volu-popup-container" hidden>
            <div class ="volu-popup-window volu-popup-open" hidden>
                <span class = "popup-window-caption">Open</span>
                <label for="textField" class ="popup-window-description">Paste URL to *.vcap file in text field below.</label>
                <textarea type="text" class="volu-textarea" name="textField"></textarea>
                <div class = "popup-window-btn volu-btnbg volu-btn-action" style="left:52%;"> Open </div>
                <div class = "popup-window-btn volu-btnbg volu-btn-cancel" style="right:52%;"> Cancel </div>
            </div>
            
             <div class ="volu-popup-window volu-popup-share" hidden>
                <span class = "popup-window-caption">Share</span>
                <div class = "popup-window-addsettings" style="position:relative">
                    <div>
                      <input type="checkbox" id="ch_shareButton" name="shareButton">
                      <label for="ch_shareButton">Show Share Button</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ch_openButton" name="openButton">
                      <label for="ch_openButton">Show Open Button</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ch_hideTimeline" name="hideTimeline" checked>
                      <label for="ch_hideTimeline">Hide TimeLine</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ch_ignoreUrlParams" name="showLogo">
                      <label for="ch_ignoreUrlParams">Show Logo At Top Left Corner</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ch_showSettingsPanel" name="showSettingsPanel">
                      <label for="ch_showSettingsPanel">Show Lignt/Shadow/Env Panel</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ch_hideControlBg" name="hideControlBg" checked>
                      <label for="ch_hideControlBg">Hide background under Timeline</label>
                    </div>
                   
                </div>
                <label for="popup-window-sharingtype" >Sharing type.</label>
                <div class = "popup-window-sharingtype" style="position:relative; margin-top: 5pt">
                      <input type="radio" id="ch_shateTypefame" name="hideControlBg" value="iframe" checked>
                      <label for="ch_shateType">IFrame</label>
                      <input type="radio" id="ch_shateType2" name="hideControlBg" value="link">
                      <label for="ch_shateType2">Link</label>
                </div>
                <div style="height: 120pt; position:relative; margin-top: 20pt;" > 
                    <label for="textField" class ="popup-window-description">Paste URL to *.hcap file in text field below.</label>
                    <textarea type="text" class="volu-textarea" name="textField" style="height: 70%"></textarea>
                </div>
                <div class = "popup-window-btn volu-btnbg volu-btn-action" style="left:52%;"> Open </div>
                <div class = "popup-window-btn volu-btnbg volu-btn-cancel" style="right:52%;"> Cancel </div>
            </div>
        </div>

        <div class = "volu-preloder" hidden>
            <img src="images/volucapplayer/vclogo_128x128.gif">;
        </div>


`


var VoluBase64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=VoluBase64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=VoluBase64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0; n<e.length; n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
var VoluInterops = {

    getUrlVars:function(){
        var e = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (r, a, n) {
            e[a] = n
        });
        return e;
    },

    getStateFromHash:function(){
        return JSON.parse(VoluBase64.decode(location.hash));
    },

    getStateFromStringHash:function(str){
        return JSON.parse(VoluBase64.decode(str));
    },

    getHeshFromState: function(obj){
        function makeShortFloats(obj){
            for(var item in obj) {
                if(typeof obj[item] === "object"){
                    makeShortFloats(obj[item])
                }else if(typeof obj[item] === "number"){
                    obj[item] = Math.round(obj[item]*1000)/1000;
                }
            }
        }

        makeShortFloats(obj);
        return VoluBase64.encode(JSON.stringify(obj));
    },

    copyTextToClipboard: function (text) {
        var result = false;
        var textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;


        textArea.style.width = '2em';
        textArea.style.height = '2em';

        textArea.style.padding = 0;

        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';


        textArea.style.background = 'transparent';


        textArea.value = text;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            result = successful ? true : false;

        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
        return result;
    }

};

/// Init Obj Parameters
///--path :String[path to hcap file]
///--ignoreUrlParams :Boolean [ignore #hash and vars in window location]
///--shareButton : Boolead [if true share button will be visible]

function VoluPopup(domObj){
    var parent;
    var activeCallBack;
    var textArea;
    var self = this;
    var sharePopUp = false;

    function showShareText(){
        const urls = window.location.href.split("#")[0].split("/");
        urls.pop();

        const url = urls.join("/") + "/view.html";
        const b64 = VoluInterops.getHeshFromState(volucapPlayer.getInterfaceState());

        let fParh;
        let allow = "";
        let allowURL = "";
        if(domObj.querySelector("#ch_shateTypefame").checked){
            ///IFRAME

            const chSettings = domObj.querySelectorAll(".popup-window-addsettings input");
            for(let i=0; i<chSettings.length; i++){

                if(chSettings[i].checked){
                    allow+=chSettings[i].name + ";"
                }
            }
            let varsCount=0;
            for(let i=0; i<chSettings.length; i++){
                if(chSettings[i].checked){
                    allowURL+=(varsCount?"&":"?") + chSettings[i].name + "=1";
                    varsCount++;
                }
            }
            let surl = url +  allowURL + '#'+ b64;
          //  fPath = `<iframe allow ="` + allow + `" width="100%" height="100%" src="` + surl + `" allowfullscreen frameborder="0"></iframe>`;
            fPath = `<iframe width="100%" height="100%" src="` + surl + `" allowfullscreen frameborder="0" id="volucap-player"></iframe>`;



        }else{
            ///LINKS

            const chSettings = domObj.querySelectorAll(".popup-window-addsettings input");

            let varsCount=0;
            for(let i=0; i<chSettings.length; i++){
                if(chSettings[i].checked){
                    allowURL+=(varsCount?"&":"?") + chSettings[i].name + "=1";
                    varsCount++;
                }
            }
            fPath = url + allowURL + '#'+ b64;

        }
        self.setInputValue(fPath);

    }
    this.show = function (caption, activebutton, description, height){
        domObj.hidden = false;


        self.subDom = domObj.querySelector(activebutton.class);

        if(self.subDom.classList.contains("volu-popup-share")) {
            sharePopUp= true;
        }else{
            sharePopUp= false;
        }
        textArea = self.subDom.querySelector(".volu-textarea");

        if(sharePopUp){
            showShareText();
        }


        self.subDom.hidden = false;


        self.subDom.querySelector(".volu-btn-cancel").onclick = onCancel;
        self.subDom.querySelector(".volu-btn-action").onclick = onAction;
        activeCallBack = activebutton.callback;

        if(caption){
            self.subDom.querySelector(".popup-window-caption").innerHTML = caption;
        }

        if(activebutton || activebutton.name){
            self.subDom.querySelector(".volu-btn-action").innerHTML = activebutton.name;
        }

        if(description){
            showMessage(description);
        }
    };

    this.setInputValue = function(val){
        textArea.value = val;
    }

    const showMessage = this.showMessage = function(val){
        self.subDom.querySelector(".popup-window-description").style.color = "white";
        self.subDom.querySelector(".popup-window-description").innerHTML = val;
    };

    const showWrongMessage = this.showWrongMessage = function(val){
        self.subDom.querySelector(".popup-window-description").style.color = "red";
        self.subDom.querySelector(".popup-window-description").innerHTML = val;
    };

    const close = this.close = function(){
        domObj.hidden = true;
        self.subDom.hidden = true;
    }

    function onCancel(e){
        console.log("cancel");
        close();
    }

    function onAction(e){
        if(activeCallBack){
            activeCallBack(textArea.value);
        }
    }

    function init(){
        arr = domObj.querySelectorAll("input");
        for(let i = 0; i < arr.length; i++){
            arr[i].onclick = function(){
                showShareText();
            }
        }

    }
    console.log("VPLAYER", domObj);
    init()
}

function VoluCheckBox(domObj){
    this.set = function(val){
        domObj.checked = val;
    }
    this.onchange = null;
    const self= this;
    function onValChanged(e){
        if(self.onchange != null){
            self.onchange(domObj.checked);
        }
    }
    domObj.addEventListener("change",onValChanged);
}

function VolucapPlayer(domObj, initObj){
    let timelineControls;
    let materailsSwitcher;
    let enviromentConroller;
    let holoPlayer;
    let holoReady = false;
    interfaceState = {};

    let inputPopup;

    let videoCanPlay = false;

    let buffProgressAcheiveOne = false;

    const self = this;

    this.getInterfaceState = function(){
        return interfaceState;
    }

    const load = this.load = function(path){
        holoReady = false;
        videoCanPlay = false;
        buffProgressAcheiveOne = false;
        showPreloader();
        timelineControls.resetControls();
        holoPlayer.loadVolucapMesh(path);

    }

    function loadByUser(path){
        interfaceState[VolucapStateFileds.FilePath] = path;
        load(path);
    }


//-----------holoPlayer Events
    function changeInterfaceState(field,val){
        interfaceState[field] = val;
    };

    function removeIntefaceState(field){
        if(interfaceState[field] !== undefined){
            delete interfaceState[field]
        }

    }


    function updateHistory(){
        let url = window.location.pathname.split("/").pop();
        var b64 = VoluInterops.getHeshFromState(interfaceState);
        console.log(interfaceState);
        window.location.hash = '#'+ b64;
    };

    function onVideoTimeUpdate(e){

        if(holoPlayer.getHoloVideo().hvo.currentFrameInfo.frameIndex>2 && !buffProgressAcheiveOne) {
            console.log("TIME UPDATE",e);
            buffProgressAcheiveOne = true;
            checkPreloader();
        }

    }

    function onVideoStartsPlay(e){
        timelineControls.onVideoStartsPlay(e);
    }
    function checkPreloader(){
        if(holoReady && videoCanPlay && buffProgressAcheiveOne) {
            hidePreloader();
        }
    }

    function onVideoCanPlay(e){
        videoCanPlay = true;
        checkPreloader();
    }

    function onHoloReady(e){

        timelineControls.updateGeneralInfo(e);
        holoReady = true;

        if(interfaceState[VolucapStateFileds.EnviromentObj]){
            if(typeof interfaceState[VolucapStateFileds.EnviromentObj] === "number"){
                onEnvSelected(null, interfaceState[VolucapStateFileds.EnviromentObj]);
            }
        }
    };

    function onHoloFrameUpdate( hvo){

        const currentFrame =  hvo.currentFrameInfo.frameIndex;
        const  totalFrames =  hvo.meshFrames.length;
        changeInterfaceState(VolucapStateFileds.CurrentFrame,currentFrame);

        timelineControls.updateSliderPosition(currentFrame/totalFrames);
        timelineControls.updateGeneralInfo(hvo);
    }

    var modelReqested = false;
    function onEnvLoaded(e){

        if(!modelReqested){
            if(interfaceState[VolucapStateFileds.FilePath]){
                load(interfaceState[VolucapStateFileds.FilePath]);
            }else{
                initObj.path?load(initObj.path):0;
            }
            modelReqested = true;
            return;
        }
        console.log("ENV LOADED")
        checkPreloader()
    }

    function onVideoLoadingProgress(e){
        if(e === 1){
            buffProgressAcheiveOne = true;
        }
        timelineControls.setLoadedCont(e);
        checkPreloader();
        console.log("porgress",e);
    }

    function onHoloLoopComplete(){

    }


//*------------------INTERFACE VIDEO CONTROL EVENTS-----------------

    function onPlayButtonPressed(val){
        if(val){
            holoPlayer.play();
        }else{
            holoPlayer.pause();
        }
    }

    function onRewindButton(){
        holoPlayer.rewind();
    }

    function onSliderUpdate(val){
        //holoPlayer.setPosition(val);
    }

    function onMatertailSelected(matID){

        holoPlayer.changeRenderStyle(matID);
        changeInterfaceState(VolucapStateFileds.MaterisalID,matID);
    }

    function onSliderStart(){
        holoPlayer.pause();
    }

    function onSliderFinished(val){
        holoPlayer.setPosition(val);
    }

    function fullscreen(obj) {
        const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null);

        const docElm = obj;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    function onExpandButton(e){
        fullscreen(domObj)
    }

////------------ENV Events
    function onEnvSelected(obj, id){

        if(id !== undefined){
            changeInterfaceState(VolucapStateFileds.EnviromentObj,id);
            if(holoPlayer.setEnviroment(VolucapSettings.enviromentImages[id])){
                showPreloader();
            }
        }else{
            if(holoPlayer.setEnviroment(obj)){
                showPreloader();
            }
        }

    }


    function showPreloader(){
        domObj.querySelector(".volu-preloder").hidden = false;
    }

    function hidePreloader(){
        domObj.querySelector(".volu-preloder").hidden = true;
    }

    function onLiteIntesityChanged(e){
        const val = parseFloat(e[0]);
        changeInterfaceState(VolucapStateFileds.LightIntencity,val);
        holoPlayer.setLightIntensity(val);
    }

    function onLightPositionChanged(e){
        const val = parseFloat(e[0]);
        changeInterfaceState(VolucapStateFileds.LightDirection,val);
        holoPlayer.setLightPosition(val);

    }

    function onEnvIntesityChanged(e){
        const val = parseFloat(e[0]);
        holoPlayer.setEnvIntensity(val);
        changeInterfaceState(VolucapStateFileds.MaterailEnvIntensity,val);
    }

    function onGammaChanged(e){
        const val = parseFloat(e[0]);
        changeInterfaceState(VolucapStateFileds.SceneExposure,val);
        holoPlayer.setExsposure(val);
    }

    function onMetalnessChanged(e){
        const val = parseFloat(e[0]);
        holoPlayer.setMetalness(val);
        changeInterfaceState(VolucapStateFileds.MaterailMetalness,val);

    }

    function onEnvIntForMetalnessChanged(e){
        if(sliders[VolucapStateFileds.MaterailMetalness]) {
            sliders[VolucapStateFileds.MaterailMetalness].set(e);
            changeInterfaceState(VolucapStateFileds.MaterailMetalness, e);
        }
    }

    function onShadowChanged(e){
        const val = parseFloat(e[0]);
        holoPlayer.setShadowOpacity(val);
        changeInterfaceState(VolucapStateFileds.ShadowOpacity,val);
    }

    function onShadowSoftChanged(e){
        const val = parseFloat(e[0]);
        holoPlayer.setSahdowSoftness(val);
        changeInterfaceState(VolucapStateFileds.ShadowSmothness,val);
    }

    function onCameraChanged(obj){
        changeInterfaceState(VolucapStateFileds.Camera,obj);

    }


    var sliders = {};
    function initAdjustmentSliders(){

        ///LIGHT INTENNSITY SLIDER
        let slider = noUiSlider.create(domObj.querySelector(".volu-slider-intensity"),
            {
                start: 1,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 4,
                }
            });
        slider.on("slide", onLiteIntesityChanged);
        sliders[VolucapStateFileds.LightIntencity] = slider;

        ///ENV INTENSITY SLIDER
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-env"),
            {
                start: 100,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        slider.on("slide", onEnvIntesityChanged);
        sliders[VolucapStateFileds.MaterailEnvIntensity] = slider;


        ///LIGHT DIRECTION SLIDER
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-lightPosition"),
            {
                start: 40,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        slider.on("slide", onLightPositionChanged);
        sliders[VolucapStateFileds.LightDirection] = slider;

        ///EXPOSURE SLIDER
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-gamma"),
            {
                start: 1,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 4,
                }
            });
        slider.on("slide", onGammaChanged);
        sliders[VolucapStateFileds.SceneExposure] = slider;


        ///METALNESS/CONTRAST SLIDER
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-metalness"),
            {
                start: 1,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 1.5,
                }
            });
        slider.on("slide", onMetalnessChanged);
        sliders[VolucapStateFileds.MaterailMetalness] = slider;


        ///SHADOW OPACITY
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-shadow"),
            {
                start: 0.5,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 1,
                }
            });
        slider.on("slide", onShadowChanged);
        sliders[VolucapStateFileds.ShadowOpacity] = slider;


        ///SHADOW SOFTNESS
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-shadowsoft"),
            {
                start: 2,
                connect: 'lower',
                range: {
                    'min': 0,
                    'max': 8,
                }
            });
        slider.on("slide", onShadowSoftChanged);
        sliders[VolucapStateFileds.ShadowSmothness] = slider;


        ///ADJUSTMENT PANEL OPENER
        const btnOpen = domObj.querySelector(".volu-btn-adjust");
        btnOpen.onclick = function(){
            domObj.querySelector(".volu-adjustment-panel").hidden = !domObj.querySelector(".volu-adjustment-panel").hidden;
            document.body.addEventListener("pointerdown",
                function (e) {
                    const needToClose = !domObj.querySelector(".volu-adjustment-panel").hidden &&
                        !e.target.classList.contains("noUi-handle") &&
                        !e.target.classList.contains("noUi-connects") &&
                        !e.target.classList.contains("noUi-connect") &&
                        !e.target.classList.contains("btn-adjust")&&
                        !e.target.classList.contains("volu-slidernlable")&&
                        !e.target.parentNode.classList.contains("volu-slidernlable");
                    if(needToClose ){

                        domObj.querySelector(".volu-adjustment-panel").hidden = true;
                    }
                }
            );
        }

    }



    function onCameraDistanceSettingsChanged(e){

        const obj = [parseFloat(e[0]),parseFloat(e[1])];
        holoPlayer.setCameraDistanceRange(obj);
        changeInterfaceState(VolucapStateFileds.CameraDistanceRange,obj);

    }

    function onCameraPolarRangeChanged(e){
        const obj = [parseFloat(e[0]),parseFloat(e[1])];
        holoPlayer.setCameraPolarRange(obj);
        changeInterfaceState(VolucapStateFileds.CameraPolarRange,obj);
    }

    function onCameraAzimuthMinChanged(e){
        const val =parseFloat(e[0]);
        holoPlayer.setCameraAzimuthMin(val);
        changeInterfaceState(VolucapStateFileds.CameraAzimuthMin,val);
    }

    function onCameraAzimuthMaxChanged(e){
        const val =parseFloat(e[0]);
        holoPlayer.setCameraAzimuthMax(val);
        changeInterfaceState(VolucapStateFileds.CameraAzimuthMax,val);
    }

    function onCameraFloorLimitChanged(e){
        const val = parseFloat(e[0]);
        holoPlayer.setCameraFloorLimit(val);
        changeInterfaceState(VolucapStateFileds.CameraFloorZeroLimit,val);
    }

    function onDOFPowerChanged(e){
        const val = parseFloat(e[0]);
        holoPlayer.setDOFPower(val);
        changeInterfaceState(VolucapStateFileds.DOF_Power,val);

    }

    function onDOFAutoFoucsChangd(e){
        holoPlayer.setAutoFocus(e);

        if(e){
            removeIntefaceState(VolucapStateFileds.CameraDOFfocus);
        }else{
            const strval = sliders[VolucapStateFileds.CameraDOFfocus].get();
            const val = parseFloat(strval[0]);
            holoPlayer.setFocusDistance(val);
            changeInterfaceState(VolucapStateFileds.CameraDOFfocus,val);
        }
    }

    function onDOFFocusChanged(e){
        holoPlayer.setAutoFocus(false);
        sliders[VolucapStateFileds.CameraDOFAutofocs].set(false)
        const val = parseFloat(e[0]);
        console.log(val);
        holoPlayer.setFocusDistance(val);
        changeInterfaceState(VolucapStateFileds.CameraDOFfocus,val);
    }

    function cameraFocusDistanceChanged(val){
        if(sliders[VolucapStateFileds.CameraDOFfocus]) {
            sliders[VolucapStateFileds.CameraDOFfocus].set(val);
        }
    }

    function onCamLockXChanged(e){
        holoPlayer.setCameraTargetLockX(e);
        changeInterfaceState(VolucapStateFileds.CameraTargetLockX,e);

    }

    function onCamLockYChanged(e){
        holoPlayer.setCameraTargetLockY(e);
        changeInterfaceState(VolucapStateFileds.CameraTargetLockY,e);

    }

    function onCamLockZChanged(e){
        holoPlayer.setCameraTargetLockZ(e);
        changeInterfaceState(VolucapStateFileds.CameraTargetLockZ,e);
    }

    function initCameraSettingsSliders(){

        /// DISTANCE RANGE SLIDER
        let slider = noUiSlider.create(domObj.querySelector(".volu-slider-cameradistance"),
            {
                start: [0,5],
                connect: true,
                range: {
                    'min': 0,
                    'max': 5,
                }
            });
        slider.on("slide", onCameraDistanceSettingsChanged);
        sliders[VolucapStateFileds.CameraDistanceRange] = slider;

        /// POLAR RANGE SLIDER
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-camerapolarrange"),
            {
                start: [0, Math.PI*2],
                connect: true,
                range: {
                    'min': 0,
                    'max': Math.PI,
                }
            });
        slider.on("slide", onCameraPolarRangeChanged);
        sliders[VolucapStateFileds.CameraPolarRange] = slider;


        ///AZIMUTH CAMERA MIN
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-camazimuthmin"),
            {
                start: -Math.PI,
                connect: "lower",
                range: {
                    'min': -Math.PI,
                    'max': Math.PI,
                }
            });
        slider.on("slide", onCameraAzimuthMinChanged);
        sliders[VolucapStateFileds.CameraAzimuthMin] = slider;

        ///AZIMUTH CAMERA MIN
        slider = noUiSlider.create(domObj.querySelector(".volu-slider-camazimuthmax"),
            {
                start: Math.PI,
                connect: "lower",
                range: {
                    'min': -Math.PI,
                    'max': Math.PI,
                }
            });
        slider.on("slide", onCameraAzimuthMaxChanged);
        sliders[VolucapStateFileds.CameraAzimuthMax] = slider;

        ////FLOOR LIMIT TOGGLE
        slider = noUiSlider.create(domObj.querySelector(".volu-toggl-floorlimit"),
            {
                start: 0,
                range: {
                    'min': [0,1],
                    'max': 1,
                },
                connect: "lower",

            });
        slider.on("slide", onCameraFloorLimitChanged);
        sliders[VolucapStateFileds.CameraFloorZeroLimit] = slider;


        slider = noUiSlider.create(domObj.querySelector(".volu-slider-DOFpower"),
            {
                start: 0.01,
                range: {
                    'min': 0,
                    'max': 0.1,
                },
                connect: "lower",

            });
        slider.on("slide", onDOFPowerChanged);
        sliders[VolucapStateFileds.DOF_Power] = slider;

        slider = noUiSlider.create(domObj.querySelector(".volu-slider-DOFfocus"),
            {
                start: 0.5,
                range: {
                    'min': 0,
                    'max': 7,
                },
                connect: "lower",

            });
        slider.on("slide", onDOFFocusChanged);
        sliders[VolucapStateFileds.CameraDOFfocus] = slider;



        let chekbox = new VoluCheckBox(domObj.querySelector("#chDOFautofous"))
        sliders[VolucapStateFileds.CameraDOFAutofocs] = chekbox;
        chekbox.onchange = onDOFAutoFoucsChangd;

        ///LockX,y,z
        chekbox = new VoluCheckBox(domObj.querySelector("#chCameraTargetLockX"))
        sliders[VolucapStateFileds.CameraTargetLockX] = chekbox;
        chekbox.onchange = onCamLockXChanged;

        chekbox = new VoluCheckBox(domObj.querySelector("#chCameraTargetLockY"))
        sliders[VolucapStateFileds.CameraTargetLockY] = chekbox;
        chekbox.onchange = onCamLockYChanged;

        chekbox = new VoluCheckBox(domObj.querySelector("#chCameraTargetLockZ"))
        sliders[VolucapStateFileds.CameraTargetLockZ] = chekbox;
        chekbox.onchange = onCamLockZChanged;



        ///ADJUSTMENT PANEL OPENER
        const btnOpen = domObj.querySelector(".volu-btn-camera");
        btnOpen.onclick = function(){
            domObj.querySelector(".volu-camera-panel").hidden = !domObj.querySelector(".volu-camera-panel").hidden;
            document.body.addEventListener("pointerdown",
                function (e) {
                    const needToClose = !domObj.querySelector(".volu-camera-panel").hidden &&
                        !e.target.classList.contains("noUi-handle") &&
                        !e.target.classList.contains("noUi-connects") &&
                        !e.target.classList.contains("noUi-connect") &&
                        !e.target.classList.contains("btn-adjust")&&
                        !e.target.classList.contains("volu-slidernlable")&&
                        !e.target.classList.contains("volu-settuielement")&&
                        !e.target.parentNode.classList.contains("volu-slidernlable");
                    if(needToClose ){

                        domObj.querySelector(".volu-camera-panel").hidden = true;
                    }
                }
            );
        }

    }


    function onInputOpenBtnPressed(txt){
        if(txt === ""){
            inputPopup.showWrongMessage("Text Area is Emply, Please paste the URL.");
            return;
        }
        if(txt.indexOf(".hcap") === -1 && txt.indexOf(".vcap") === -1 ){
            inputPopup.showWrongMessage("Make sure that is VCAP or HCAP fromat.");
            return;
        }

        inputPopup.close();
        loadByUser(txt);

        //console.log("open pressed",e )
    }

    function initShareAndOpenButtons(){

        const btnShare = document.querySelector(".volu-button-share");
        const btnOpen = document.querySelector(".volu-button-open");
        if(!initObj.shareButton)
        {
            btnShare.hidden = true;
        }else{
            btnShare.hidden = false;

            btnShare.onclick = function(){
                inputPopup.show("Share link",{
                        name:"Copy link",
                        class:".volu-popup-share",
                        callback:function(txt){
                            VoluInterops.copyTextToClipboard(txt);
                            inputPopup.close();
                            domObj.querySelector(".volu-message").style.animation = "anim-volu-opacity 2s ease 1";
                            setTimeout(
                                function () {
                                    console.log("reset style");
                                    domObj.querySelector(".volu-message").style.animation = null;
                                }
                                ,2000
                            )
                        },
                    },
                    "Use this link to share model with settings:"
                );



                //updateHistory();
                //VoluInterops.copyTextToClipboard(window.location.href);
            }
        }

        if(!initObj.openButton)
        {
            btnOpen.hidden = true;

        }else{
            btnOpen.hidden = false;
            if(!initObj.shareButton) {
                btnOpen.style.transform = "translateX(125%)";
            }
            btnOpen.onclick = function () {
                inputPopup.show(
                    "Open VCAP or HCAP file",
                    {
                        name:"Open",
                        class:".volu-popup-open",
                        callback:onInputOpenBtnPressed,
                    },
                    "Paste URL to *.vcap or *.hcap file in text field below."
                );
                inputPopup.setInputValue("");
            }
        }

    }

    function checkSecondatySettings(){
        if(initObj.showLogo){
            document.querySelector(".volu-top-logo").hidden = false;
        }else{
            document.querySelector(".volu-top-logo").hidden = true;
        };
        if(!initObj.showSettingsPanel){
            document.querySelector(".volu-env-panel").hidden = true;
            document.querySelector(".volu-materails-panel").hidden = true;
            document.querySelector(".volu-adjustcamera-panelbutton").hidden = true;
        }else{
            document.querySelector(".volu-env-panel").hidden = false;
            document.querySelector(".volu-materails-panel").hidden = false;
            document.querySelector(".volu-adjustcamera-panelbutton").hidden = false;
        }
    }

    function checkUrlParams(val){
        if(val){
            interfaceState = VoluInterops.getStateFromStringHash(val);
        }else if(window.location.hash && !initObj.ignoreUrlParams) {
            interfaceState = VoluInterops.getStateFromHash();
        }else {
            interfaceState = {};
        }

            var defSett = VolucapSettings.defaultSettings;


            ///SET CAM SETTING
            if(interfaceState[VolucapStateFileds.Camera]){
                holoPlayer.setCamera(interfaceState[VolucapStateFileds.Camera]);
            }

            ///SHADOW OPACITY
            if(interfaceState[VolucapStateFileds.ShadowOpacity] !== undefined){
                holoPlayer.setShadowOpacity(interfaceState[VolucapStateFileds.ShadowOpacity]);
                sliders[VolucapStateFileds.ShadowOpacity].set(interfaceState[VolucapStateFileds.ShadowOpacity]);
            }else{
                holoPlayer.setShadowOpacity(defSett[VolucapStateFileds.ShadowOpacity]);
                sliders[VolucapStateFileds.ShadowOpacity].set(defSett[VolucapStateFileds.ShadowOpacity]);
            }

            ///SHADOW SOFTNESS
            if(interfaceState[VolucapStateFileds.ShadowSmothness] !== undefined){
                holoPlayer.setSahdowSoftness(interfaceState[VolucapStateFileds.ShadowSmothness]);
                sliders[VolucapStateFileds.ShadowSmothness].set(interfaceState[VolucapStateFileds.ShadowSmothness]);
            }else{
                holoPlayer.setSahdowSoftness(defSett[VolucapStateFileds.ShadowSmothness]);
                sliders[VolucapStateFileds.ShadowSmothness].set(defSett[VolucapStateFileds.ShadowSmothness]);
            }

            ///ENV INTENSITY
            if(interfaceState[VolucapStateFileds.MaterailEnvIntensity] !== undefined){
                holoPlayer.setEnvIntensity(interfaceState[VolucapStateFileds.MaterailEnvIntensity]);
                sliders[VolucapStateFileds.MaterailEnvIntensity].set(interfaceState[VolucapStateFileds.MaterailEnvIntensity]);
            }else{
                holoPlayer.setEnvIntensity(defSett[VolucapStateFileds.MaterailEnvIntensity]);
                sliders[VolucapStateFileds.MaterailEnvIntensity].set(defSett[VolucapStateFileds.MaterailEnvIntensity]);
            }

            ///MATERIAL METALNESS(CONTRAST)
            if(interfaceState[VolucapStateFileds.MaterailMetalness] !== undefined){
                holoPlayer.setMetalness(interfaceState[VolucapStateFileds.MaterailMetalness]);
                sliders[VolucapStateFileds.MaterailMetalness].set(interfaceState[VolucapStateFileds.MaterailMetalness]);
            }else{
                holoPlayer.setMetalness(defSett[VolucapStateFileds.MaterailMetalness]);
                sliders[VolucapStateFileds.MaterailMetalness].set(defSett[VolucapStateFileds.MaterailMetalness]);

            }

            ///LIGHT INTENCITY
            if(interfaceState[VolucapStateFileds.LightIntencity] !== undefined){
                holoPlayer.setLightIntensity(interfaceState[VolucapStateFileds.LightIntencity]);
                sliders[VolucapStateFileds.LightIntencity].set(interfaceState[VolucapStateFileds.LightIntencity]);
            }else{
                holoPlayer.setLightIntensity(defSett[VolucapStateFileds.LightIntencity]);
                sliders[VolucapStateFileds.LightIntencity].set(defSett[VolucapStateFileds.LightIntencity]);

            }

            ///LIGHT DIRECTTION
            if(interfaceState[VolucapStateFileds.LightDirection] !== undefined){
                holoPlayer.setLightPosition(interfaceState[VolucapStateFileds.LightDirection]);
                sliders[VolucapStateFileds.LightDirection].set(interfaceState[VolucapStateFileds.LightDirection]);
            }else{
                console.log("LIGHT DIRECTION", defSett[VolucapStateFileds.LightDirection])
                holoPlayer.setLightPosition(defSett[VolucapStateFileds.LightDirection]);
                sliders[VolucapStateFileds.LightDirection].set(defSett[VolucapStateFileds.LightDirection]);
            }

            ///SCENE EXPOSURE
            if(interfaceState[VolucapStateFileds.SceneExposure] !== undefined){
                holoPlayer.setExsposure(interfaceState[VolucapStateFileds.SceneExposure]);
                sliders[VolucapStateFileds.SceneExposure].set(interfaceState[VolucapStateFileds.SceneExposure]);
            }else{
                holoPlayer.setExsposure(defSett[VolucapStateFileds.SceneExposure]);
                sliders[VolucapStateFileds.SceneExposure].set(defSett[VolucapStateFileds.SceneExposure]);
            }

            ///
            console.log("interfaceState",interfaceState, "DEFF SETTINGSW", defSett);
            ///CAMERA DISTANCE RANGE
            if(interfaceState[VolucapStateFileds.CameraDistanceRange] !== undefined){
                 holoPlayer.setCameraDistanceRange(interfaceState[VolucapStateFileds.CameraDistanceRange]);
                 sliders[VolucapStateFileds.CameraDistanceRange].set(interfaceState[VolucapStateFileds.CameraDistanceRange]);
             }else{

                 holoPlayer.setCameraDistanceRange(defSett[VolucapStateFileds.CameraDistanceRange]);
                 sliders[VolucapStateFileds.CameraDistanceRange].set(defSett[VolucapStateFileds.CameraDistanceRange]);
            }

            /// CAMERA POLAR RANGE
            if(interfaceState[VolucapStateFileds.CameraPolarRange] !== undefined){
                holoPlayer.setCameraPolarRange(interfaceState[VolucapStateFileds.CameraPolarRange]);
                sliders[VolucapStateFileds.CameraPolarRange].set(interfaceState[VolucapStateFileds.CameraPolarRange]);
            }else{
                holoPlayer.setCameraPolarRange(defSett[VolucapStateFileds.CameraPolarRange]);
                sliders[VolucapStateFileds.CameraPolarRange].set(defSett[VolucapStateFileds.CameraPolarRange]);
            }

            /// CAMERA AZIMUTH MIN
            if(interfaceState[VolucapStateFileds.CameraAzimuthMin] !== undefined){
                holoPlayer.setCameraAzimuthMin(interfaceState[VolucapStateFileds.CameraAzimuthMin]);
                sliders[VolucapStateFileds.CameraAzimuthMin].set(interfaceState[VolucapStateFileds.CameraAzimuthMin]);
            }else{
                holoPlayer.setCameraAzimuthMin(defSett[VolucapStateFileds.CameraAzimuthMin]);
                sliders[VolucapStateFileds.CameraAzimuthMin].set(defSett[VolucapStateFileds.CameraAzimuthMin]);
            }

            /// CAMERA AZIMUTH MAX
            if(interfaceState[VolucapStateFileds.CameraAzimuthMax] !== undefined){
                holoPlayer.setCameraAzimuthMax(interfaceState[VolucapStateFileds.CameraAzimuthMax]);
                sliders[VolucapStateFileds.CameraAzimuthMax].set(interfaceState[VolucapStateFileds.CameraAzimuthMax]);
            }else{
                holoPlayer.setCameraAzimuthMax(defSett[VolucapStateFileds.CameraAzimuthMin]);
                sliders[VolucapStateFileds.CameraAzimuthMax].set(defSett[VolucapStateFileds.CameraAzimuthMax]);
            }


            //// CAMERA FLOOR LIMIT
            if(interfaceState[VolucapStateFileds.CameraFloorZeroLimit] !== undefined){
                holoPlayer.setCameraFloorLimit(interfaceState[VolucapStateFileds.CameraFloorZeroLimit]);
                sliders[VolucapStateFileds.CameraFloorZeroLimit].set(interfaceState[VolucapStateFileds.CameraFloorZeroLimit]);
            }else{
                holoPlayer.setCameraFloorLimit(defSett[VolucapStateFileds.CameraFloorZeroLimit]);
                sliders[VolucapStateFileds.CameraFloorZeroLimit].set(defSett[VolucapStateFileds.CameraFloorZeroLimit]);
            }

            /// DOF power
            if(interfaceState[VolucapStateFileds.DOF_Power] !== undefined){
                holoPlayer.setDOFPower(interfaceState[VolucapStateFileds.DOF_Power]);
                sliders[VolucapStateFileds.DOF_Power].set(interfaceState[VolucapStateFileds.DOF_Power]);
            }else{
                holoPlayer.setDOFPower(defSett[VolucapStateFileds.DOF_Power]);
                sliders[VolucapStateFileds.DOF_Power].set(defSett[VolucapStateFileds.DOF_Power]);
            }

            /// Autofocus

            if(interfaceState[VolucapStateFileds.CameraDOFfocus] !== undefined){
                holoPlayer.setAutoFocus(false);

                holoPlayer.setFocusDistance(interfaceState[VolucapStateFileds.CameraDOFfocus]);
                sliders[VolucapStateFileds.CameraDOFfocus].set(interfaceState[VolucapStateFileds.CameraDOFfocus]);
                sliders[VolucapStateFileds.CameraDOFAutofocs].set(false);
            }else{
                sliders[VolucapStateFileds.CameraDOFAutofocs].set(true);
                holoPlayer.setAutoFocus(true);

            }

            /// Camera Target Locks

            if(interfaceState[VolucapStateFileds.CameraTargetLockX] !== undefined){
                holoPlayer.setCameraTargetLockX(interfaceState[VolucapStateFileds.CameraTargetLockX]);
                sliders[VolucapStateFileds.CameraTargetLockX].set(interfaceState[VolucapStateFileds.CameraTargetLockX]);
            }else{
                holoPlayer.setCameraTargetLockX(defSett[VolucapStateFileds.CameraTargetLockX]);
                sliders[VolucapStateFileds.CameraTargetLockX].set(defSett[VolucapStateFileds.CameraTargetLockX]);
            }

            if(interfaceState[VolucapStateFileds.CameraTargetLockY] !== undefined){
                holoPlayer.setCameraTargetLockY(interfaceState[VolucapStateFileds.CameraTargetLockY]);
                sliders[VolucapStateFileds.CameraTargetLockY].set(interfaceState[VolucapStateFileds.CameraTargetLockY]);
            }else{
                holoPlayer.setCameraTargetLockY(defSett[VolucapStateFileds.CameraTargetLockY]);
                sliders[VolucapStateFileds.CameraTargetLockY].set(defSett[VolucapStateFileds.CameraTargetLockY]);
            }

            if(interfaceState[VolucapStateFileds.CameraTargetLockZ] !== undefined){
                holoPlayer.setCameraTargetLockZ(interfaceState[VolucapStateFileds.CameraTargetLockZ]);
                 sliders[VolucapStateFileds.CameraTargetLockZ].set(interfaceState[VolucapStateFileds.CameraTargetLockZ]);
             }else{
                 holoPlayer.setCameraTargetLockZ(defSett[VolucapStateFileds.CameraTargetLockZ]);
                 sliders[VolucapStateFileds.CameraTargetLockZ].set(defSett[VolucapStateFileds.CameraTargetLockZ]);
             }


    }

    function init(){

        console.log("INIT----",window);
        if(window.frameElement){
            console.log("settings===",window.frameElement.allow);
            const vars = window.frameElement.allow.split(";");
            for(let i=0 ; i<vars.length; i++){
                if(vars[i].indexOf("=")>-1){
                    const pair = vars[i].split("=");
                    initObj[pair[0]] = pair[1];
                }else{
                    initObj[vars[i]] = true;
                }
            }
        }else{
            const urlVars = VoluInterops.getUrlVars();
            for(let i in urlVars){
                initObj[i] = urlVars[i];
            }
        }

        domObj.innerHTML = VoluInnerHTML;
        holoPlayer = new HoloPlayerWrapper(domObj.querySelector(".volu-threejs-container"),
            {
                onDataReady: onHoloReady,
                onFrameUpdate:onHoloFrameUpdate,
                onLoopComplete:onHoloLoopComplete,
                onVideoLoading:onVideoLoadingProgress,
                onEnvLoaded:onEnvLoaded,
                onCameraChanged:onCameraChanged,
                onVideoCanPlay:onVideoCanPlay,
                onVideoStartsPlay:onVideoStartsPlay,
                onVideoTimeUpdate:onVideoTimeUpdate,
                onEnvIntForMetalnessChanged:onEnvIntForMetalnessChanged,
                onCameraDistanceChanged:cameraFocusDistanceChanged,
            });

        if(initObj.hideTimeline){
            domObj.querySelector(".volu-player-controls .volu-time-line").hidden = true;
            domObj.querySelector(".volu-player-controls .volu-player-file-info").hidden = true;

        }

        if(initObj.hideControlBg){
            domObj.querySelector(".volu-player-controls").style.backgroundColor = "rgba(0,0,0,0)";
        }

        timelineControls = new VideoControls(domObj.querySelector(".volu-player-controls"),
            {
                onPlayButton: onPlayButtonPressed,
                onRewindButton: onRewindButton,
                onExpandButton: onExpandButton,
                onSliderUpdate: onSliderUpdate,
                onSliderFinished:onSliderFinished,
                onSliderStart:onSliderStart,

            });


        materailsSwitcher = new MaterialsPanelController(domObj.querySelector(".volu-materails-panel"),
            {
                onSelected:onMatertailSelected,
            });

        enviromentConroller = new EnviromentPanelController(domObj.querySelector(".volu-env-panel"),
            {
                settings:VolucapSettings.enviromentImages,
                onItemSelected:onEnvSelected,
            }
        );

        inputPopup = new VoluPopup(domObj.querySelector(".volu-popup-container"));


        initAdjustmentSliders();

        initCameraSettingsSliders();

        checkUrlParams();


        holoPlayer.setEnviroment(VolucapSettings.enviromentImages[0]);

        initShareAndOpenButtons();
        checkSecondatySettings()
    };

    this.initSettingsByHash = function(hash){
        checkUrlParams(hash);
    };

    init();
}
