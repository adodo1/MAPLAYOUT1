define(["text!./DrawingTool.html",
		"text!../Drawing/symbolDrawing/symbolDrawing.html",
		"text!../Drawing/colorpicker/colorpicker.html",
		"../map/map"],
		function(DrawingTool, symbolDrawing, colorpicker, map) {

	var tool = {
		_map: null,
		init: function(evt) {
			var me = this;
			if (document.getElementById('DrawingTool') == null) {
				$('.container').append(DrawingTool)
			}
			if ($("#DrawingTool").is(":hidden")) {
				$("#DrawingTool").show()
			}
			$('.leftPanel-btn.edit').unbind('click').bind('click', function() {
				if ($("#DrawingTool").is(":hidden")) {
					$("#DrawingTool").show()
				} else {
					$("#DrawingTool").hide();
					$("#symbol_panel").remove();
					$("#colorpickerHolder2").remove()
				}
			});
			me._map = map._mMap;
			me.bindEvents(evt)
		},
		bindEvents: function(evt) {

			debugger;
			
			var me = this;
			var list1 = new Array();
			var list2 = new Array();
			for (var i = evt.length - 1; i >= 0; i--) {
				if (evt[i].metadata != null) {
					list1[list1.length] = evt[i].metadata["deqing:group"]
				} else {
					list2[list2.length] = evt[i].id
				}
			};
			var result = [];
			for (var i = 0; i < list1.length; i++) {
				if (result.indexOf(list1[i]) == -1) {
					result.push(list1[i])
				}
			}
			for (var i = 0; i < result.length; i++) {
				$(".list-title").append("<li id='list" + i + "' class='layerList'><span id='file' class='icon-folder-close' aria-hidden='true' style='color: white;margin-right: 3px'></span>" + "<a href='#' style='display: inline'>" + result[i] + "</a><button id='number' style='color: white'></button></li>")
			}
			for (var i = 0; i < list2.length; i++) {
				for (var j = 0; j < evt.length; j++) {
					if (list2[i] == evt[j].id && evt[j].type == "symbol") {
						$(".list-title").append("<li id='" + list2[i] + "' class='layer_list'><span style='width: 2px;background-color: rgba(187, 255, 102, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-map-marker' aria-hidden='true'></span><a href='#' style='display: inline'>" + list2[i] + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true' style='color: #b4b4b4' id='" + list2[i] + "'></span></a></li>")
					} else if (list2[i] == evt[j].id && evt[j].type == "line") {
						$(".list-title").append("<li id='" + list2[i] + "' class='layer_list'><span style='width: 2px;background-color: rgba(255, 68, 85, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-resize-full' aria-hidden='true'></span><a href='#' style='display: inline'>" + list2[i] + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true'  style='color: #b4b4b4' id='" + list2[i] + "'></span></a></li>")
					} else if (list2[i] == evt[j].id && evt[j].type == "fill") {
						$(".list-title").append("<li id='" + list2[i] + "' class='layer_list'><span style='width: 2px;background-color: rgba(255, 204, 68, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-cloud' aria-hidden='true'></span><a href='#' style='display: inline'>" + list2[i] + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true' style='color: #b4b4b4' id='" + list2[i] + "' ></span></a></li>")
					} else if (list2[i] == evt[j].id && evt[j].type == "background") {
						$(".list-title").append("<li id='" + list2[i] + "' class='layer_list'><span style='width: 2px;background-color: rgba(255, 204, 68, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-cloud' aria-hidden='true'></span><a href='#' style='display: inline'>" + list2[i] + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true' style='color: #b4b4b4' id='" + list2[i] + "' ></span></a></li>")
					}
				}
			}

			for (var i = evt.length - 1; i >= 0; i--) {
				if (evt[i].metadata != null) {
					for (var j = 0; j < result.length; j++) {
						if (result[j] == evt[i].metadata["deqing:group"] && evt[i].type == "symbol") {
							$("#list" + j).append("<ul style='display: none;'><li id='" + evt[i].id + "' class='layer_list'><span style='width: 2px;background-color: rgba(187, 255, 102, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-map-marker' aria-hidden='true'></span><a href='#' style='display: inline'>" + evt[i].id + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true' style='color: #b4b4b4' id='" + evt[i].id + "'></span></a></li></ul>")
						} else if (result[j] == evt[i].metadata["deqing:group"] && evt[i].type == "line") {
							$("#list" + j).append("<ul style='display: none;'><li id='" + evt[i].id + "' class='layer_list'><span style='width: 2px;background-color: rgba(255, 68, 85, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-resize-full' aria-hidden='true'></span><a href='#' style='display: inline'>" + evt[i].id + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true'  style='color: #b4b4b4' id='" + evt[i].id + "'></span></a></li></ul>")
						} else if (result[j] == evt[i].metadata["deqing:group"] && evt[i].type == "fill") {
							$("#list" + j).append("<ul style='display: none;'><li id='" + evt[i].id + "' class='layer_list'><span style='width: 2px;background-color: rgba(255, 204, 68, 0.74902);padding-left: 1px;padding-right: 1px;'></span>" + "<span class='icon-cloud' aria-hidden='true'></span><a href='#' style='display: inline'>" + evt[i].id + "</a><a href='#' style='display: inline'><span class='glyphicon glyphicon-eye-open layershow' aria-hidden='true' style='color: #b4b4b4' id='" + evt[i].id + "' ></span></a></li></ul>")
						}
					}
				}
			}
			for (var i = 0; i < result.length; i++) {
				var j = $('#list' + i).find("ul").length;
				$(".list-title #list" + i).find("button")[0].innerHTML = j
			}
			$('.layerList').unbind('click').bind('click', function() {
				var id = this.id;
				if ($("#" + id).find("ul").css("display") === 'block') {
					$("#" + id).find("ul").css("display", "none");
					$(this).find("#file").removeClass('icon-folder-open');
					$(this).find("#file").addClass('icon-folder-close')
				} else {
					$("#" + id).find("ul").css("display", "block");
					$(this).find("#file").removeClass('icon-folder-close');
					$(this).find("#file").addClass('icon-folder-open')
				}
			});
			var id;
			$('.layer_list').unbind('click').bind('click', function() {
				event.stopPropagation();
				var curId = this.id;
				for (var i = 0; i < evt.length; i++) {
					if (this.id == evt[i].id) {
						if (this.id == id) {
							id = null;
							require(["./components/Drawing/symbolDrawing/symbolDrawing"], function(symbolDrawing) {
								symbolDrawing.removePanel()
							})
						} else if (this.id != id && id != null) {
							id = this.id;
							require(["./components/Drawing/symbolDrawing/symbolDrawing"], function(symbolDrawing) {
								symbolDrawing.removePanel()
							});
							require(["./components/map/map"], function(map) {
								map.myselfSymbolLayer(id)
							})
						} else {
							id = this.id;
							require(["./components/map/map"], function(map) {
								map.myselfSymbolLayer(id)
							})
						}
					}
				}
			});
			$(function() {
				$('.layer_list').mouseenter(function() {
					var curId = this.id;
					for (var i = 0; i < evt.length; i++) {
						if (curId == evt[i].id) {
							$(this).find(".layershow").show();
						}
					}
				});
				$('.layer_list').mouseleave(function() {
					var curId = this.id;
					for (var i = 0; i < evt.length; i++) {
						if (curId == evt[i].id) {
							$(".layershow").hide();
						}
					}
				})
			});
			$('.layershow').unbind('click').bind('click', function(event) {
				var curId = this.id;
				for (var i = 0; i < evt.length; i++) {
					if (curId == evt[i].id) {
						var visibility = me._map.getLayoutProperty(curId, 'visibility');
						if (visibility == undefined) {
							me._map.setLayoutProperty(curId, 'visibility', 'visible')
						}
						visibility = me._map.getLayoutProperty(curId, 'visibility');
						if (visibility == 'visible') {
							me._map.setLayoutProperty(curId, 'visibility', 'none');
							$(this).removeClass('glyphicon-eye-open');
							$(this).addClass('glyphicon-eye-close')
						} else {
							me._map.setLayoutProperty(curId, 'visibility', 'visible');
							$(this).removeClass('glyphicon-eye-close');
							$(this).addClass('glyphicon-eye-open')
						}
					}
				}
				event.stopPropagation();
			});
			$('.panelclose').unbind('click').bind('click', function(event) {
				$("#DrawingTool").hide();
				$("#symbol_panel").remove();
				$("#colorpickerHolder2").remove()
			})
		}
	};
	return tool
});