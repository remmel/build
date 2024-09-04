const VolucapStateFileds={
    CurrentFrame:"cf",
    EnviromentObj:"env",
    Camera:"cam",
    ShadowOpacity:"sh_o",
    ShadowSmothness:"sh_s",
    LightIntencity:"l_i",
    LightDirection:"l_d",
    MaterisalID:"mtl_id",
    MaterailMetalness:"mtl_m",
    MaterailEnvIntensity:"mtl_e",
    FilePath:"f",
    SceneExposure:"exp",
    CameraDistanceRange:"c_d",
    CameraAzimuthMin:"c_a_mn",
    CameraAzimuthMax:"c_a_mx",
    CameraPolarRange:"c_p",
    CameraFloorZeroLimit:"c_y0",
    DOF_Power:"Dp"
};

const VolucapSettings = {
    enviromentImages:[
        {type:"cube-allsame", gridmode:true, thumb:"images/env/no_env.jpg",settings:{img:"images/volucapplayer/white_small.jpg"}},
		/*
        {type:"cube-path", thumb:"images/env/1/front.jpg",settings:{path:"images/env/1/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
        {type:"cube-path", thumb:"images/env/2/front.jpg",settings:{path:"images/env/2/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
        {type:"cube-path", thumb:"images/env/3/front.jpg",settings:{path:"images/env/3/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
        {type:"cube-path", thumb:"images/env/4/front.jpg",settings:{path:"images/env/4/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
        {type:"cube-path", thumb:"images/env/5/front.jpg",settings:{path:"images/env/5/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
        {type:"cube-path", thumb:"images/env/6/front.jpg",settings:{path:"images/env/6/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
		{type:"cube-path", thumb:"images/env/7/front.jpg",settings:{path:"images/env/7/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front"}},
		*/
		{type:"gltf-model", thumb:"images/env/Basketball_Court/cube/back.jpg", settings:{modelpath:"images/env/Basketball_Court/basketball_court.gltf", path:"images/env/Basketball_Court/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
        {type:"cube-path", thumb:"images/env/Bridge/negz.jpg", settings:{path:"images/env/Bridge/", imageType:".jpg", negPatt:"neg", posPatt:"pos"}},
		{type:"gltf-model", thumb:"images/env/Dresden/cube/front.jpg", settings:{modelpath:"images/env/Dresden/Dresden_02.gltf", path:"images/env/Dresden/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
		{type:"gltf-model", thumb:"images/env/Khayiminga_Temple/cube/front.jpg", settings:{modelpath:"images/env/Khayiminga_Temple/khayiminga_temple.gltf", path:"images/env/Khayiminga_Temple/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
        {type:"gltf-model", thumb:"images/env/ModernBldNight/cube/front.jpg", settings:{modelpath:"images/env/ModernBldNight/ModernBldNight.gltf", path:"images/env/ModernBldNight/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
        {type:"gltf-model", thumb:"images/env/Muenster/cube/front.jpg", settings:{modelpath:"images/env/Muenster/Muenster.gltf", path:"images/env/Muenster/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
        {type:"gltf-model", thumb:"images/env/OldBusDepot/cube/front.jpg", settings:{modelpath:"images/env/OldBusDepot/OldBusDepot.gltf", path:"images/env/OldBusDepot/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
        {type:"cube-path", thumb:"images/env/Park/posx.jpg" , settings:{path:"images/env/Park/", imageType:".jpg", negPatt:"neg", posPatt:"pos"}},
        {type:"cube-path", thumb:"images/env/Skybox_Sun/nx.jpg",settings:{path:"images/env/Skybox_Sun/", imageType:".jpg", negPatt:"n", posPatt:"p"}},
        {type:"cube-path", thumb:"images/env/SwedishRoyalCastle/nx.jpg",settings:{path:"images/env/SwedishRoyalCastle/", imageType:".jpg", negPatt:"n", posPatt:"p"}},
        {type:"gltf-model", thumb:"images/env/VignaioliNight/cube/front.jpg", settings:{modelpath:"images/env/VignaioliNight/VignaioliNight.gltf", path:"images/env/VignaioliNight/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
        {type:"gltf-model", thumb:"images/env/Volucap_Studio/cube/front.jpg", settings:{modelpath:"images/env/Volucap_Studio/Volucap_Studio.gltf", path:"images/env/Volucap_Studio/cube/", imageType:".jpg", left:"left" , right:"right" , up:"up" , down:"down" , back:"back" , front:"front" }},
		
    ],

    defaultSettings: {}
}



VolucapSettings.defaultSettings[VolucapStateFileds.CurrentFrame] = 0;
VolucapSettings.defaultSettings[VolucapStateFileds.EnviromentObj] = 0;
VolucapSettings.defaultSettings[VolucapStateFileds.ShadowOpacity] = 0.2;
VolucapSettings.defaultSettings[VolucapStateFileds.ShadowSmothness] = 2;
VolucapSettings.defaultSettings[VolucapStateFileds.LightIntencity] = 0;
VolucapSettings.defaultSettings[VolucapStateFileds.LightDirection] = 100/8;
VolucapSettings.defaultSettings[VolucapStateFileds.MaterisalID] = 0;
VolucapSettings.defaultSettings[VolucapStateFileds.MaterailMetalness] = 1;
VolucapSettings.defaultSettings[VolucapStateFileds.MaterailEnvIntensity] = 30;
VolucapSettings.defaultSettings[VolucapStateFileds.SceneExposure] = 1;
VolucapSettings.defaultSettings[VolucapStateFileds.CameraDistanceRange] = [0.5,5];
VolucapSettings.defaultSettings[VolucapStateFileds.CameraAzimuthMin] = -Math.PI;
VolucapSettings.defaultSettings[VolucapStateFileds.CameraAzimuthMax] = Math.PI;
VolucapSettings.defaultSettings[VolucapStateFileds.CameraPolarRange] = [0,Math.PI];
VolucapSettings.defaultSettings[VolucapStateFileds.CameraFloorZeroLimit] = false;
VolucapSettings.defaultSettings[VolucapStateFileds.DOF_Power] = 0;





