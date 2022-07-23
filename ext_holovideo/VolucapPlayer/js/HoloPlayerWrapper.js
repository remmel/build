//import { LightProbeGenerator } from 'LightProbeGenerator.js';

var HoloVideoState = {
    Epmty:0,
    LoadingJsonData:1,
    LoadingVideoData:2,
    ReadyToPlay:3,
}

var RenderStyle = {
    Shaded:0,
    Wire:1,
    Normals: 2,
}

const lutMap = {
    'Bourbon 64.CUBE': null,
    'Chemical 168.CUBE': null,
    'Clayton 33.CUBE': null,
    'Cubicle 99.CUBE': null,
    'Remy 24.CUBE': null,
};



function HoloPlayerWrapper(domObj, initObj){
    const self = this;
    const postprocessing = {};

    let camera, scene, renderer;
    let cameraControl;

    let ground;

    let holoVideo;
    let holoVideoState = HoloVideoState.Epmty;

    let currentFrame  =0 ;
    let prevFrame = 0;

    let renderStyle = RenderStyle.Shaded;

    let voluMesh;

    let materials;

    let tempBox;

    let exposure = 1;

    let envMapIntesity = 20;

    let lightsIntensity = 1;

    let _metalness = 1;

    let dofEnabled = true;

    let cameraTargetLockX = false;

    let cameraTargetLockY = false;

    let cameraTargetLockZ = false;

    let autoFocus = true;

    let focusDistance = 0;


    function onWindowResize() {
        //var w = Math.min(window.innerWidth, window.innerHeight);
        camera.aspect = domObj.clientWidth / domObj.clientHeight;
        camera.updateProjectionMatrix();
        // var dc = Math.min(camera.aspect,1);
        // camera.position.x = getCameraX();
        renderer.setSize( domObj.clientWidth , domObj.clientHeight );
        postprocessing.composer.setSize( domObj.clientWidth, domObj.clientHeight );
    }

    function onVideoProgress(){
        if(initObj.onFrameUpdate){
            initObj.onFrameUpdate(holoVideo.hvo);
        }
    }

    this.setAutoFocus = function(val){
        autoFocus = val;
    }

    this.setFocusDistance = function(val){
        focusDistance = val;
    }

    this.setCamera = function(obj){
        cameraControl.setState(obj);
    }

    this.setCameraTargetLockX = function(val){
        cameraTargetLockX = val;
        cameraControl.targetLockX = val;
    }

    this.setCameraTargetLockY = function(val){
        cameraTargetLockY = val;
        cameraControl.targetLockY = val;
    }

    this.setCameraTargetLockZ = function(val){
        cameraTargetLockZ = val;
        cameraControl.targetLockZ = val;
    }

    this.setCameraDistanceRange = function(arr){
        cameraControl.minDistance = arr[0];
        cameraControl.maxDistance = arr[1];
        cameraControl.update();
    }

    this.setCameraPolarRange = function(arr){
        cameraControl.minPolarAngle = arr[0];
        cameraControl.maxPolarAngle = arr[1];
        cameraControl.update();
    }

    this.setCameraAzimuthMin = function(e){
        cameraControl.minAzimuthAngle = e;
        cameraControl.update();
    }

    this.setCameraAzimuthMax = function(e){
        cameraControl.maxAzimuthAngle = e;
        cameraControl.update();
    }

    this.setCameraFloorLimit = function(e){
        cameraControl.yZeroLimit = e;
        cameraControl.update();
    }

    this.changeRenderStyle = function(style){
        renderStyle = style;

        voluMesh.material = materials[style];
        tempBox.material = materials[style];

        //console.log("voluMesh" , voluMesh);
        //console.log("tempBox" , tempBox);

        console.log("ambientLight= ",ambientLight);
        if(style === 0){
          //  ambientLight.color = {r:1,g:1,b:1};
            //ambientLight.intensity = 2.0

        }else{
           // ambientLight.color = {r:0.2,g:0.2,b:0.2};
           // ambientLight.color = 0x666666;
        //    ambientLight.intensity = 2.0
        }

       /* if(style===1){
            light.visible = true;
        }else{
            light.visible = false;
        }*/


    };
    //SET VIDEO POSITION
    this.setPosition = function(val){

        const cVideo =  holoVideo.hvo.videoElements[0];
        cVideo.pause();

        cVideo.currentTime = cVideo.duration*val;

        cVideo.playing = false;


     /*   cVideo.style.position = "absolute";
        cVideo.style.height = "50%";
        document.body.appendChild(cVideo)*/
       // cVideo.pause();
       // cVideo.currentTime = cVideo.duration*val;
     //   console.log(cVideo.duration, cVideo.duration*val);
      //  holoVideo.update();
    };

    function genCubeUrls ( obj ) {


        const prefix = obj.path;
        const postfix = obj.imageType;

        let ret = [];

        if(obj.negPatt) {
            const neg = obj.negPatt;
            const pos = obj.posPatt;

            ret = [
                prefix + pos + 'x' + postfix, prefix + neg + 'x' + postfix,
                prefix + pos + 'y' + postfix, prefix + neg + 'y' + postfix,
                prefix + pos + 'z' + postfix, prefix + neg + 'z' + postfix
            ];
        }else{
            ret = [
                prefix  + obj.right + postfix,
                prefix  + obj.left + postfix,
                prefix  + obj.up + postfix,
                prefix  + obj.down + postfix,
                prefix  + obj.front+ postfix,
                prefix  + obj.back+ postfix,
            ]
        }

        return ret;

    };

    function getMaxMetalness(val){
        const metalnessApprox=[0,1,1,1,1,1,1,1];
        const k = val/100;
        const stepW = 1/(metalnessApprox.length-1);
        const stepId = Math.floor(k/stepW);
        const stepFract = (k - stepId * stepW)/stepW;
        const i2 = Math.max(Math.min(stepId+1, metalnessApprox.length-1),0);
        const metalness = (metalnessApprox[stepId] + (metalnessApprox[i2] - metalnessApprox[stepId])*stepFract)
        return metalness;

    }

    this.setEnvIntensity = function(val){
        envMapIntesity = val;
        if(materials[0]) {
            materials[0].envMapIntensity = envMapIntesity;
        }
        materials[1].envMapIntensity = envMapIntesity;
        materials[1].metalness = getMaxMetalness(val)*_metalness;
        if(initObj.onEnvIntForMetalnessChanged){
            initObj.onEnvIntForMetalnessChanged(materials[1].metalness);
        }
    }


    //envMapIntesity
    let envCubeTexture;
    let currentEnvModel = null;
    let modelLoading = false;
    let bgLoading = false;
    let modelEnviroment = false;


    function applyCubeTexture(){
        scene.background =  envCubeTexture;
        materials[1].envMap = envCubeTexture;
        if(materials[0]) {
            materials[1].map = materials[0].map;
        }

        if(renderStyle === 1) {
            voluMesh.material = materials[1];
        }
    }

    function onLoadEnvTexture(cubeTexture){
        envCubeTexture = cubeTexture;
        envCubeTexture.encoding = THREE.sRGBEncoding;
        bgLoading = false;
        console.log("ON TXT LOADED", modelEnviroment, bgLoading, modelLoading);
        if(modelEnviroment){
            if(!bgLoading && !modelLoading){

                applyCubeTexture();
                applyModelEviroment();
                initObj.onEnvLoaded ? initObj.onEnvLoaded() : null;
            }
        }else{
            applyCubeTexture();
            initObj.onEnvLoaded ? initObj.onEnvLoaded() : null;
        }

    }


    function removeOldEnvModel(){
        if(currentEnvModel){
            scene.remove(currentEnvModel);
            currentEnvModel = null;
        }
    }

    function applyModelEviroment(){
        //  currentEnvModel.name = "gltfEnv";
        scene.add(currentEnvModel);
    }

    function onGLTFModelLoaded(gltf){
        modelLoading = false;
        currentEnvModel = gltf.scene;
        console.log("ON GLTF LOADED", modelEnviroment, bgLoading, modelLoading);
        if(modelEnviroment){
            if(!bgLoading && !modelLoading){

                applyCubeTexture();
                applyModelEviroment();
                initObj.onEnvLoaded ? initObj.onEnvLoaded() : null;
            }

        }



      //  currentEnvModel.name = "gltfEnv";


    }

    function loadGLTFEnv(obj){

        const loader = new THREE.GLTFLoader();//.setPath( 'models/AstonMartin/' );
        loader.load( obj.modelpath, onGLTFModelLoaded);
        loadCubePath(obj);
        console.log("ENV - PARAMS : ",obj)
        modelLoading = true;
        bgLoading = true;

    }

    function loadCubePath(obj){
        const loader = new THREE.CubeTextureLoader();
        loader.load(genCubeUrls(obj), onLoadEnvTexture )

    }
    function loadCubeSame(obj){
        const loader = new THREE.CubeTextureLoader();
        loader.load([obj.img,obj.img,obj.img,obj.img,obj.img,obj.img], onLoadEnvTexture )

    }

    this.setEnviroment = function(obj){
        if(obj.type === "none" ){
            gridHelper.visible = true;
            scene.background = null;
            return false;
        }else{
            gridHelper.visible = false;
        }

        if(obj.gridmode === true){
            gridHelper.visible = true;
            scene.background = null;
        }else{
            gridHelper.visible = false;
        }
        removeOldEnvModel();
        scene.background = new THREE.Color("rgb(90, 90, 90)");;

        if(obj.type === "cube-allsame"){
            modelEnviroment = false;
            loadCubeSame(obj.settings)
        }else if(obj.type === "cube-path"){
            modelEnviroment = false;
            loadCubePath(obj.settings);
        }else if(obj.type === "gltf-model"){
            modelEnviroment = true;
            loadGLTFEnv(obj.settings);

        }
        return true;

    };

    function onVideoLoadingProgress(e){
        if(initObj.onVideoLoading){
            initObj.onVideoLoading(holoVideo.hvo.getLoadProgress());
            //console.log("progress = ",e,  holoVideo.hvo.getLoadProgress());
        }
       // console.log(e);
    }

    function onVideoCanPlay(e){
        console.log("CAN PLAY" , e);
        if(initObj.onVideoCanPlay){
            initObj.onVideoCanPlay(e);
        }
    }

    function onVideoStartsPlay(e){
        console.log("STARTS PLAY" , e);
        if(initObj.onVideoStartsPlay){
            initObj.onVideoStartsPlay(e)
        }
    }

    function onVideoTimeUpdate(e){
        if(initObj.onVideoTimeUpdate){
            initObj.onVideoTimeUpdate(e);
        }


    }

    function onVoluReady(mesh){
        if(holoVideoState != HoloVideoState.ReadyToPlay){
        //    holoVideo.hvo.videoElements[0].addEventListener("progress",onVideoLoadingProgress)
            holoVideo.hvo.videoElements[0].addEventListener("progress",onVideoLoadingProgress);
            holoVideo.hvo.videoElements[0].addEventListener("loadeddata",onVideoLoadingProgress);
            holoVideo.hvo.videoElements[0].addEventListener("loadedmetadata",onVideoLoadingProgress);
            holoVideo.hvo.videoElements[0].addEventListener("canplay",onVideoCanPlay);
            holoVideo.hvo.videoElements[0].addEventListener("playing",onVideoStartsPlay);
            holoVideo.hvo.videoElements[0].addEventListener("timeupdate",onVideoTimeUpdate);




            holoVideoState = HoloVideoState.ReadyToPlay;
            if(initObj.onDataReady){
                initObj.onDataReady(holoVideo.hvo);
            }
            currentFrame =0;
            prevFrame =0;
            voluMesh = mesh;

          //  voluMesh.computeVertexNormals();

        }
        tempBox.visible = true;


        console.log("mesh-", mesh);
        materials[0] = mesh.material;
        materials[1].map = materials[0].map;
        tempBox.material = materials[0];
        voluMesh.material = materials[1];

        voluMesh.castShadow = true;
       // voluMesh.receiveShadow = true;
        //voluBaseMatarial.wireframe = true;


        var scale = 1/1000;
        mesh.scale.set(-scale, scale, scale);



        scene.add(mesh);

        //changedRenderStyle(RenderStyle.Normals)
    }

    function rewind(){
        holoVideo.rewind();
    }

    function play(){
        console.log("PLAY");
        holoVideo.play();
    }

    function pause(){
        console.log("PAUSE");
        holoVideo.pause()
    }

    function onHoloVideoLoaded(){
        console.log("holo loaded");

    }

    this.getHoloVideo = function(){
        return holoVideo;
    }
    function loadVolucapMesh(path){
        if(!holoVideo) {
            holoVideo = new HoloVideoObjectThreeJS(
                renderer,
                onVoluReady
            );
            //holoVideo.hvo.logLevel = 3;
           // holoVideo.hvo.onLoaded = onHoloLoaded;
        }


        holoVideo.open(path, {autoloop:true, audioEnabled:true, autoplay:true});
        holoVideoState = HoloVideoState.LoadingJsonData;
        console.log(holoVideo);

    }

    var light;
    var ambientLight;


    this.setLightIntensity = function(val){
        lightsIntensity = val;
        light.intensity =lightsIntensity;
    }

    this.setLightPosition = function(val){
        const ang = val/100*Math.PI*2;
        light.position.x = Math.cos(ang)*10;
        light.position.z = Math.sin(ang)*10;

    }



    function addLights(){

        ambientLight = new THREE.AmbientLight( 0xFFFFFF);	// 0.2

        scene.add(ambientLight);

//        light = new THREE.DirectionalLight( 0xFFFFFF, 10.0 );

        light = new THREE.DirectionalLight( 0xffffff, lightsIntensity );
        light.position.set( 10, 10, 10 );
        scene.add( light );

        // light = new THREE.PointLight(0xFFFFFF,1, false);
        //  light.position.set( 1, 1, 1 );

        light.visible = true;//false;
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;

        const d = 2;
        light.shadow.camera.left = - d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = - d;

        light.shadow.camera.far = 3500;
        light.shadow.bias = + 0.0001;

        light.shadow.radius = 2;


        /*lightProbe = new THREE.LightProbe();
        lightProbe.intensity = 10;
        scene.add( lightProbe );*/
    }

    this.setShadowOpacity = function(val){
        ground.material.opacity = val;
    }

    this.setSahdowSoftness = function(val){
        light.shadow.radius = val;
    }
    function addGround(){
        // GROUND

        const groundGeo = new THREE.PlaneBufferGeometry( 10, 10 );
        //const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        const groundMat = new THREE.ShadowMaterial( { color: 0x000000 } );
        groundMat.opacity = 0.5;


        //groundMat.color.setHSL( 0.095, 1, 0.75 );
//        groundMat.color.setHSL( 0.095, 1, 0.75 );

        ground = new THREE.Mesh( groundGeo, groundMat );;
        ground.rotation.x = - Math.PI / 2;
        ground.position.y = 0.01;
        ground.receiveShadow = true;
        scene.add( ground );
    }

    var gridHelper;
    function buildScene(){
     //   camera.position.set(0, 300, 800);
        camera.position.set(0, 1 , 2);
        var size = 4;
        var divisions = 20;
        var colorCenterLine = 0x666666;
        var colorGrid = 0x111111;
        gridHelper = new THREE.GridHelper( size, divisions,colorCenterLine, colorGrid );
        scene.add( gridHelper );


        cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
        cameraControl.center.set(0,0.7,0);
        //cameraControl.minDistance = 600;
        //cameraControl.maxDistance = 1400;
        cameraControl.screenSpacePanning = true;
        cameraControl.update();
        addGround();
    }




    function createBufferedMesh(){
        var geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
        var vertices = new Float32Array( [
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ] );

// itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var mesh = new THREE.Mesh( geometry, material );
        console.log(mesh);
        return mesh;
    }



    // Only trying to make it clear most vertices are unique
    const vertices = [
        // front
        { pos: [-1, -1,  1], norm: [ 0,  0,  1], uv: [0, 1], },
        { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },

        { pos: [-1,  1,  1], norm: [ 0,  0,  1], uv: [0, 0], },
        { pos: [ 1, -1,  1], norm: [ 0,  0,  1], uv: [1, 1], },
        { pos: [ 1,  1,  1], norm: [ 0,  0,  1], uv: [1, 0], },
        // right
        { pos: [ 1, -1,  1], norm: [ 1,  0,  0], uv: [0, 1], },
        { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
        { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },

        { pos: [ 1,  1,  1], norm: [ 1,  0,  0], uv: [0, 0], },
        { pos: [ 1, -1, -1], norm: [ 1,  0,  0], uv: [1, 1], },
        { pos: [ 1,  1, -1], norm: [ 1,  0,  0], uv: [1, 0], },
        // back
        { pos: [ 1, -1, -1], norm: [ 0,  0, -1], uv: [0, 1], },
        { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
        { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },

        { pos: [ 1,  1, -1], norm: [ 0,  0, -1], uv: [0, 0], },
        { pos: [-1, -1, -1], norm: [ 0,  0, -1], uv: [1, 1], },
        { pos: [-1,  1, -1], norm: [ 0,  0, -1], uv: [1, 0], },
        // left
        { pos: [-1, -1, -1], norm: [-1,  0,  0], uv: [0, 1], },
        { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
        { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },

        { pos: [-1,  1, -1], norm: [-1,  0,  0], uv: [0, 0], },
        { pos: [-1, -1,  1], norm: [-1,  0,  0], uv: [1, 1], },
        { pos: [-1,  1,  1], norm: [-1,  0,  0], uv: [1, 0], },
        // top
        { pos: [ 1,  1, -1], norm: [ 0,  1,  0], uv: [0, 1], },
        { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
        { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },

        { pos: [ 1,  1,  1], norm: [ 0,  1,  0], uv: [0, 0], },
        { pos: [-1,  1, -1], norm: [ 0,  1,  0], uv: [1, 1], },
        { pos: [-1,  1,  1], norm: [ 0,  1,  0], uv: [1, 0], },
        // bottom
        { pos: [ 1, -1,  1], norm: [ 0, -1,  0], uv: [0, 1], },
        { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
        { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },

        { pos: [ 1, -1, -1], norm: [ 0, -1,  0], uv: [0, 0], },
        { pos: [-1, -1,  1], norm: [ 0, -1,  0], uv: [1, 1], },
        { pos: [-1, -1, -1], norm: [ 0, -1,  0], uv: [1, 0], },
    ];

    function getBuffGeometry(){
        const positions = [];
        const normals = [];
        const uvs = [];
        for (const vertex of vertices) {
            positions.push(...vertex.pos);
            uvs.push(...vertex.uv);
        }

        const geometry = new THREE.BufferGeometry();
        const positionNumComponents = 3;
        const normalNumComponents = 3;
        const uvNumComponents = 2;
        geometry.addAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
       /* geometry.setAttribute(
            'normal',
            new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));*/
        geometry.addAttribute(
            'uv',
            new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

        geometry.computeVertexNormals();
        //geometry.computeFaceNormals();

        return geometry;

    }


    const loader = new THREE.TextureLoader();


    function makeInstance(geometry) {
        const material = new THREE.MeshPhongMaterial({color:0xFF0000});

        const cube = new THREE.Mesh(geometry, material);
        //scene.add(cube);

        //cube.position.x = x;
        return cube;
    }


    //    makeInstance(geometry, 0x88FF88,  0),
    function getBlankTexture(width,height, color){


        const size = width * height;
        const data = new Uint8Array( 3 * size );

        const r = 255;//Math.floor( color.r * 255 );
        const g = 255;//Math.floor( color.g * 255 );
        const b = 255;//Math.floor( color.b * 255 );

        for ( let i = 0; i < size; i ++ ) {

            const stride = i * 3;

            data[ stride ] = r;
            data[ stride + 1 ] = g;
            data[ stride + 2 ] = b;

        }

// used the buffer to create a DataTexture

        return new THREE.DataTexture( data, width, height, THREE.RGBFormat );
    }

    let defaultEnvMap;
    this.setExsposure = function(val){
        exposure =  val;
        renderer.toneMappingExposure = exposure;
    }

    this.setMetalness = function(val){
        _metalness = val;
        materials[1].metalness = val;
    }

    this.setDOFPower = function(val){
        postprocessing.bokeh.uniforms[ "maxblur" ].value = 0.02;
        postprocessing.bokeh.uniforms[ "aperture" ].value = val/20.0;

    }

    function initPostprocessing() {

        const renderPass = new THREE.RenderPass( scene, camera );
        console.log("INIT POSTPROCESSING");

        const bokehPass = new THREE.BokehPass( scene, camera, {
            focus: 1.0,
            aperture: 0.025/10,
            maxblur: 0.01,

            width:domObj.clientWidth,
            height:domObj.clientHeight,
        } );



        const composer = new THREE.EffectComposer( renderer );

        composer.renderTarget1.texture.encoding = THREE.sRGBEncoding;
        composer.renderTarget2.texture.encoding = THREE.sRGBEncoding;

        composer.addPass( renderPass );
        composer.addPass( bokehPass );

        postprocessing.composer = composer;
        postprocessing.bokeh = bokehPass;

        console.log("COMPOSER-----------", composer);
        /*postprocessing.bokeh.uniforms[ "focus" ].value = effectController.focus;
        postprocessing.bokeh.uniforms[ "aperture" ].value = effectController.aperture * 0.00001;
        postprocessing.bokeh.uniforms[ "maxblur" ].value = effectController.maxblur;*/

    }

    function init() {

        var materialColor = new THREE.Color();
        materials = [];
        materialColor.setRGB( 1.0, 1.0, 1.0 );
        defaultEnvMap = loader.load('images/volucapplayer/white_small.jpg');///;getBlankTexture( 32, 32, {r:1, g:1, b:1});

        //materials[1] = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
        materials[1] = new THREE.MeshStandardMaterial({
      //  materials[1] = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 1,
            //combine: THREE.AddOperation,
            envMapIntensity: envMapIntesity,
            envMap: defaultEnvMap,

        });

        self.setEnvIntensity(envMapIntesity);

        materials[2] = new THREE.MeshPhongMaterial( { color: 0x777777 } );;
        materials[3] = new THREE.MeshNormalMaterial();
        materials[4] =  new THREE.MeshBasicMaterial( { color: 0xFFFFFF} );

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 30 );
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x333333 );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
      //  renderer.gammaOutput = true;
        renderer.toneMappingExposure = exposure;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.LinearToneMapping;
        //renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.gammaFactor = 2.2;

        domObj.appendChild( renderer.domElement);


        tempBox = makeInstance(getBuffGeometry() );
        tempBox.scale.set(0.1,0.1,0.1);
     //   tempBox.receiveShadow = true;
        tempBox.castShadow = true;
        tempBox.position.y = 0.1;
        //tempBox.visible = false;

      //  scene.add( tempBox );

      //  defaultEnvMap.encoding = THREE.sRGBEncoding;
      //  scene.background = defaultEnvMap;
        window.addEventListener( 'resize', onWindowResize, false );

        buildScene();
        addLights();
        initPostprocessing();
        onWindowResize();

    }

    function animate() {

        requestAnimationFrame( animate );

        if(holoVideoState === HoloVideoState.ReadyToPlay){
            if(prevFrame !==  holoVideo.hvo.currentFrameInfo.frameIndex){
                prevFrame = holoVideo.hvo.currentFrameInfo.frameIndex;
                onVideoProgress();
            }

        }
        if(holoVideo) {
            holoVideo.update();
        }

        if(initObj.onCameraChanged){
            initObj.onCameraChanged(cameraControl.getState());
        }

        if(autoFocus){
            postprocessing.bokeh.uniforms[ "focus" ].value = cameraControl.getDistance();
            if(initObj.onCameraDistanceChanged){
                initObj.onCameraDistanceChanged(cameraControl.getDistance());
            }
        }else{
            postprocessing.bokeh.uniforms[ "focus" ].value = focusDistance;
        }

   /*     var dt = performance.now()/1000;
        light.position.set(Math.cos(dt)*2, (Math.cos(dt/2)+1)*2 ,Math.sin(dt));*/
        if( postprocessing.bokeh.uniforms[ "aperture" ].value >0){

            postprocessing.composer.render( 0.1 );
        }else{
            renderer.render( scene, camera );
        }
    }
    init();
    animate();

    /* assign -global methods */
    this.loadVolucapMesh = loadVolucapMesh;
    this.play = play;
    this.pause = pause;
    this.rewind = rewind;
}