define(["text!./symbolDrawing.html",
        "text!../colorpicker/colorpicker.html"], function(symbolDrawing, colorpicker) {
    var tool = {
        init: function(evt) {
            $('.container').append(symbolDrawing);
            var me = this;
            me.bindEvents(evt);
        },
        bindEvents: function(evt) {
            if (evt.type == "symbol") {
                $("#symbol_panel .header").append("<span style='width: 2px;background-color: rgba(187, 255, 102, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" +
                    "<span class='icon-map-marker' style='color: white' aria-hidden='true'></span><h5 class='namechange' contentEditable='true' style='display: inline'>" + evt.id + "</h5>" +
                    "<span class='toolclose icon-remove' ></span>");
                for (var i in evt.paint) {
                    if (i == "text-color") {
                        $(".body").append("<div class='symbol_text_color'><h5>注记颜色</h5><input type='text' class='text_color' value='" + evt.paint[i] + "' /></div>");
                    } else if (i == "text-halo-color") {
                        $(".body").append("<div class='symbol_text_halo_color'><h5>晕线颜色</h5><input type='text' class='text_halo_color' value='" + evt.paint[i] + "' /></div>");
                    } else if (i == "text-halo-width") {
                        $(".body").append("<div class='symbol_text_halo_width'><h5>晕线宽度<span id='text_halo_width'  style='float:right' >" + evt.paint[i] + "px" + "</span></h5><input id='textHaloWidth' type='range' min='0' max='10' step='0' value='" + evt.paint[i] + "' /></div>");
                    }
                }
                for (var i in evt.layout) {
                    if (i == "text-field") {
                        $(".body").append("<div class='symbol_text_field'><h5>注记内容</h5><input type='text' class='text_field' value='" + evt.layout[i] + "' /></div>");
                    } else if (i == "text-anchor") {
                        $(".body").append("<div class='symbol_text_anchor'><h5 style='margin-bottom: 25px'>注记位置<span id='glyphicon-align-left' class='glyphicon1 glyphicon glyphicon-align-left' style='float: right'></span>" +
                            "<span id='glyphicon-align-center' class='glyphicon1 glyphicon glyphicon-align-center' style='float: right'></span>" +
                            "<span id='glyphicon-align-right' class='glyphicon1 glyphicon glyphicon-align-right' style='float: right'></span></h5></div>");
                        if (evt.layout[i] == "right") {
                            var div1 = document.getElementById('glyphicon-align-left');
                            div1.style.color = "#7B7B7B";
                        } else if (evt.layout[i] == "center") {
                            var div1 = document.getElementById('glyphicon-align-center');
                            div1.style.color = "#7B7B7B";
                        } else if (evt.layout[i] == "left") {
                            var div1 = document.getElementById('glyphicon-align-right');
                            div1.style.color = "#7B7B7B";
                        }
                    } else if (i == "text-padding") {
                        $(".body").append("<div class='symbol_text_padding'><h5>注记冲突大小</h5><input type='text' class='text_padding' value='" + evt.layout[i] + "' /></div>");
                    } else if (i == "text-size") {
                        if (typeof evt.layout[i] == 'object') {
                            $(".body").append("<div class='symbol_text_size'><h5>注记大小</h5>等级<input type='text' class='text_size_layer text_size_layer1' value='" + evt.layout[i].stops[0][0] + "' style='width: 25%'/>" +
                                "大小<input type='text' class='text_size_layer text_size_layer2' value='" + evt.layout[i].stops[0][1] + "' style='width: 25%; margin-right: 0px'/>" +
                                "等级<input type='text' class='text_size_layer text_size_layer3' value='" + evt.layout[i].stops[1][0] + "' style='width: 25%;' />" +
                                "大小<input type='text' class='text_size_layer text_size_layer4' value='" + evt.layout[i].stops[1][1] + "' style='width: 25%; margin-right: 0px' /></div>");
                        } else {
                            $(".body").append("<div class='symbol_text_size'><h5>注记大小</h5><input type='text' class='text_size' value='" + evt.layout[i] + "' /></div>");
                        }
                    } else if (i == "text-offset") {
                        $(".body").append("<div class='symbol_text_offset'><h5>注记偏移</h5>X<input type='text' class='text_offset text_offset1' value='" + evt.layout[i][0] + "' style='width: 35%;margin-bottom: 20px;' />" +
                            "Y<input type='text' class='text_offset text_offset2' value='" + evt.layout[i][1] + "' style='width: 35%;margin-bottom: 20px;' /></div>");
                    } else if (i == "text-justify") {
                        $(".body").append("<div class='symbol_text_justify'><h5>注记对齐<span id='align-left' class='glyphicon2 glyphicon glyphicon-align-left' style='float: right'></span>" +
                            "<span id='align-center' class='glyphicon2 glyphicon glyphicon-align-center' style='float: right'></span>" +
                            "<span id='align-right' class='glyphicon2 glyphicon glyphicon-align-right' style='float: right'></span></h5></div>");
                        if (evt.layout[i] == "right") {
                            var div1 = document.getElementById('align-left');
                            div1.style.color = "#7B7B7B";
                        } else if (evt.layout[i] == "center") {
                            var div1 = document.getElementById('align-center');
                            div1.style.color = "#7B7B7B";
                        } else if (evt.layout[i] == "left") {
                            var div1 = document.getElementById('align-right');
                            div1.style.color = "#7B7B7B";
                        }
                    }
                }
                $(".body").append("<div class='symbol_icon_image'><h5>图标</h5></div>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/bicycle-15.svg' name='bicycle-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/airport-15.svg' name='airport-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/fuel-15.svg' name='fuel-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/music-15.svg' name='music-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/shop-15.svg' name='shop-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/star-15.svg' name='star-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/zoo-15.svg' name='zoo-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/bus-15.svg' name='bus-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/cafe-15.svg' name='cafe-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/college-15.svg' name='college-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/library-15.svg' name='library-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/doctor-15.svg' name='doctor-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/theatre-15.svg' name='theatre-11'>");
                $(".symbol_icon_image").append("<img class='symbol-sprite' src='icons/school-15.svg' name='school-11'>");
                this.onchangeSymbol(evt.id);
            } else if (evt.type == "line") {
                $("#symbol_panel .header").append("<span style='width: 2px;background-color: rgba(255, 68, 85, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" +
                    "<span class='icon-resize-full' style='color: white' aria-hidden='true'></span><h5 class='namechange' contentEditable='true' style='display: inline'>" + evt.id + "</h5>" +
                    "<span class='toolclose icon-remove'></span>");
                for (var i in evt.paint) {
                    if (i == "line-color") {
                        $(".body").append("<div class='line_color'><h5>颜色</h5><input type='text' class='line_line_color' value='" + evt.paint[i] + "' /></div>");
                    } else if (i == "line-opacity") {
                        if (typeof evt.paint[i] == 'object') {
                            $(".body").append("<div class='line_opacity'><h5>透明度<span id='line-opacity' style='float:right'>" + evt.paint[i].stops[0] + "</span></h5><input id='lineOpacity' type='range' min='" + evt.paint[i].stops[0][1] + "' max='" + evt.paint[i].stops[1][1] + "' step='0' value='" + evt.paint[i] * 10 + "' /></div>");
                        } else {
                            $(".body").append("<div class='line_opacity'><h5>透明度<span id='line-opacity' style='float:right'>" + evt.paint[i] + "</span></h5><input id='lineOpacity' type='range' min='0' max='10' step='0' value='" + evt.paint[i] * 10 + "' /></div>");
                        }
                    } else if (i == "line-width") {
                        if (typeof evt.paint[i] == 'object') {
                            var l = evt.paint[i].stops.length - 1;
                            $(".body").append("<div class='line_width'><h5>线宽<span id='line-value' style='float:right'>" + evt.paint[i].stops[0][1] + "px" + "</span></h5><input id='lineWidth' type='range' min='" + evt.paint[i].stops[0][1] + "' max='" + evt.paint[i].stops[l][1] + "' step='0' value='" + evt.paint[i].stops[0][1] + "' /></div>");
                        } else {
                            $(".body").append("<div class='line_width'><h5>线宽<span id='line-value' style='float:right'>" + evt.paint[i] + "px" + "</span></h5><input id='lineWidth' type='range' min='0' max='10' step='0' value='" + evt.paint[i] + "' /></div>");
                        }
                    }
                }
                for (var i in evt.layout) {
                    if (i == "line-cap") {
                        $(".body").append("<div class='line_cap'><h5>线端口</h5><select id='line-cap'><option value='round'>round</option><option value='butt'>butt</option><option value='square'>square</option></select></div>");
                    } else if (i == "line-join") {
                        $(".body").append("<div class='line_join'><h5>线连接</h5><select id='line-join'><option value='round'>round</option><option value='bevel'>bevel</option><option value='miter'>miter</option></select></div>");
                    }
                }
                this.onchangeLine(evt.id);
            } else {
                $("#symbol_panel .header").append("<span style='width: 2px;background-color: rgba(255, 204, 68, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" +
                    "<span class='icon-cloud' style='color: white' aria-hidden='true'></span><h5 class='namechange' contentEditable='true' style='display: inline'>" + evt.id + "</h5>" +
                    "<span class='toolclose icon-remove' ></span>");
                for (var i in evt.paint) {
                    if (i == "fill-color") {
                        $(".body").append("<div class='fill_color'><h5>颜色</h5><input type='text' class='fill_fill_color' value='" + evt.paint[i] + "' /></div>");
                    } else if (i == "background-color") {
                        $(".body").append("<div class='background_color'><h5>颜色</h5><input type='text' class='fill_background_color' value='" + evt.paint[i] + "' /></div>");
                    } else if (i == "fill-opacity") {
                        if (typeof evt.paint[i] == 'object') {
                            $(".body").append("<div class='fill_opacity'><h5>透明度<span id='fill-opacity' style='float:right'>" + evt.paint[i].stops[0][1] + "</span></h5><input id='fillOpacity' type='range' min='0' max='1' step='0' value='" + evt.paint[i].stops[0][1] + "' /></div>");
                        } else {
                            $(".body").append("<div class='fill_opacity'><h5>透明度<span id='fill-opacity' style='float:right'>" + evt.paint[i] + "</span></h5><input id='fillOpacity' type='range' min='0' max='10' step='0' value='" + evt.paint[i] * 10 + "' /></div>");
                        }
                    }

                }
                this.onchangeFill(evt.id);
            }
            $('.toolclose').unbind('click').bind('click', function(event) {
                $("#symbol_panel").remove();
                $("#colorpickerHolder2").remove();
            });
        },
        // onchangeName:function () {
        //     $(".namechange").unbind('click').bind('click',function(){
        //         var layername = $(".namechange").val();
        //         alert(layername);
        //         require(["./components/map/map"],function(map){
        //             map.nameChange(evt,layername);
        //         });
        //     })
        // },
        onchangeSymbol: function(evt) {
            $(".text_color").unbind('click').bind('click', function() {
                $("#colorpickerHolder2").remove();
                var className = this.className;
                require(["./components/Drawing/colorpicker/colorpicker"], function(colorpicker) {
                    colorpicker.init(evt, className);
                });
            });
            $(".text_halo_color").unbind('click').bind('click', function() {
                $("#colorpickerHolder2").remove();
                var className = this.className;
                require(["./components/Drawing/colorpicker/colorpicker"], function(colorpicker) {
                    colorpicker.init(evt, className);
                });
            });
            $("#textHaloWidth").unbind('click').bind('click', function(e) {
                $("#colorpickerHolder2").hide();
                var textHaloWidth = document.getElementById('text_halo_width');
                require(["./components/map/map"], function(map) {
                    map.symbolHaloWidthChange(evt, e.target.value);
                })
                textHaloWidth.textContent = e.target.value + 'px';
            });
            $(".symbol-sprite").unbind('click').bind('click', function() {
                $("#colorpickerHolder2").hide();
                var iconName = this.name;
                require(["./components/map/map"], function(map) {
                    map.symbolIcon(evt, iconName);
                    map.symbolTextanchor(evt, "left");
                    map.symbolTextoffset(evt, [0.6, 0]);
                })
            });
            $(".symbol_text_field").bind("input propertychange", function() {
                var text = $(".text_field").val();
                require(["./components/map/map"], function(map) {
                    map.symbolTextfield(evt, text);
                })
            });
            $(".glyphicon1").unbind('click').bind('click', function() {
                var value = this.classList[2];
                var div1 = document.getElementById('glyphicon-align-left');
                var div2 = document.getElementById('glyphicon-align-center');
                var div3 = document.getElementById('glyphicon-align-right');
                if (value == "glyphicon-align-left") {
                    div1.style.color = "#7B7B7B";
                    div2.style.color = "white";
                    div3.style.color = "white";
                    require(["./components/map/map"], function(map) {
                        map.symbolTextanchor(evt, "right");
                    })
                } else if (value == "glyphicon-align-center") {
                    div2.style.color = "#7B7B7B";
                    div1.style.color = "white";
                    div3.style.color = "white";
                    require(["./components/map/map"], function(map) {
                        map.symbolTextanchor(evt, "center");
                    })
                } else if (value == "glyphicon-align-right") {
                    div3.style.color = "#7B7B7B";
                    div2.style.color = "white";
                    div1.style.color = "white";
                    require(["./components/map/map"], function(map) {
                        map.symbolTextanchor(evt, "left");
                    })
                }
            });
            $(".symbol_text_padding").bind("input propertychange", function() {
                var text = parseInt($(".text_padding").val());
                require(["./components/map/map"], function(map) {
                    map.symbolTextpadding(evt, text);
                })
            });
            $(".glyphicon2").unbind('click').bind('click', function() {
                var value = this.id;
                var div1 = document.getElementById('align-left');
                var div2 = document.getElementById('align-center');
                var div3 = document.getElementById('align-right');
                if (value == "align-left") {
                    div1.style.color = "#7B7B7B";
                    div2.style.color = "white";
                    div3.style.color = "white";
                    require(["./components/map/map"], function(map) {
                        map.symbolTextjustify(evt, "right");
                    })
                } else if (value == "align-center") {
                    div2.style.color = "#7B7B7B";
                    div1.style.color = "white";
                    div3.style.color = "white";
                    require(["./components/map/map"], function(map) {
                        map.symbolTextjustify(evt, "center");
                    })
                } else if (value == "align-right") {
                    div3.style.color = "#7B7B7B";
                    div2.style.color = "white";
                    div1.style.color = "white";
                    require(["./components/map/map"], function(map) {
                        map.symbolTextjustify(evt, "left");
                    })
                }
            });
            $(".symbol_text_offset").bind("input propertychange", function() {
                var text1 = parseFloat($(".text_offset1").val());
                var text2 = parseFloat($(".text_offset2").val());
                var text = [text1, text2];
                require(["./components/map/map"], function(map) {
                    map.symbolTextoffset(evt, text);
                })
            });
            $(".symbol_text_size").bind("input propertychange", function() {
                var text1 = parseInt($(".text_size_layer1").val());
                var text2 = parseInt($(".text_size_layer2").val());
                var text3 = parseInt($(".text_size_layer3").val());
                var text4 = parseInt($(".text_size_layer4").val());
                var text = new Array(text1, text2, text3, text4)
                require(["./components/map/map"], function(map) {
                    map.symbolTextsize(evt, text);
                })
            });
        },
        onchangeLine: function(evt) {
            $(".line_line_color").unbind('click').bind('click', function() {
                var className = this.className;
                require(["./components/Drawing/colorpicker/colorpicker"], function(colorpicker) {
                    colorpicker.init(evt, className);
                });
            });
            $("#lineWidth").unbind('click').bind('click', function(e) {
                $("#colorpickerHolder2").hide();
                var lineWidth = document.getElementById('line-value');
                require(["./components/map/map"], function(map) {
                    map.lineWidthChange(evt, e.target.value);
                })
                lineWidth.textContent = e.target.value + 'px';
            });
            $("#lineOpacity").unbind('click').bind('click', function(e) {
                $("#colorpickerHolder2").hide();
                var lineOpacity = document.getElementById('line-opacity');
                require(["./components/map/map"], function(map) {
                    map.lineOpacityChange(evt, e.target.value);
                })
                lineOpacity.textContent = e.target.value / 10;
            });
            $("#line-cap").unbind('click').bind('click', function(e) {
                $("#colorpickerHolder2").hide();
                var line_cap = document.getElementById('line-cap');
                require(["./components/map/map"], function(map) {
                    map.lineCapChange(evt, line_cap.value);
                })
            });
            $("#line-join").unbind('click').bind('click', function(e) {
                $("#colorpickerHolder2").hide();
                var line_join = document.getElementById('line-join');
                require(["./components/map/map"], function(map) {
                    map.lineJoinChange(evt, line_join.value);
                })
            });
        },
        onchangeFill: function(evt) {
            $(".fill_fill_color").unbind('click').bind('click', function() {
                var className = this.className;
                require(["./components/Drawing/colorpicker/colorpicker"], function(colorpicker) {
                    colorpicker.init(evt, className);
                });
            });
            $(".fill_background_color").unbind('click').bind('click', function() {
                var className = this.className;
                require(["./components/Drawing/colorpicker/colorpicker"], function(colorpicker) {
                    colorpicker.init(evt, className);
                });
            });
            $("#fillOpacity").unbind('click').bind('click', function(e) {
                $("#colorpickerHolder2").hide();
                var fillOpacity = document.getElementById('fill-opacity');
                require(["./components/map/map"], function(map) {
                    map.fillOpacityChange(evt, e.target.value);
                })
                fillOpacity.textContent = e.target.value / 10;
            });
        },
        removePanel: function() {
            $("#symbol_panel").remove();
            $("#colorpickerHolder2").remove();
        }
    }
    return tool;
})