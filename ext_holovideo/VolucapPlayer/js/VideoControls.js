
function VideoControls(domObject,initObj){
    initObj = initObj || {};

    const textInfoCmtainer = domObject.querySelector(".volu-player-file-info");
    const self = this;

    let isPlaying;
    let playButton,slider;

    let sliderPressed = false;
    let startSliderX;
    let startPointerX;

    /*GLOBAL*/

    this.updateGeneralInfo = function(hvo){
        textInfoCmtainer.innerHTML = getSpan("File",hvo.videoElements[0].mp4Name) + " " + getSpan("Frames" , hvo.meshFrames.length) + " " + getSpan("Current Frame" , hvo.currentFrameInfo.frameIndex);
    };

    this.resetControls = function(){
        textInfoCmtainer.innerHTML = "no file selected";
        isPlaying = false;
        renderPlayButton(isPlaying);
        self.updateSliderPosition(0);
    };

    this.updateSliderPosition = function(val){
        slider.style.left = val*100+"%";
        domObject.querySelector(".volu-line-progres").style.width =(val*100) + "%";
    };


    this.onVideoStartsPlay = function(val){
        if(!isPlaying){
            isPlaying = true;
            renderPlayButton(isPlaying);
        }

    }

    /*LOCAL*/
    function getSpan(field,val){
        return "<span style='display: inline-block'>" + field + ": <span class='volu-o_text'>" + (val?val:0) +"</span></span> ";
    }

    function renderPlayButton(state){
        console.log("playButton = ",playButton);
        if(!state){
            playButton.style.backgroundImage = "url(images/volucapplayer/btn_Play.svg)";
        }else{
            playButton.style.backgroundImage = "url(images/volucapplayer/btn_Pause.svg)";
        }
    }

    function onPlayButton(){
        isPlaying = !isPlaying;
        renderPlayButton(isPlaying);
        if(initObj.onPlayButton){
            initObj.onPlayButton(isPlaying);
        }
    }

    function onExpandButton(){
        if(initObj.onExpandButton){
            initObj.onExpandButton();
        }
    }

    function onRewindButton(){
        initObj.onRewindButton?initObj.onRewindButton():null;
        self.updateSliderPosition(0);
        isPlaying = false;
        renderPlayButton(isPlaying);
    }

    function getCoords(e){
        return {x:e.screenX ,y:e.screenY};
    }

    function sliderDown(e){
        var p = getCoords(e);
        sliderPressed = true;
        startPointerX = p.x;
        startSliderX = slider.offsetLeft;
        if(initObj.onSliderStart){
            initObj.onSliderStart();
        }
        isPlaying = false;
        renderPlayButton(isPlaying);
    }

    function sliderUp(){
        if(sliderPressed){
            if(initObj.onSliderFinished) {
              //  console.log(sliderPostion);
                initObj.onSliderFinished(sliderPostion)
            }
        }
        sliderPressed = false;
    }

    var sliderPostion = 0;
    function sliderMove(e){

        if(sliderPressed){
            var p = getCoords(e);
            var moved = p.x - startPointerX;
            var parent = domObject.querySelector(".volu-time-line");
            var npos = startSliderX + moved;
            var pos = Math.min(Math.max(0,npos),parent.offsetWidth);
            sliderPostion = pos/parent.offsetWidth;

            slider.style.left = (sliderPostion*100) + "%";
            domObject.querySelector(".volu-line-progres").style.width =(sliderPostion*100) + "%";
            if(initObj.onSliderUpdate){
                initObj.onSliderUpdate(sliderPostion);
            }
        }

    }

    var loadedCont=0;
    this.setLoadedCont = function(val){
        loadedCont = val;
        domObject.querySelector(".volu-line-loaded").style.width = val*100 + "%";
    };

    function init(){
        playButton = domObject.querySelector(".volu-button-play");
        playButton.addEventListener("click", onPlayButton);

        domObject.querySelector(".volu-button-expand").addEventListener("click", onExpandButton);

        slider = domObject.querySelector(".volu-player-slider");
        domObject.querySelector(".volu-line-progres").style.width = 0;
        domObject.querySelector(".volu-line-loaded").style.width = 0;

        loadedCont = 0;

        domObject.querySelector(".volu-button-rewind").addEventListener("click",onRewindButton);

        slider.addEventListener("pointerdown",sliderDown);
        document.addEventListener("pointermove",sliderMove);
        document.addEventListener("pointerup",sliderUp);
    }
    init()
}

