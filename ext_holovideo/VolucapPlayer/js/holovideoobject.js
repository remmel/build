var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.createTemplateTagFirstArg = function (a) {
    return a.raw = a
};
$jscomp.createTemplateTagFirstArgWithRaw = function (a, c) {
    a.raw = c;
    return a
};
$jscomp.ASSUME_ES5 = false;
$jscomp.ASSUME_NO_NATIVE_MAP = false;
$jscomp.ASSUME_NO_NATIVE_SET = false;
$jscomp.SIMPLE_FROUND_POLYFILL = false;
$jscomp.ISOLATE_POLYFILLS = false;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[c] = b.value;
    return a
};
$jscomp.getGlobal = function (a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var c = 0; c < a.length; ++c) {
        var b = a[c];
        if (b && b.Math == Math) return b
    }
    throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
$jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
$jscomp.polyfills = {};
$jscomp.propertyToPolyfillSymbol = {};
$jscomp.POLYFILL_PREFIX = "$jscp$";
var $jscomp$lookupPolyfilledValue = function (a, c) {
    var b = $jscomp.propertyToPolyfillSymbol[c];
    if (null == b) return a[c];
    b = a[b];
    return undefined !== b ? b : a[c]
};
$jscomp.polyfill = function (a, c, b, f) {
    c && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, c, b, f) : $jscomp.polyfillUnisolated(a, c, b, f))
};
$jscomp.polyfillUnisolated = function (a, c, b, f) {
    b = $jscomp.global;
    a = a.split(".");
    for (f = 0; f < a.length - 1; f++) {
        var e = a[f];
        if (!(e in b)) return;
        b = b[e]
    }
    a = a[a.length - 1];
    f = b[a];
    c = c(f);
    c != f && null != c && $jscomp.defineProperty(b, a, {configurable: !0, writable: !0, value: c})
};
$jscomp.polyfillIsolated = function (a, c, b, f) {
    var e = a.split(".");
    a = 1 === e.length;
    f = e[0];
    f = !a && f in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
    for (var g = 0; g < e.length - 1; g++) {
        var d = e[g];
        if (!(d in f)) return;
        f = f[d]
    }
    e = e[e.length - 1];
    b = $jscomp.IS_SYMBOL_NATIVE && "es6" === b ? f[e] : null;
    c = c(b);
    null != c && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {
        configurable: !0,
        writable: !0,
        value: c
    }) : c !== b && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e =
        $jscomp.propertyToPolyfillSymbol[e], $jscomp.defineProperty(f, e, {configurable: !0, writable: !0, value: c})))
};
$jscomp.polyfill("Object.is", function (a) {
    return a ? a : function (c, b) {
        return c === b ? 0 !== c || 1 / c === 1 / b : c !== c && b !== b
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function (a) {
    return a ? a : function (c, b) {
        var f = this;
        f instanceof String && (f = String(f));
        var e = f.length;
        b = b || 0;
        for (0 > b && (b = Math.max(b + e, 0)); b < e; b++) {
            var g = f[b];
            if (g === c || Object.is(g, c)) return !0
        }
        return false
    }
}, "es7", "es3");
$jscomp.checkStringArgs = function (a, c, b) {
    if (null == a) throw new TypeError("The 'this' value for String.prototype." + b + " must not be null or undefined");
    if (c instanceof RegExp) throw new TypeError("First argument to String.prototype." + b + " must not be a regular expression");
    return a + ""
};
$jscomp.polyfill("String.prototype.includes", function (a) {
    return a ? a : function (c, b) {
        return -1 !== $jscomp.checkStringArgs(this, c, "includes").indexOf(c, b || 0)
    }
}, "es6", "es3");

var HoloVideoObject = function (gl, options) {
    this.id = HoloVideoObject._instanceCounter++;
    this.state = HoloVideoObject.States.Empty;
    this.suspended = false;
    this.gl = gl;
    this.logLevel = 1;
    this.audioVolume = 1;

    canvas ? (this.createOptions = canvas, 2 > canvas.numAsyncFrames && (this._logWarning("numAsyncFrames must be at least 2 (" + canvas.numAsyncFrames + " specified)"), this.createOptions.numAsyncFrames = 2)) : this.createOptions = {};

    this.createOptions.numAsyncFrames || (this.createOptions.numAsyncFrames = 3);
    document.addEventListener("visibilitychange", function () {
        document.hidden ?
            (this.wasPlaying = this.state == HoloVideoObject.States.Playing, this._logInfo("document hidden -> pausing playback"), this.pause()) : this.wasPlaying && (this.wasPlaying = false, this._logInfo("document visible -> resuming playback"), this.play())
    }.bind(this));

    var canvas = gl.canvas;
    canvas.addEventListener("webglcontextlost", function (b) {
        this.contextLost = !0;
        this.wasPlaying = this.state == HoloVideoObject.States.Playing;
        this.pause();
        this._logInfo("webglcontextlost -> pausing playback");
        this._releaseWebGLResources(gl)
    }.bind(this), false);

    canvas.addEventListener("webglcontextrestored",
        function (b) {
            this._initializeWebGLResources(this.gl);
            if (this.json && this.outputBuffers) {
                b = this.json.extensions[HoloVideoObject._extName];
                for (var f = this.gl, e = f.getParameter(f.ARRAY_BUFFER_BINDING), g = 0; 3 > g; ++g) f.bindBuffer(f.ARRAY_BUFFER, this.outputBuffers[g]), f.bufferData(f.ARRAY_BUFFER, 12 * b.maxVertexCount, f.STREAM_COPY);
                f.bindBuffer(f.ARRAY_BUFFER, e)
            }
            this.contextLost = false;
            this.wasPlaying && (this.wasPlaying = false, this._logInfo("webglcontextrestored -> resuming playback"), this.play())
        }.bind(this), false);

    console.log("HoloVideoObject version " + HoloVideoObject.Version.String);

    this._initializeWebGLResources(gl)
};
HoloVideoObject.prototype._createProgram = function (gl, vertexShaderSource, fragmentShaderSource, preLink) {
    function _createShader(gl, source, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader
    }

    var program = gl.createProgram();
    var vshader = _createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    gl.attachShader(program, vshader);
    gl.deleteShader(vshader);

    var fshader = _createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    gl.attachShader(program, fshader);
    gl.deleteShader(fshader);

    if(preLink)
        preLink(program);
    gl.linkProgram(program);

    var log
    (log = gl.getProgramInfoLog(program)) && this._logError(log);
    (log = gl.getShaderInfoLog(vshader)) && this._logError(log);
    (log = gl.getShaderInfoLog(fshader)) && this._logError(log);
    return program
};

HoloVideoObject.prototype._loadJSON = function (src, callback) {
    var xobj = new XMLHttpRequest;
    xobj.overrideMimeType("application/json");
    xobj.open("GET", src, !0);
    xobj.onreadystatechange = function () {
        4 == xobj.readyState && "200" == xobj.status && callback(xobj.responseText, this)
    };
    xobj.send(null);
    return xobj.responseText
};
HoloVideoObject.prototype._loadArrayBuffer = function (url, callback) {
    var xobj = new XMLHttpRequest;
    xobj.name = url.substring(url.lastIndexOf("/") + 1, url.length);
    xobj.responseType = "arraybuffer";
    xobj.onprogress = function (f) {
        f.lengthComputable && this._logInfo(xobj.name + " progress: " + Math.floor(f.loaded / f.total * 100))
    }.bind(this);
    xobj.onreadystatechange = function () {
        if (4 == xobj.readyState) {
            if ("200" == xobj.status) {
                var arrayBuffer = xobj.response;
                if(arrayBuffer && callback)
                    callback(arrayBuffer)
            } else {
                this._logInfo("_loadArrayBuffer status = " + xobj.status);
            }
            if(this.httpRequest == xobj)
                this.httpRequest = null
        }
    }.bind(this);
    xobj.ontimeout = function () {
        this._logInfo("_loadArrayBuffer timeout")
    };
    xobj.open("GET", url, !0);
    xobj.send(null);
    this.httpRequest = xobj
};
HoloVideoObject.prototype._startPlaybackIfReady = function () {
    this.state == HoloVideoObject.States.Opening && this.buffersLoaded >= this.minBuffers && this.videosLoaded >= this.minVideos && (this._logInfo("state -> Opened"), this.state = HoloVideoObject.States.Opened, this.openOptions.autoplay && this.play());
    if (this.suspended) {
        var a = this.json.extensions[HoloVideoObject._extName].timeline;
        a = this.json.images[a[this.currentVideoIndex].image];
        a = a.video;
        !a.paused && a.playing || !a.preloaded || (this._logInfo("video " + a.mp4Name +
            " was suspended, resuming"), this.suspended = false, a.play())
    } else this.state == HoloVideoObject.States.Playing && (a = this.json.extensions[HoloVideoObject._extName].timeline, a = this.json.images[a[this.currentVideoIndex].image], a = a.video, a.playing || a.play())
};
HoloVideoObject.prototype._loadNextBuffer = function () {
    if (0 == this.freeArrayBuffers.length) {
        this._logInfo("_loadNextBuffer no free buffer slot available");
    } else {
        var bufferIndex = this.nextBufferLoadIndex;
        this.nextBufferLoadIndex = (this.nextBufferLoadIndex + 1) % this.json.buffers.length;

        if(this.fallbackFrameBuffer && 0 == this.nextBufferLoadIndex)
            this.nextBufferLoadIndex = 1

        var buffer = this.json.buffers[bufferIndex]
        var bufferUrl = this.urlRoot + buffer.uri;
        buffer.loaded = false;

        var arrayBufferIndex = -1;

        if(0 == bufferIndex)
            this._logInfo("loading preview frame buffer")
        else {
            arrayBufferIndex = this.freeArrayBuffers.shift()
            this._logInfo("loading buffer: " + buffer.uri + " into slot " + arrayBufferIndex)
        }

        this.pendingBufferDownload = !0;
        this._loadArrayBuffer(bufferUrl, function (arrayBuffer) {
            console.log(arrayBuffer, this.buffers, arrayBufferIndex)
            this._logInfo("buffer loaded: " + buffer.uri);
            if (this.fallbackFrameBuffer || this.filledFallbackFrame) {
                ++this.buffersLoaded
                this.buffers[arrayBufferIndex] = arrayBuffer
                arrayBuffer.bufferIndex = bufferIndex
                buffer.arrayBufferIndex = arrayBufferIndex
                buffer.loaded = true
                this.needMeshData = this.pendingBufferDownload = false
                this._startPlaybackIfReady()
                this._loadNextBuffer()
            } else {
                this._logInfo("fallback frame buffer downloaded " + buffer.uri)
                this.fallbackFrameBuffer = arrayBuffer
                this._loadNextBuffer()
                this.pendingBufferDownload = false
            }
        }.bind(this))
    }
};
HoloVideoObject.prototype._loadNextVideo = function () {
    if (this.freeVideoElements.length) {
        var videoElementIndex = this.freeVideoElements.shift()
        var video = this.videoElements[videoElementIndex];
        video.videoElementIndex = videoElementIndex;
        var videoIndex = this.nextVideoLoadIndex;
        var numVideos = this.json.extensions[HoloVideoObject._extName].timeline.length;
        this.nextVideoLoadIndex = (this.nextVideoLoadIndex + 1) % numVideos;
        var image = this.json.images[this.json.extensions[HoloVideoObject._extName].timeline[videoIndex].image];

        image.video = video;
        video.preloaded = false;

        video.autoplay = false;
        video.muted = this.openOptions.autoplay || !this.openOptions.audioEnabled;

        if(this.isSafari) video.muted = true

        video.loop = 1 == numVideos && this.openOptions.autoloop;
        video.preload = "auto";
        video.crossOrigin = "use-credentials";
        video.playing = false;
        video.preloaded = false;

        image.uri.split(".").pop();
        var imageExt = image.extensions[HoloVideoObject._extName];

        undefined === this.openOptions.streamMode && (this.openOptions.streamMode = HoloVideoObject.StreamMode.Automatic);
        if (this.openOptions.streamMode == HoloVideoObject.StreamMode.HLS || this.openOptions.streamMode == HoloVideoObject.StreamMode.Automatic && this.isSafari && imageExt.hlsUri && (!this.iOSVersion || 14 > this.iOSVersion.major)) video.src =
            this.urlRoot + imageExt.hlsUri, video.mp4Name = imageExt.hlsUri; else if (this.openOptions.streamMode == HoloVideoObject.StreamMode.Dash || this.openOptions.streamMode == HoloVideoObject.StreamMode.Automatic && !this.isSafari && imageExt.dashUri && "undefined" != typeof dashjs) {
            this.dashPlayer || (this.dashPlayer = dashjs.MediaPlayer().create(), this.dashPlayer.initialize());
            var f = this.urlRoot + imageExt.dashUri;
            this.dashPlayer.attachView(video);
            this.dashPlayer.attachSource(f);
            video.mp4Name = imageExt.dashUri
        } else f = this.urlRoot + image.uri, video.src = f, video.mp4Name = image.uri;
        this._logInfo("loading video " + video.mp4Name);

        var hvo = this;
        video.addEventListener("canplay", function () {
            hvo.videoState = HoloVideoObject.VideoStates.CanPlay
        });
        video.addEventListener("play", function () {
            hvo.videoState = HoloVideoObject.VideoStates.Playing
        });
        video.addEventListener("canplaythrough", function () {
            hvo.videoState = HoloVideoObject.VideoStates.CanPlayThrough
        });
        video.addEventListener("waiting", function () {
            hvo.videoState = HoloVideoObject.VideoStates.Waiting
        });
        video.addEventListener("suspend", function () {
            hvo.videoState = HoloVideoObject.VideoStates.Suspended
        });
        video.addEventListener("stalled",
            function () {
                hvo.videoState = HoloVideoObject.VideoStates.Stalled
            });
        video.canplay = function () {
            this._logInfo("video -> canplay");
            this.videoState = HoloVideoObject.VideoStates.CanPlay
        }.bind(this);
        video.canplaythrough = function () {
            this._logInfo("video -> canplaythrough");
            this.videoState = HoloVideoObject.VideoStates.CanPlayThrough
        }.bind(this);
        video.waiting = function () {
            this._logInfo("video -> waiting");
            this.videoState = HoloVideoObject.VideoStates.Waiting
        }.bind(this);
        video.suspend = function () {
            this._logInfo("video -> suspend");
            this.videoState =
                HoloVideoObject.VideoStates.Suspended
        }.bind(this);
        video.stalled = function () {
            this._logInfo("video -> stalled");
            this.videoState = HoloVideoObject.VideoStates.Stalled
        }.bind(this);
        video.onerror = function (g) {
            this._logInfo("video error: " + g.target.error.code + " - " + g.target.mp4Name)
        }.bind(this);
        video.onended = function () {
            video.playing = false;
            this._onVideoEnded(video)
        }.bind(this);

        if(this.isSafari) {
            video.onplaying = function () {
                video.pause();
                video.muted = this.openOptions.autoplay || !this.openOptions.audioEnabled;
                video.preloaded = true;
                this._logInfo("video loaded: " +
                    video.mp4Name);
                video.onplaying = function () {
                    this._logInfo("video playing: " + video.mp4Name);
                    video.playing = true
                }.bind(this);
                ++this.videosLoaded;
                this._startPlaybackIfReady();
                this._loadNextVideo()
            }.bind(this)
        } else {
            video.onloadeddata = function () {
                var g = video.play();
                undefined !== g && g.then(function (d) {
                }).catch(function (d) {
                    video.onplaying()
                })
            }.bind(this)

            video.onplaying = function () {
                video.pause();
                video.preloaded = true;
                this._logInfo("video loaded: " + video.mp4Name);
                video.onplaying = function () {
                    this._logInfo("video playing: " + video.mp4Name);
                    video.playing = true
                }.bind(this);
                ++this.videosLoaded;
                this._startPlaybackIfReady();
                this._loadNextVideo()
            }.bind(this);
        }


        this.isSafari && video.play()
    }
};
HoloVideoObject.prototype.rewind = function () {
    if (this.json) {
        this._logInfo("rewind");
        var a = this.json.images[this.json.extensions[HoloVideoObject._extName].timeline[this.currentVideoIndex].image].video;
        a.pause();
        a.playing = false;
        a.currentTime = 0;
        this.state = HoloVideoObject.States.Opening;
        this.freeArrayBuffers = [];
        for (a = 0; a < Math.min(this.openOptions.maxBuffers, this.json.buffers.length - 1); ++a) this.freeArrayBuffers.push(a);
        this.currentBufferIndex = 0;
        this.nextBufferLoadIndex = this.fallbackFrameBuffer ? 1 : 0;
        this.lastKeyframe =
            this.frameIndex = -1;
        this.nextPbo = 0;
        this.lastVideoSampleIndex = -1;
        this.filledFallbackFrame = false;
        this.prevPrevMesh = this.prevMesh = this.curMesh = null;
        if (this.readFences) for (a = 0; a < this.readFences.length; ++a) this.readFences[a] && (this.gl.deleteSync(this.readFences[a]), this.readFences[a] = null);
        this._loadNextBuffer();
        this._loadFallbackFrame()
    }
};
HoloVideoObject.prototype.forceLoad = function () {
    var a = this;
    if (this.json) {
        var c = this.json.images[this.json.extensions[HoloVideoObject._extName].timeline[this.currentVideoIndex].image].video;
        c.playing ? this._logInfo("forceLoad: video already playing") : c.preloaded || (this._logInfo("forceLoad: manually starting video"), this.suspended = true, c = c.play(), undefined !== c && c.then(function (b) {
            a.state = HoloVideoObject.States.Playing
        }).catch(function (b) {
            a._logInfo("play prevented: " + b)
        }))
    } else this._logInfo("forceLoad: don't have json yet")
};
HoloVideoObject.prototype._onVideoEnded = function (a) {
    this._logInfo("video ended = " + a.mp4Name);
    this.freeVideoElements.push(a.videoElementIndex);
    a.videoElementIndex = -1;
    a = this.json.extensions[HoloVideoObject._extName].timeline;
    if (this.currentVideoIndex != a.length - 1 || this.openOptions.autoloop) this.currentVideoIndex = (this.currentVideoIndex + 1) % a.length, this._loadNextVideo(), this._startPlaybackIfReady(); else if (this.eos = true, this.onEndOfStream) this.onEndOfStream(this)
};
HoloVideoObject.prototype._setupTransformFeedback = function () {
    var a = this.gl;
    this.outputBufferIndex = 0;
    this.deltasBuf = a.createBuffer();
    this.outputBuffers = [a.createBuffer(), a.createBuffer(), a.createBuffer()];
    this.transformFeedbacks = [a.createTransformFeedback(), a.createTransformFeedback(), a.createTransformFeedback()];
    this.vaos = [a.createVertexArray(), a.createVertexArray(), a.createVertexArray()];
    a.bindVertexArray(null);
    for (var c = 0; 3 > c; ++c) a.bindTransformFeedback(a.TRANSFORM_FEEDBACK, this.transformFeedbacks[c]),
        a.bindBufferBase(a.TRANSFORM_FEEDBACK_BUFFER, 0, this.outputBuffers[c]);
    this.normalsVao = a.createVertexArray();
    this.normalsTF = a.createTransformFeedback();
    a.bindTransformFeedback(a.TRANSFORM_FEEDBACK, null);
    a.bindBuffer(a.TRANSFORM_FEEDBACK_BUFFER, null);
    c = this._createProgram(a, "#version 300 es\n            in vec3 inQuantized;\n            in vec3 prevPos;\n            in vec3 prevPrevPos;\n\n            uniform vec3 decodeMin;\n            uniform vec3 decodeMax;\n            uniform int havePrevPos;\n            uniform int havePrevPrevPos;\n\n            out vec3 outPos;\n\n            void main()\n            {\n                if (havePrevPos == 1)\n                {\n                    vec3 dm = vec3(0.0, 0.0, 0.0);\n\n                    if (havePrevPrevPos == 1)\n                    {\n                        dm = prevPos - prevPrevPos;\n                    }\n\n                    vec3 delta = (decodeMax - decodeMin) * inQuantized + decodeMin;\n                    outPos = prevPos + dm + delta;\n                }\n\n                else\n                {\n                    outPos = (decodeMax - decodeMin) * inQuantized + decodeMin;\n                }\n            }",
        "#version 300 es\n            out lowp vec4 fragColor;\n            void main()\n            {\n                fragColor = vec4(0,0,0,0);\n            }\n            ", function (b) {
            a.transformFeedbackVaryings(b, ["outPos"], a.SEPARATE_ATTRIBS)
        });
    c.havePrevPosLoc = a.getUniformLocation(c, "havePrevPos");
    c.havePrevPrevPosLoc = a.getUniformLocation(c, "havePrevPrevPos");
    c.decodeMinLoc = a.getUniformLocation(c, "decodeMin");
    c.decodeMaxLoc = a.getUniformLocation(c, "decodeMax");
    c.inQuantizedLoc = a.getAttribLocation(c,
        "inQuantized");
    c.prevPosLoc = a.getAttribLocation(c, "prevPos");
    c.prevPrevPosLoc = a.getAttribLocation(c, "prevPrevPos");
    this.tfShader = c;
    c = this._createProgram(a, "#version 300 es\n            in vec2 inOctNormal;\n            out vec3 outNormal;\n\n            vec3 OctDecode(vec2 f)\n            {\n                f = f * 2.0 - 1.0;\n\n                // https://twitter.com/Stubbesaurus/status/937994790553227264\n                vec3 n = vec3( f.x, f.y, 1.0 - abs(f.x) - abs(f.y));\n                float t = clamp(-n.z, 0.0, 1.0);\n                n.x += n.x >= 0.0 ? -t : t;\n                n.y += n.y >= 0.0 ? -t : t;\n                return normalize(n);\n            }\n\n            void main()\n            {\n                outNormal = OctDecode(inOctNormal);\n            }",
        "#version 300 es\n            out lowp vec4 fragColor;\n            void main()\n            {\n                fragColor = vec4(0,0,0,0);\n            }\n            ", function (b) {
            a.transformFeedbackVaryings(b, ["outNormal"], a.SEPARATE_ATTRIBS)
        });
    c.inOctNormalLoc = a.getAttribLocation(c, "inOctNormal");
    this.octNormalsShader = c
};
HoloVideoObject.prototype._updateMeshTF = function (frame, posBuf, uvBuf, indexBuf, norBuf, sourceBuffers) {
    var gl = this.gl;

    // this is the buffer we're capturing to with transform feedback
    frame.outputBuffer = this.outputBuffers[this.outputBufferIndex];

    var saveVb = gl.getParameter(gl.ARRAY_BUFFER_BINDING)
    var saveIb = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING)
    var saveShader = gl.getParameter(gl.CURRENT_PROGRAM)
    var saveBb = gl.getParameter(gl.VERTEX_ARRAY_BINDING);

    gl.useProgram(this.tfShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexCount = 0
    var tfShader = this.tfShader;
    if (frame.primitives[0].extensions[HoloVideoObject._extName].attributes.POSITION) {
        this.lastKeyframe = this.frameIndex;

        // copy indices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sourceBuffers.indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, saveIb);

        // copy uvs
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
        gl.bufferData(gl.ARRAY_BUFFER, sourceBuffers.compressedUVs, gl.STATIC_DRAW);

        gl.bindVertexArray(this.vaos[0]);

        this.prevPrevMesh = this.prevMesh = null;

        vertexCount = frame.compressedPos.count;
        frame.indexCount = frame.indices.count;

        // copy compressed (quantized) positions
        gl.bindBuffer(gl.ARRAY_BUFFER, this.deltasBuf);
        gl.bufferData(gl.ARRAY_BUFFER, sourceBuffers.compressedPos, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(tfShader.inQuantizedLoc);
        gl.vertexAttribPointer(tfShader.inQuantizedLoc, 3, frame.compressedPos.componentType, true, 0, 0);

        gl.disableVertexAttribArray(tfShader.prevPosLoc);
        gl.disableVertexAttribArray(tfShader.prevPrevPosLoc);

        var min = frame.compressedPos.extensions[HoloVideoObject._extName].decodeMin;
        var max = frame.compressedPos.extensions[HoloVideoObject._extName].decodeMax;
        gl.uniform3fv(tfShader.decodeMinLoc, min);
        gl.uniform3fv(tfShader.decodeMaxLoc, max);

        this.currentFrameInfo.bboxMin = min;
        this.currentFrameInfo.bboxMax = max;

        gl.uniform1i(tfShader.havePrevPosLoc, 0);
        gl.uniform1i(tfShader.havePrevPrevPosLoc, 0)
    } else {
        vertexCount = frame.deltas.count
        frame.indexCount = this.prevMesh.indexCount
        null == this.prevPrevMesh ? gl.bindVertexArray(this.vaos[1]) : gl.bindVertexArray(this.vaos[2])
        gl.bindBuffer(gl.ARRAY_BUFFER, this.deltasBuf)
        gl.bufferData(gl.ARRAY_BUFFER, sourceBuffers.deltas, gl.DYNAMIC_DRAW)
        gl.enableVertexAttribArray(tfShader.inQuantizedLoc)
        gl.vertexAttribPointer(tfShader.inQuantizedLoc, 3, frame.deltas.componentType, true, 0, 0)
        gl.uniform3fv(tfShader.decodeMinLoc, frame.deltas.extensions[HoloVideoObject._extName].decodeMin)
        gl.uniform3fv(tfShader.decodeMaxLoc, frame.deltas.extensions[HoloVideoObject._extName].decodeMax)
        gl.uniform1i(tfShader.havePrevPosLoc, 1)
        gl.bindBuffer(gl.ARRAY_BUFFER, this.prevMesh.outputBuffer)
        gl.enableVertexAttribArray(tfShader.prevPosLoc)
        gl.vertexAttribPointer(tfShader.prevPosLoc, 3, gl.FLOAT, false, 0, 0)

        if(null == this.prevPrevMesh) {
            gl.uniform1i(tfShader.havePrevPrevPosLoc, 0)
            gl.disableVertexAttribArray(tfShader.prevPrevPosLoc)
        } else {
            gl.uniform1i(tfShader.havePrevPrevPosLoc, 1)
            gl.bindBuffer(gl.ARRAY_BUFFER, this.prevPrevMesh.outputBuffer)
            gl.enableVertexAttribArray(tfShader.prevPrevPosLoc)
            gl.vertexAttribPointer(tfShader.prevPrevPosLoc, 3, gl.FLOAT, false, 0, 0)
        }
    }

    // ensure output buffer has enough capacity
    var bufferSize = 12 * vertexCount;
    gl.bindBuffer(gl.ARRAY_BUFFER, frame.outputBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.transformFeedbacks[this.outputBufferIndex]);
    gl.enable(gl.RASTERIZER_DISCARD);
    gl.beginTransformFeedback(gl.POINTS);
    gl.drawArrays(gl.POINTS, 0, vertexCount);
    gl.endTransformFeedback();
    gl.disable(gl.RASTERIZER_DISCARD);
    gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
    gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, null);

    // copy captured output into 'posBuf' passed to us by caller.
    gl.bindBuffer(gl.COPY_READ_BUFFER, frame.outputBuffer);
    gl.bindBuffer(gl.COPY_WRITE_BUFFER, posBuf);
    gl.bufferData(gl.COPY_WRITE_BUFFER, bufferSize, gl.DYNAMIC_COPY);
    gl.copyBufferSubData(gl.COPY_READ_BUFFER, gl.COPY_WRITE_BUFFER, 0, 0, bufferSize);
    gl.bindBuffer(gl.COPY_READ_BUFFER, null);
    gl.bindBuffer(gl.COPY_WRITE_BUFFER, null);

    this.outputBufferIndex = (this.outputBufferIndex + 1) % 3;

    // copy normals, if any
    if(norBuf && sourceBuffers.compressedNormals) {
        if (this.fileInfo.octEncodedNormals) {
            gl.useProgram(this.octNormalsShader)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
            gl.bindVertexArray(this.normalsVao)
            gl.bindBuffer(gl.ARRAY_BUFFER, this.deltasBuf)
            gl.bufferData(gl.ARRAY_BUFFER, sourceBuffers.compressedNormals, gl.DYNAMIC_DRAW)
            gl.enableVertexAttribArray(this.octNormalsShader.inOctNormalLoc)
            gl.vertexAttribPointer(this.octNormalsShader.inOctNormalLoc, 2, gl.UNSIGNED_BYTE, true, 0, 0)
            bufferSize = 12 * vertexCount, gl.bindBuffer(gl.ARRAY_BUFFER, norBuf)
            gl.bufferData(gl.ARRAY_BUFFER, bufferSize, gl.DYNAMIC_DRAW)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.normalsTF)
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, norBuf)
            gl.enable(gl.RASTERIZER_DISCARD)
            gl.beginTransformFeedback(gl.POINTS)
            gl.drawArrays(gl.POINTS, 0, vertexCount)
            gl.endTransformFeedback()
            gl.disable(gl.RASTERIZER_DISCARD)
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null)
            gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, null)
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, norBuf)
            gl.bufferData(gl.ARRAY_BUFFER, sourceBuffers.compressedNormals, gl.DYNAMIC_DRAW)
        }
    }

    gl.useProgram(saveShader);
    gl.bindBuffer(gl.ARRAY_BUFFER, saveVb);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, saveIb);
    gl.bindVertexArray(saveBb);

    return true
};

HoloVideoObject.prototype._updateMesh = function (posBuf, uvBuf, indexBuf, norBuf) {

    this.frameIndex = (this.frameIndex + 1) % this.meshFrames.length;

    var frame = this.meshFrames[this.frameIndex];

    if (!frame.ensureBuffers())
        return false;

    if(this.prevPrevMesh)
        this.prevPrevMesh.uncompressedPos = null;

    this.prevPrevMesh = this.prevMesh;
    this.prevMesh = this.curMesh;
    this.curMesh = frame;

    var sourceBuffers = {
        indices: null,
        compressedPos: null,
        compressedUVs: null,
        compressedNormals: null,
        deltas: null
    }
    var buffers = this.json.buffers
    var bufferViews = this.json.bufferViews

    let attributes = frame.primitives[0].extensions[HoloVideoObject._extName].attributes;
    if (attributes.POSITION) {
        var arrayBufferIndex = buffers[bufferViews[frame.indices.bufferView].buffer].arrayBufferIndex;
        var indexArrayBuf = this.buffers[arrayBufferIndex]
        var posArrayBuf = this.buffers[arrayBufferIndex];
        sourceBuffers.indices = new Uint16Array(this.buffers[arrayBufferIndex], bufferViews[frame.indices.bufferView].byteOffset + frame.indices.byteOffset, frame.indices.count);
        sourceBuffers.compressedPos = new Uint16Array(indexArrayBuf, bufferViews[frame.compressedPos.bufferView].byteOffset + frame.compressedPos.byteOffset, 3 * frame.compressedPos.count);
        sourceBuffers.compressedUVs = new Uint16Array(posArrayBuf, bufferViews[frame.compressedUVs.bufferView].byteOffset + frame.compressedUVs.byteOffset, 2 * frame.compressedUVs.count)
    } else {
        arrayBufferIndex = buffers[bufferViews[frame.deltas.bufferView].buffer].arrayBufferIndex
        sourceBuffers.deltas = new Uint8Array(this.buffers[arrayBufferIndex], bufferViews[frame.deltas.bufferView].byteOffset + frame.deltas.byteOffset, 3 * frame.deltas.count);
    }

    if (arrayBufferIndex != this.currentBufferIndex) {
        this._logInfo("currentBufferIndex -> " + arrayBufferIndex);
        this.freeArrayBuffers.push(this.currentBufferIndex);
        this.currentBufferIndex = arrayBufferIndex;
        if (!this.pendingBufferDownload) {
            this._loadNextBuffer();
        }
    }

    if (frame.compressedNormals != null) {

        var norArrayBuf = this.buffers[buffers[bufferViews[frame.compressedNormals.bufferView].buffer].arrayBufferIndex];

        // oct encoding
        if (frame.compressedNormals.type == "VEC2") {
            sourceBuffers.compressedNormals = new Uint8Array(norArrayBuf, bufferViews[frame.compressedNormals.bufferView].byteOffset + frame.compressedNormals.byteOffset, frame.compressedNormals.count * 2);
        }
        // quantized 16-bit xyz
        else if (frame.compressedNormals.type == "VEC3") {
            sourceBuffers.compressedNormals = new Uint16Array(norArrayBuf, bufferViews[frame.compressedNormals.bufferView].byteOffset + frame.compressedNormals.byteOffset, frame.compressedNormals.count * 3);
        }
    }

    if (this.caps.webgl2 && !this.caps.badTF)
        return this._updateMeshTF(frame, posBuf, uvBuf, indexBuf, norBuf, sourceBuffers);

    var gl = this.gl;
    buffers = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
    arrayBufferIndex = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);

    if (attributes.POSITION) {
        this.lastKeyframe = this.frameIndex;
        this.prevMesh && (this.prevMesh = this.prevMesh.uncompressedPos = null);
        this.prevPrevMesh && (this.prevPrevMesh = this.prevPrevMesh.uncompressedPos = null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sourceBuffers.indices, gl.DYNAMIC_DRAW);
        frame.indexCount = frame.indices.count;
        var count = frame.compressedPos.count;
        frame.uncompressedPos = new Float32Array(3 * count);

        var min = frame.compressedPos.extensions[HoloVideoObject._extName].decodeMin;
        var max = frame.compressedPos.extensions[HoloVideoObject._extName].decodeMax;

        this.currentFrameInfo.bboxMin = min;
        this.currentFrameInfo.bboxMax = max;

        var bboxdx = (max[0] - min[0]) / 65535
        var bboxdy = (max[1] - min[1]) / 65535
        var bboxdz = (max[2] - min[2]) / 65535;

        for (var i = 0; i < count; ++i) {
            var i0 = 3 * i
            var i1 = i0 + 1
            var i2 = i0 + 2;

            frame.uncompressedPos[i0] = sourceBuffers.compressedPos[i0] * bboxdx + min[0];
            frame.uncompressedPos[i1] = sourceBuffers.compressedPos[i1] * bboxdy + min[1];
            frame.uncompressedPos[i2] = sourceBuffers.compressedPos[i2] * bboxdz + min[2]
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, frame.uncompressedPos, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
        gl.bufferData(gl.ARRAY_BUFFER, sourceBuffers.compressedUVs, gl.DYNAMIC_DRAW)
    } else {
        indexBuf = frame.deltas.count;
        frame.uncompressedPos =
            new Float32Array(3 * indexBuf);
        frame.indexCount = this.prevMesh.indexCount;
        min = frame.deltas.extensions[HoloVideoObject._extName].decodeMin;
        i = frame.deltas.extensions[HoloVideoObject._extName].decodeMax;
        bboxdx = (i[0] - min[0]) / 255;
        bboxdy = (i[1] - min[1]) / 255;
        bboxdz = (i[2] - min[2]) / 255;
        var x = sourceBuffers.deltas;
        if (null == this.prevPrevMesh) for (i = 0; i < indexBuf; ++i) {
            i0 = 3 * i;
            i1 = i0 + 1;
            i2 = i0 + 2;
            uvBuf = this.prevMesh.uncompressedPos[i0];
            posArrayBuf = this.prevMesh.uncompressedPos[i1];
            var w = this.prevMesh.uncompressedPos[i2], y = x[i0] * bboxdx + min[0], z = x[i1] * bboxdy + min[1], A = x[i2] * bboxdz + min[2];
            uvBuf += y;
            posArrayBuf += z;
            w += A;
            frame.uncompressedPos[i0] = uvBuf;
            frame.uncompressedPos[i1] =
                posArrayBuf;
            frame.uncompressedPos[i2] = w
        } else for (i = 0; i < indexBuf; ++i) i0 = 3 * i, i1 = i0 + 1, i2 = i0 + 2, uvBuf = this.prevMesh.uncompressedPos[i0], posArrayBuf = this.prevMesh.uncompressedPos[i1], w = this.prevMesh.uncompressedPos[i2], y = posArrayBuf - this.prevPrevMesh.uncompressedPos[i1], z = w - this.prevPrevMesh.uncompressedPos[i2], uvBuf += uvBuf - this.prevPrevMesh.uncompressedPos[i0], posArrayBuf += y, w += z, y = x[i0] * bboxdx + min[0], z = x[i1] * bboxdy + min[1], A = x[i2] * bboxdz + min[2], uvBuf += y, posArrayBuf += z, w += A, frame.uncompressedPos[i0] = uvBuf, frame.uncompressedPos[i1] = posArrayBuf, frame.uncompressedPos[i2] = w;
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.bufferData(gl.ARRAY_BUFFER, frame.uncompressedPos,
            gl.DYNAMIC_DRAW)
    }
    if (norBuf && sourceBuffers.compressedNormals) if (this.fileInfo.octEncodedNormals) {
        indexBuf = sourceBuffers.compressedNormals.length;
        posBuf = new Float32Array(3 * indexBuf);
        frame = Math.abs;
        min = this._clamp;
        for (i = 0; i < indexBuf; ++i) uvBuf = sourceBuffers.compressedNormals[2 * i], posArrayBuf = sourceBuffers.compressedNormals[2 * i + 1], uvBuf = -1 + .0078125 * uvBuf, posArrayBuf = -1 + .0078125 * posArrayBuf, w = 1 - frame(uvBuf) - frame(posArrayBuf), bboxdx = min(-w, 0, 1), uvBuf += 0 <= uvBuf ? -bboxdx : bboxdx, posArrayBuf += 0 <= posArrayBuf ? -bboxdx : bboxdx, bboxdx = 1 / Math.sqrt(uvBuf * uvBuf + posArrayBuf * posArrayBuf + w * w), posBuf[3 * i] = uvBuf * bboxdx, posBuf[3 * i + 1] = posArrayBuf * bboxdx, posBuf[3 * i + 2] = w * bboxdx;
        gl.bindBuffer(gl.ARRAY_BUFFER, norBuf);
        gl.bufferData(gl.ARRAY_BUFFER, posBuf, gl.DYNAMIC_DRAW)
    } else gl.bindBuffer(gl.ARRAY_BUFFER, norBuf), gl.bufferData(gl.ARRAY_BUFFER,
        sourceBuffers.compressedNormals, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, arrayBufferIndex);
    return true
};

HoloVideoObject.prototype._clamp = function (num, min, max) {
    return num < min ? min : num > max ? max : num
};

HoloVideoObject.prototype._onJsonLoaded = function (response) {
    this._logInfo("got json");
    var c = this.json = JSON.parse(response);
    this.minBuffers = Math.min(this.openOptions.minBuffers, this.json.buffers.length - 1);
    this.minVideos = Math.min(2, this.json.extensions[HoloVideoObject._extName].timeline.length);
    this.buffers = [null, null, null];
    0 == this.videoElements.length && (this.videoElements = [document.createElement("video")]);
    this.videoElements[0].setAttribute("playsinline", "playsinline");
    this.videoElements[0].volume = this.audioVolume;
    this.freeVideoElements.push(0);
    for (response = 0; response < Math.min(this.openOptions.maxBuffers, this.json.buffers.length - 1); ++response) this.freeArrayBuffers.push(response);
    this._loadNextVideo();
    this._loadNextBuffer();
    this.currentBufferIndex = 0;

    var accessors = this.json.accessors
    var numFrames = this.json.meshes.length

    var arrayBuffers = this.buffers

    var hvo = this

    var ensureBuffers = function () {
        var bufferViews = c.bufferViews
        var buffers = c.buffers;

        if (this.primitives[0].extensions[HoloVideoObject._extName].attributes.POSITION) {

            var indexBufferView = bufferViews[this.indices.bufferView];
            if (undefined == buffers[indexBufferView.buffer].arrayBufferIndex
                || arrayBuffers[buffers[indexBufferView.buffer].arrayBufferIndex].bufferIndex != indexBufferView.buffer)
                return hvo._logInfo("buffer for frame " + this.frameIndex + " not downloaded yet: " + buffers[indexBufferView.buffer].uri), false;

            var posBufferView = bufferViews[this.compressedPos.bufferView];
            if (undefined == buffers[posBufferView.buffer].arrayBufferIndex
                || arrayBuffers[buffers[posBufferView.buffer].arrayBufferIndex].bufferIndex != posBufferView.buffer)
                return hvo._logInfo("buffer for frame " + this.frameIndex + " not downloaded yet: " + buffers[posBufferView.buffer].uri), false;

            var uvBufferView = bufferViews[this.compressedUVs.bufferView];
            if (undefined == buffers[uvBufferView.buffer].arrayBufferIndex
                || arrayBuffers[buffers[uvBufferView.buffer].arrayBufferIndex].bufferIndex != uvBufferView.buffer)
                return hvo._logInfo("buffer for frame " + this.frameIndex + " not downloaded yet: " + buffers[uvBufferView.buffer].uri), false
        } else
            if (posBufferView = bufferViews[this.deltas.bufferView]
                , undefined == buffers[posBufferView.buffer].arrayBufferIndex
            || arrayBuffers[buffers[posBufferView.buffer].arrayBufferIndex].bufferIndex != posBufferView.buffer)
                return hvo._logInfo("buffer for frame " + this.frameIndex + " not downloaded yet: " + buffers[posBufferView.buffer].uri), false;
        return this.compressedNormals && (bufferViews = bufferViews[this.compressedNormals.bufferView]
            , undefined == buffers[bufferViews.buffer].arrayBufferIndex
        || arrayBuffers[buffers[bufferViews.buffer].arrayBufferIndex].bufferIndex != bufferViews.buffer)
            ? (hvo._logInfo("buffer for frame " + this.frameIndex + " not downloaded yet: " + buffers[bufferViews.buffer].uri), false)
            : true
    };

    for (var i = 0; i < numFrames; ++i) {
        var k = this.json.meshes[i];
        k.frameIndex = i;
        k.ensureBuffers = ensureBuffers;

        var attributes = k.primitives[0].extensions[HoloVideoObject._extName].attributes;
        attributes.POSITION
            ? (
                k.indices = accessors[k.primitives[0].extensions[HoloVideoObject._extName].indices],
                    k.compressedUVs = accessors[attributes.TEXCOORD_0],
                    k.compressedPos = accessors[attributes.POSITION]
            )
            : k.deltas = accessors[attributes._DELTA];
        null != attributes.NORMAL && (this.fileInfo.haveNormals = true, k.compressedNormals = accessors[attributes.NORMAL], "VEC2" == k.compressedNormals.type && (this.fileInfo.octEncodedNormals = true));
        this.meshFrames.push(k)
    }
    var response = this.json.images[1].extensions[HoloVideoObject._extName];
    this.fileInfo.videoWidth = response.width;
    this.fileInfo.videoHeight = response.height;
    accessors = this.json.extensions[HoloVideoObject._extName];
    this.fileInfo.maxVertexCount = accessors.maxVertexCount;
    this.fileInfo.maxIndexCount = accessors.maxIndexCount;
    this.fileInfo.boundingBox = {
        min: accessors.boundingMin,
        max: accessors.boundingMax
    };

    if (this.onLoaded) this.onLoaded(this.fileInfo);

    if (this.outputBuffers) {
        var gl = this.gl;
        var saveVb = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
        for (var i = 0; 3 > i; ++i) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.outputBuffers[i])
            gl.bufferData(gl.ARRAY_BUFFER, 12 * accessors.maxVertexCount, gl.STREAM_COPY)
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, saveVb)
    }
};

HoloVideoObject.prototype._getChromeVersion = function () {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false
};

HoloVideoObject.prototype._getIOSVersion = function () {
    var a = window.navigator.userAgent;
    if (0 < a.indexOf("iPhone") || 0 < a.indexOf("iPad")) if (a = a.match(/OS (\d+)_(\d+)_?(\d+)?/)) return {
        major: parseInt(a[1] || 0, 10),
        minor: parseInt(a[2] || 0, 10),
        patch: parseInt(a[3] || 0, 10)
    };
    return false
};

HoloVideoObject.prototype._logDebug = function (message, force) {
    3 <= this.logLevel && console.log("[" + this.id + "] " + message)
};

HoloVideoObject.prototype._logInfo = function (message, force) {
    (2 <= this.logLevel || force) && console.log("[" + this.id + "] " + message)
};

HoloVideoObject.prototype._logWarning = function (message) {
    1 <= this.logLevel && console.log("[" + this.id + "] " + message)
};

HoloVideoObject.prototype._logError = function (message) {
    0 <= this.logLevel && console.log("[" + this.id + "] " + message)
};

HoloVideoObject.prototype._initializeWebGLResources = function (a) {
    var c = {}, b = a.getParameter(a.VERSION);
    c.webgl2 = -1 != b.indexOf("WebGL 2.");
    c.badTF = false;
    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    this.iOSVersion = this._getIOSVersion();
    navigator.userAgent.includes("Mobile") && "iPhone" != navigator.platform && "iPad" != navigator.platform && (this.isSafari = false);
    if (b = a.getExtension("WEBGL_debug_renderer_info")) c.vendor = a.getParameter(b.UNMASKED_VENDOR_WEBGL), c.renderer = a.getParameter(b.UNMASKED_RENDERER_WEBGL),
        c.isSafari = this.isSafari, c.iOSVersion = this.iOSVersion, -1 != c.renderer.indexOf("Mali") && (c.badTF = true);
    b = JSON.stringify(c, null, 4);
    console.log(b);
    this.caps = c;
    this.fbo1 = a.createFramebuffer();
    this.caps.webgl2 ? (this.caps.badTF || this._setupTransformFeedback(), this.createOptions.disableAsyncDecode ? this.textures = [null] : (this.fbo2 = a.createFramebuffer(), this.textures = Array(this.createOptions.numAsyncFrames), this.pixelBuffers = Array(this.createOptions.numAsyncFrames), this.readFences = Array(this.createOptions.numAsyncFrames),
        this.nextPbo = 0)) : this.textures = [null];
    c = a.getParameter(a.TEXTURE_BINDING_2D);
    for (b = 0; b < this.textures.length; ++b) this.textures[b] = a.createTexture(), a.bindTexture(a.TEXTURE_2D, this.textures[b]), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
    a.bindTexture(a.TEXTURE_2D, c)
};

HoloVideoObject.prototype._releaseWebGLResources = function (a) {
    if (this.caps.webgl2 && !this.caps.badTF) {
        a.deleteBuffer(this.deltasBuf);
        for (var c = 0; 3 > c; ++c) a.deleteBuffer(this.outputBuffers[c]), this.outputBuffers[c] = null, a.deleteTransformFeedback(this.transformFeedbacks[c]), this.transformFeedbacks[c] = null, a.deleteVertexArray(this.vaos[c]), this.vaos[c] = null;
        a.deleteTransformFeedback(this.normalsTF);
        this.normalsTF = null;
        a.deleteVertexArray(this.normalsVao);
        this.normalsVao = null;
        a.deleteProgram(this.tfShader);
        this.tfShader = null;
        a.deleteProgram(this.octNormalsShader);
        this.octNormalsShader = null
    }
    if (this.pixelBuffers) for (c = 0; c < this.pixelBuffers.length; ++c) a.deleteBuffer(this.pixelBuffers[c]), this.pixelBuffers[c] = null;
    if (this.readFences) for (c = 0; c < this.readFences.length; ++c) a.deleteSync(this.readFences[c]), this.readFences[c] = null;
    for (c = this.nextPbo = 0; c < this.textures.length; ++c) a.deleteTexture(this.textures[c]);
    this.fbo1 && (a.deleteFramebuffer(this.fbo1), this.fbo1 = null);
    this.fbo2 && (a.deleteFramebuffer(this.fbo2),
        this.fbo2 = null)
};

HoloVideoObject.prototype.getLoadProgress = function () {
    return undefined == this.minBuffers ? 0 : this.state >= HoloVideoObject.States.Opened ? 1 : (this.buffersLoaded + this.videosLoaded) / (this.minBuffers + this.minVideos)
};

HoloVideoObject.prototype.setBuffers = function (posBuf, indexBuf, uvBuf, norBuf, tex) {
    var clientBuffers = {};
    clientBuffers.posBuf = posBuf;
    clientBuffers.indexBuf = indexBuf;
    clientBuffers.uvBuf = uvBuf;
    clientBuffers.norBuf = norBuf;
    clientBuffers.tex = tex;
    this.clientBuffers = clientBuffers
};

HoloVideoObject.prototype.updateToLastKeyframe = function () {
    -1 != this.lastKeyframe && (this.frameIndex = this.lastKeyframe - 1, this.prevPrevMesh = this.prevMesh = this.curMesh = null)
};

// Only used to load first frame (texture and mesh). Texture seems to be not bin not in video
HoloVideoObject.prototype._loadFallbackFrame = function () {
    if (this.json && this.fallbackFrameBuffer) {
        if (!this.fallbackTextureImage) {
            this.fallbackTextureImage = new Image();

            var encode = function (input) {
                var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                var output = ""
                for (var chr1, chr2, chr3, enc1, enc3, enc4, i = 0; i < input.length;) {
                    chr1 = input[i++]
                        , chr2 = i < input.length ? input[i++] : Number.NaN
                        , chr3 = i < input.length ? input[i++] : Number.NaN

                        , enc1 = chr1 >> 2
                        , enc2 = (chr1 & 3) << 4 | chr2 >> 4
                        , enc3 = (chr2 & 15) << 2 | chr3 >> 6
                        , enc4 = chr3 & 63
                        , isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64)
                        , output += keyStr.charAt(enc1) +
                        keyStr.charAt(enc2)
                        + keyStr.charAt(enc3)
                        + keyStr.charAt(enc4);
                }

                return output
            }

            // FIXME? can we always assume fallback image is image 0?
            var fallbackImage = this.json.images[0];
            var bufferView = this.json.bufferViews[fallbackImage.bufferView];

            this.fallbackTextureImage.src = "data:image/jpeg;base64," + encode(new Uint8Array(this.fallbackFrameBuffer, bufferView.byteOffset, bufferView.byteLength));

            this.fallbackTextureImage.onload = function () {
                this._logInfo("fallback image loaded");
                this.fallbackTextureImage.loaded = true
            }.bind(this)
        }

        if (this.fallbackTextureImage &&
            this.fallbackTextureImage.loaded &&
            !this.filledFallbackFrame &&
            this.clientBuffers &&
            this.clientBuffers.posBuf) {

            var gl = this.gl;

            var fallbackPrim = this.json.meshes[0].primitives[0]
            
            var saveVb = gl.getParameter(gl.ARRAY_BUFFER_BINDING)
            var saveIb = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING)

            var posAccesor = this.json.accessors[fallbackPrim.attributes.POSITION]
            var posBufferView = this.json.bufferViews[posAccesor.bufferView];
            gl.bindBuffer(gl.ARRAY_BUFFER, this.clientBuffers.posBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.fallbackFrameBuffer, posBufferView.byteOffset + posAccesor.byteOffset, 3 * posAccesor.count), gl.STATIC_DRAW);

            if (this.clientBuffers.norBuf && this.fileInfo.haveNormals) {
                var norAccesor = this.json.accessors[fallbackPrim.attributes.NORMAL]
                var norBufferView = this.json.bufferViews[norAccesor.bufferView]

                gl.bindBuffer(gl.ARRAY_BUFFER, this.clientBuffers.norBuf)
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.fallbackFrameBuffer, norBufferView.byteOffset + norAccesor.byteOffset, 3 * norAccesor.count), gl.STATIC_DRAW)
            }

            var uvAccesor = this.json.accessors[fallbackPrim.attributes.TEXCOORD_0];
            var uvBufferView = this.json.bufferViews[uvAccesor.bufferView];
            gl.bindBuffer(gl.ARRAY_BUFFER, this.clientBuffers.uvBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(this.fallbackFrameBuffer, uvBufferView.byteOffset + uvAccesor.byteOffset, 2 * uvAccesor.count), gl.STATIC_DRAW);

            var indexAccesor = this.json.accessors[fallbackPrim.indices];
            var indexBufferView = this.json.bufferViews[indexAccesor.bufferView];
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.clientBuffers.indexBuf);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.fallbackFrameBuffer, indexBufferView.byteOffset + indexAccesor.byteOffset, indexAccesor.count), gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, saveVb);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, saveIb);
            gl.pixelStorei(gl.PACK_ALIGNMENT, 4);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            saveVb = gl.getParameter(gl.TEXTURE_BINDING_2D);
            gl.bindTexture(gl.TEXTURE_2D, this.clientBuffers.tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.fallbackTextureImage);
            gl.bindTexture(gl.TEXTURE_2D, saveVb);
            this.currentFrameInfo.primCount = indexAccesor.count;
            indexAccesor = this.json.accessors[fallbackPrim.extensions[HoloVideoObject._extName].attributes.POSITION];
            var min = indexAccesor.extensions[HoloVideoObject._extName].decodeMin
            var max = indexAccesor.extensions[HoloVideoObject._extName].decodeMax;
            this.currentFrameInfo.bboxMin = min;
            this.currentFrameInfo.bboxMax = max;
            this.filledFallbackFrame = true
        }
        return this.filledFallbackFrame
    }
};

HoloVideoObject.prototype.updateBuffers = function () {

    if (this.contextLost)
        return false;

    if (!this.filledFallbackFrame)
        return this._loadFallbackFrame();

    var video = this.json.images[this.json.extensions[HoloVideoObject._extName].timeline[this.currentVideoIndex].image]
    var currentVideo = video.video;

    if (currentVideo && currentVideo.playing && !this.suspended) {
        var now = window.performance.now();
        if (20 > now - this.lastUpdate)
            return false;

        this.lastVideoTime = 1000 * currentVideo.currentTime;
        this.lastUpdate = now;
        var gl = this.gl;
        if(!this.watermarkPixels)
            this.watermarkPixels = new Uint8Array(4 * video.extensions[HoloVideoObject._extName].width);

        var videoSampleIndex = -1
        var saveFbo = gl.getParameter(gl.FRAMEBUFFER_BINDING)
        var saveTex = gl.getParameter(gl.TEXTURE_BINDING_2D)

        var isCap = this.caps.webgl2 && !this.createOptions.disableAsyncDecode;
        if (isCap) {
            var readPbo = (this.nextPbo + 1) % this.pixelBuffers.length;

            if (null != this.readFences[readPbo]) {

                gl.getSyncParameter(this.readFences[readPbo], gl.SYNC_STATUS);
                gl.deleteSync(this.readFences[readPbo]);
                this.readFences[readPbo] = null;

                gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.pixelBuffers[readPbo]);
                gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, this.watermarkPixels, 0, this.watermarkPixels.byteLength);

                var blockSize = 4 * video.extensions[HoloVideoObject._extName].blockSize;
                var videoSampleIndex = 0
                for (var i = 0; i < 16 ; ++i)
                    if (128 < this.watermarkPixels[blockSize * i] || 128 < this.watermarkPixels[blockSize * i + 4]){
                        videoSampleIndex += 1 << i
                    }
                // console.log(videoSampleIndex, readPbo)

                // At this point we know that frame 'videoSampleIndex' is contained in textures[readPbo], but we don't want to copy it to client texture
                // until we know we have the matching mesh frame.
            }

            if(!this.pixelBuffers[this.nextPbo]) {
                this.pixelBuffers[this.nextPbo] = gl.createBuffer()
                gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.pixelBuffers[this.nextPbo])
                gl.bufferData(gl.PIXEL_PACK_BUFFER, this.watermarkPixels.byteLength, gl.DYNAMIC_READ)
            }

            gl.pixelStorei(gl.PACK_ALIGNMENT, 4);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            gl.bindTexture(gl.TEXTURE_2D, this.textures[this.nextPbo]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, currentVideo);
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo1);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[this.nextPbo], 0);
            gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.pixelBuffers[this.nextPbo]);
            gl.readPixels(0, 0, this.watermarkPixels.byteLength / 4, 1, gl.RGBA, gl.UNSIGNED_BYTE, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);

            this.readFences[this.nextPbo] = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
            this.nextPbo = (this.nextPbo + 1) % this.pixelBuffers.length
        } else if (gl.pixelStorei(gl.PACK_ALIGNMENT, 4)
            , gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
            , gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
            , gl.bindTexture(gl.TEXTURE_2D, this.textures[0])
            , gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, currentVideo)
            , blockSize = gl.getError()
            , blockSize == gl.NO_ERROR) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo1);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[0], 0);
            gl.readPixels(0, 0, this.watermarkPixels.byteLength / 4, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.watermarkPixels);
            var blockSize = 4 * video.extensions[HoloVideoObject._extName].blockSize;

            for (video = videoSampleIndex = 0; 16 > video; ++video)
                if (128 < this.watermarkPixels[blockSize * video] || 128 < this.watermarkPixels[blockSize * video + 4])
                    videoSampleIndex += 1 << video;

            let isA = true;
            if (0 == videoSampleIndex && videoSampleIndex < this.lastVideoSampleIndex) {
                for (video = 0; video < this.watermarkPixels.byteLength; ++video) if (0 != this.watermarkPixels[video]) {
                    isA = false;
                    break
                }
                if (isA) return this._logWarning("dropping empty/black video frame"), this.currentFrameInfo.primCount = 0, true
            }
        } else
            this._logWarning("webgl error: " + blockSize + " skipping video texture read");

        if (-1 < videoSampleIndex && (null == this.curMesh || this.curMesh.frameIndex != videoSampleIndex))
            if (this._logDebug("videoSampleIndex -> " + videoSampleIndex),
                this.meshFrames[videoSampleIndex].ensureBuffers()) {
                if (videoSampleIndex < this.lastVideoSampleIndex) {
                    this.frameIndex = -1
                    this._updateMesh(this.clientBuffers.posBuf, this.clientBuffers.uvBuf, this.clientBuffers.indexBuf, this.clientBuffers.norBuf)
                    this._logInfo("loop detected, videoSampleIndex = " + videoSampleIndex + ", curMesh.frameIndex = " + this.curMesh.frameIndex)
                }

                // for (; (null == this.curMesh || this.curMesh.frameIndex < videoSampleIndex) && this._updateMesh(this.clientBuffers.posBuf, this.clientBuffers.uvBuf, this.clientBuffers.indexBuf, this.clientBuffers.norBuf);) ;
                while (this.curMesh == null || this.curMesh.frameIndex < videoSampleIndex) {
                    if (!this._updateMesh(this.clientBuffers.posBuf, this.clientBuffers.uvBuf, this.clientBuffers.indexBuf, this.clientBuffers.norBuf)) {
                        break;
                    }
                }

                this._logDebug("updated to frame index = " + videoSampleIndex);

                // Don't update texture unless we were able to update mesh to target frame (the only reason this should ever be possible is if the mesh data isn't downloaded yet)
                // Note that we're not stopping the video -> texture -> pbo -> watermark loop from continuing, not sure if this matters?
                if (this.curMesh.frameIndex == videoSampleIndex) {
                    var w = currentVideo.videoWidth
                    var h = currentVideo.videoHeight
                    if (isCap) {
                        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.fbo1)
                        gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textures[readPbo], 0)
                        gl.readBuffer(gl.COLOR_ATTACHMENT0)
                        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.fbo2)
                        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.clientBuffers.tex, 0)
                        gl.drawBuffers([gl.COLOR_ATTACHMENT0])
                        gl.checkFramebufferStatus(gl.READ_FRAMEBUFFER)
                        gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER)
                        gl.blitFramebuffer(0, 0, w, h, 0, 0, w, h, gl.COLOR_BUFFER_BIT, gl.NEAREST)
                    } else {
                        gl.bindTexture(gl.TEXTURE_2D, this.clientBuffers.tex)
                        gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, w, h)
                    }
                }
            if(this.curMesh && this.curMesh.frameIndex != videoSampleIndex)
                this._logInfo("texture (" + videoSampleIndex + ") <-> mesh (" + this.curMesh.frameIndex + ") mismatch");
            this.lastVideoSampleIndex = videoSampleIndex
        } else {
                this._logWarning("ran out of mesh data, suspending video " + currentVideo.mp4Name)
                currentVideo.pause()
                this.needMeshData = this.suspended = true
                this.pendingBufferDownload || this._loadNextBuffer()
            }
        gl.bindFramebuffer(gl.FRAMEBUFFER, saveFbo);
        gl.bindTexture(gl.TEXTURE_2D, saveTex)
    }
    if (this.curMesh) {
        this.currentFrameInfo.primCount = this.curMesh.indexCount;
        this.currentFrameInfo.frameIndex = this.curMesh.frameIndex;
        if (this.onUpdateCurrentFrame) this.onUpdateCurrentFrame(this.curMesh.frameIndex);
        return true
    }
    return false
};

HoloVideoObject.prototype.close = function () {
    this.httpRequest && (this.httpRequest.abort(), this.httpRequest = null);
    this.dashPlayer && this.dashPlayer.reset();
    for (var a = 0; a < this.videoElements.length; ++a) this.videoElements[a].pause(), this.videoElements[a].removeAttribute("src");
    this.state = HoloVideoObject.States.Closed
};
HoloVideoObject.prototype.pause = function () {
    0 < this.videoElements.length && this.videoElements[this.currentVideoIndex] && (this.videoElements[this.currentVideoIndex].pause(), this.state = HoloVideoObject.States.Paused)
};
HoloVideoObject.prototype.setAudioVolume = function (a) {
    this.audioVolume = a;
    this.videoElements[this.currentVideoIndex].volume = a
};
HoloVideoObject.prototype.setAutoLooping = function (a) {
    this.openOptions.autoloop = a;
    this.videoElements[this.currentVideoIndex].loop = a
};
HoloVideoObject.prototype.setAudioEnabled = function (a) {
    this.videoElements[this.currentVideoIndex].muted = !a
};
HoloVideoObject.prototype.audioEnabled = function () {
    return !this.videoElements[this.currentVideoIndex].muted
};
HoloVideoObject.prototype.play = function () {
    var that = this;
    this.isSafari && this.videoElements[this.currentVideoIndex].pause();
    var playPromise = this.videoElements[this.currentVideoIndex].play();
    undefined !== playPromise && playPromise.then(function (b) {
        that.state = HoloVideoObject.States.Playing
    }).catch(function (b) {
        that._logInfo("play prevented: " + b)
    })
};
HoloVideoObject.prototype.open = function (gltfURL, options) {
    this.state >= HoloVideoObject.States.Opening && this.close();
    this.state = HoloVideoObject.States.Opening;
    this.urlRoot = gltfURL.substring(0, gltfURL.lastIndexOf("/") + 1);
    this.meshFrames = [];
    this.videosLoaded = this.buffersLoaded = 0;
    this.freeArrayBuffers = [];
    this.freeVideoElements = [];
    this.buffers = [];
    undefined === this.videoElements && (this.videoElements = []);
    this.nextBufferLoadIndex = this.nextVideoLoadIndex = 0;
    this.videoState = HoloVideoObject.VideoStates.Undefined;
    this.currentFrameInfo = {primCount: 0};
    this.currentVideoIndex = 0;
    this.currentBufferIndex = -1;
    this.lastUpdate = this.lastVideoTime = 0;
    this.json = null;
    this.fileInfo = {haveNormals: false, octEncodedNormals: false};
    this.openOptions = options ? options : {};
    this.openOptions.minBuffers || (this.openOptions.minBuffers = 2);
    this.openOptions.maxBuffers || (this.openOptions.maxBuffers = 3);
    if (this.readFences) for (options = 0; options < this.readFences.length; ++options) this.readFences[options] && (this.gl.deleteSync(this.readFences[options]), this.readFences[options] = null);
    this.nextPbo = 0;
    this.prevPrevMesh = this.prevMesh = this.curMesh =
        null;
    this.lastVideoSampleIndex = this.lastKeyframe = this.frameIndex = -1;
    this.filledFallbackFrame = false;
    this.fallbackTextureImage = this.fallbackFrameBuffer = null;
    this.eos = false;
    this._loadJSON(gltfURL, this._onJsonLoaded.bind(this))
};
"undefined" != typeof THREE && (HoloVideoObjectThreeJS = function (renderer, c, callback, f) {
    var hvo = new HoloVideoObject(renderer.getContext(), callback);
    this.hvo = hvo;
    this.renderer = renderer;
    hvo.onEndOfStream = this._hvoOnEndOfStream.bind(this);
    hvo.onUpdateCurrentFrame = f;
    hvo.onLoaded = function (fileInfo) {
        this.fileInfo = fileInfo;

        var useNormals = fileInfo.haveNormals

        var unlitMaterial = new THREE.MeshBasicMaterial({map: null, transparent: false, side: THREE.DoubleSide})
        var litMaterial = new THREE.MeshLambertMaterial({map: null, transparent: false, side: THREE.DoubleSide})

        if (this.mesh) {
            fileInfo = useNormals ? litMaterial : unlitMaterial
            fileInfo.map = this.mesh.material.map
            this.mesh.material = fileInfo;
        } else {
            var gl = renderer.getContext()
            var bufferGeometry = new THREE.BufferGeometry;
            bufferGeometry.boundingSphere = new THREE.Sphere;
            bufferGeometry.boundingSphere.set(new THREE.Vector3, Infinity);
            bufferGeometry.boundingBox = new THREE.Box3;
            bufferGeometry.boundingBox.set(
                new THREE.Vector3(-Infinity, -Infinity, -Infinity),
                new THREE.Vector3(Infinity, Infinity, Infinity)
            );

            var p = gl.createBuffer(),
                u = 120 <= THREE.REVISION ? new THREE.GLBufferAttribute(p, gl.FLOAT, 3, 0) : new THREE.GLBufferAttribute(gl, p, gl.FLOAT, 3, 0);
            bufferGeometry.setAttribute("position", u);
            u = null;
            if (useNormals) {
                u = gl.createBuffer();
                var r = 120 <= THREE.REVISION
                    ? new THREE.GLBufferAttribute(u, gl.FLOAT, 3, 0)
                    : new THREE.GLBufferAttribute(gl, u, gl.FLOAT, 3, 0);
                bufferGeometry.setAttribute("normal", r)
            }
            r = gl.createBuffer();
            var q = 120 <= THREE.REVISION ? new THREE.GLBufferAttribute(r, gl.UNSIGNED_SHORT, 2, 0) : new THREE.GLBufferAttribute(gl, r, gl.UNSIGNED_SHORT, 2, 0);
            q.normalized = true;
            bufferGeometry.setAttribute("uv", q);
            q = gl.createBuffer();
            var t = 120 <= THREE.REVISION ? new THREE.GLBufferAttribute(q, gl.UNSIGNED_SHORT, 2, 0) : new THREE.GLBufferAttribute(gl, q, gl.UNSIGNED_SHORT, 2, 0);
            bufferGeometry.setIndex(t);
            var v = new THREE.Texture;
            v.encoding =
                THREE.sRGBEncoding;
            t = renderer.properties.get(v);
            t.__webglTexture = gl.createTexture();
            var x = gl.getParameter(gl.TEXTURE_BINDING_2D);
            gl.bindTexture(gl.TEXTURE_2D, t.__webglTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fileInfo.videoWidth, fileInfo.videoHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, x);
            fileInfo = useNormals ? litMaterial : unlitMaterial;
            fileInfo.map = v;
            fileInfo = new THREE.Mesh(bufferGeometry, fileInfo);
            fileInfo.scale.x = .001;
            fileInfo.scale.y = .001;
            fileInfo.scale.z = .001;
            hvo.setBuffers(p, q, r, u, t.__webglTexture);
            this.mesh = fileInfo;
            this.bufferGeometry = bufferGeometry
        }
        this.state = this.hvo.state;
        c(this.mesh)
    }.bind(this);
    var g = renderer.getContext();
    callback = g.canvas;
    callback.addEventListener("webglcontextlost", function (d) {
        this.mesh && g.deleteTexture(this.mesh.material.map.__webglTexture)
    }.bind(this), false);
    callback.addEventListener("webglcontextrestored", function (d) {
        if (this.mesh) {
            var k = this.mesh.geometry, m = this.renderer;
            m.geometries.update(k);
            var n = null, h;
            d = k.attributes.position.buffer;
            if (h = k.attributes.normal) n = h.buffer;
            h = k.attributes.uv.buffer;
            k = k.getIndex().buffer;
            var l = new THREE.Texture;
            l.encoding = THREE.sRGBEncoding;
            m = m.properties.get(l);
            m.__webglTexture = g.createTexture();
            var p = g.getParameter(g.TEXTURE_BINDING_2D);
            g.bindTexture(g.TEXTURE_2D, m.__webglTexture);
            g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, this.fileInfo.videoWidth, this.fileInfo.videoHeight, 0, g.RGBA, g.UNSIGNED_BYTE, null);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S,
                g.CLAMP_TO_EDGE);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
            g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
            g.bindTexture(g.TEXTURE_2D, p);
            this.mesh.material.map = l;
            this.hvo.setBuffers(d, k, h, n, m.__webglTexture);
            this.hvo.updateToLastKeyframe();
            this.bufferGeometry.index.count = 0
        }
    }.bind(this), false)
}, HoloVideoObjectThreeJS.prototype._hvoOnEndOfStream = function (a) {
        if (this.onEndOfStream) this.onEndOfStream(this)
}, HoloVideoObjectThreeJS.prototype.open = function (url, options) {
        if (this.state > HoloVideoObject.States.Empty) {
            this.close();
        }
        this.hvo.open(url, options);
        this.state = this.hvo.state
}, HoloVideoObjectThreeJS.prototype.update = function () {
    this.hvo && this.mesh && (this.state = this.hvo.state);
    if (this.hvo.updateBuffers()) {
        var min = this.hvo.currentFrameInfo.bboxMin
        var max = this.hvo.currentFrameInfo.bboxMax

        var bufferGeometry = this.bufferGeometry;

        bufferGeometry.boundingBox.min.x = min[0];
        bufferGeometry.boundingBox.min.y = min[1];
        bufferGeometry.boundingBox.min.z = min[2];
        bufferGeometry.boundingBox.max.x = max[0];
        bufferGeometry.boundingBox.max.y = max[1];
        bufferGeometry.boundingBox.max.z = max[2];

        bufferGeometry.boundingBox.getCenter(bufferGeometry.boundingSphere.center);
        var maxSide = Math.max(max[0] - min[0], max[1] - min[1], max[2] - min[2]);
        bufferGeometry.boundingSphere.radius =  maxSide * 0.5;
        bufferGeometry.index.count = this.hvo.currentFrameInfo.primCount
    }
}, HoloVideoObjectThreeJS.prototype.rewind = function () {
    this.hvo.rewind()
}, HoloVideoObjectThreeJS.prototype.play = function () {
    this.hvo.state == HoloVideoObject.States.Opening ? this.hvo.forceLoad() : this.hvo.state >= HoloVideoObject.States.Opened && this.hvo.state != HoloVideoObject.States.Playing && this.hvo.play()
}, HoloVideoObjectThreeJS.prototype.close = function () {
    this.bufferGeometry && (this.bufferGeometry.index.count =
        0);
    this.hvo.close()
}, HoloVideoObjectThreeJS.prototype.pause = function () {
    this.hvo.pause()
}, HoloVideoObjectThreeJS.prototype.setLogLevel = function (a) {
    this.hvo.logLevel = a
}, HoloVideoObjectThreeJS.prototype.setAudioEnabled = function (a) {
    this.hvo.setAudioEnabled(a)
}, HoloVideoObjectThreeJS.prototype.audioEnabled = function () {
    return this.hvo.audioEnabled()
}, HoloVideoObjectThreeJS.prototype.setAudioVolume = function (a) {
    this.hvo.setAudioVolume(a)
}, HoloVideoObjectThreeJS.prototype.setAutoLooping = function (a) {
    this.hvo.setAutoLooping(a)
});
HoloVideoObject._instanceCounter = 0;
HoloVideoObject.States = {Closed: -1, Empty: 0, Opening: 1, Opened: 2, Playing: 3, Paused: 4};
HoloVideoObject.StreamMode = {Automatic: 0, MP4: 1, HLS: 2, Dash: 3};
HoloVideoObject.VideoStates = {
    Undefined: 0,
    CanPlay: 1,
    CanPlayThrough: 2,
    Waiting: 3,
    Suspended: 4,
    Stalled: 5,
    Playing: 6
};
HoloVideoObject._extName = "HCAP_holovideo";
HoloVideoObject.Version = {};
HoloVideoObject.Version.Major = 1;
HoloVideoObject.Version.Minor = 2;
HoloVideoObject.Version.Patch = 9;
HoloVideoObject.Version.String = HoloVideoObject.Version.Major + "." + HoloVideoObject.Version.Minor + "." + HoloVideoObject.Version.Patch;
