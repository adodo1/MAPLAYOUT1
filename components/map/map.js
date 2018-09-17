define(["text!./map.html", "text!../DrawingTool/DrawingTool.html"], function(map, DrawingTool) {
	var tool = {
		_mMap: null,
		pickopen: true,
		poiAddrData: null,
		currentMarker: null,
		init: function() {
			var me = this;
			$('.container').append(map);
			var me = this;
			var _map;
			var maps;
			var beforeMap;
			var afterMap;
			me.pickopen = false;
			$('#pickup').css({
				color: "rgba(0,0,0,0.2)"
			});
			me.bindEvents()
		},
		queryPOIData: function(key) {
			var me = this;
			var deqingpoiurl = "http://112.124.97.99:6080/arcgis/rest/services/dqpoi/MapServer/0";
			var deqingaddrurl = "http://112.124.97.99:6080/arcgis/rest/services/dqaddress/MapServer/0";
			var resulthtml = '';
			L.esri.query({
				url: deqingpoiurl
			}).where("NAME LIKE '%" + key + "%'").run(function(error, objc) {
				var features = objc.features;
				me.poiAddrData = features;
				for (var i = 0; i < features.length; i++) {
					if (i > 4) {
						break
					}
					var item = features[i];
					var properties = item.properties;
					var NAME = properties.NAME;
					resulthtml += '<div class="resultli">' + NAME + '</div>'
				}
				$("#queryresult").html(resulthtml)
			});
			$("#queryresult").delegate("div", "click", function() {
				var index = $(this).index();
				var text = $(this).text();
				if (index < me.poiAddrData.length && index >= 0) {
					if (me.currentMarker) {
						me.currentMarker.remove()
					}
					var selectdata = me.poiAddrData[index];
					var coordinates = selectdata.geometry.coordinates;
					var popup = new mapboxgl.Popup({
						offset: 25
					}).setText(text);
					var el = document.createElement('div');
					el.id = 'mymarker';
					me.currentMarker = new mapboxgl.Marker(el, {
						offset: [-12, -20]
					}).setLngLat(coordinates).setPopup(popup).addTo(me._mMap);
					me._mMap.flyTo({
						center: coordinates,
						zoom: 17,
						speed: 0.8,
					});
					$("#queryresult").html("");
					$("#querydis").val(text)
				}
			})
		},
		bindEvents: function(evt) {
			var me = this;
			$("#querydis").bind('input', function() {
				var text = $(this).val();
				me.queryPOIData(text);
				$(".clear").css("display", "block")
			});
			$(".clear").click(function() {
				$("#querydis").val("");
				$(".clear").css("display", "none");
				$("#queryresult").html("");
				if (me.currentMarker) {
					me.currentMarker.remove()
				}
			});
			mapboxgl.accessToken = 'pk.eyJ1IjoiaHQxMjM0IiwiYSI6ImNpd2V2eHM1YjBiNDEydGxrNnlsZDg0aGwifQ.k_LeBX44fxrOrnsHvkh2fQ';
			_map = new mapboxgl.Map({
				container: 'map',
				center: [119.974, 30.544],
				zoom: 14
			});
			$.getJSON("./components/map/Map/Basic.json", function(data) {
				_map.setStyle(data)
			});
			me._mMap = _map;
			_map.on('mousemove', function(e) {
				document.getElementById('info').innerHTML = '<span>' + "X:" + '</span>' + JSON.stringify(e.point.x.toString()) + '<span>' + "  Y:" + '</span>' + JSON.stringify(e.point.y.toString()) + '<br />' + '<span>' + "经度:" + '</span>' + JSON.stringify(e.lngLat.lng.toString().slice(0, 7)) + '<span>' + "  纬度:" + '</span>' + JSON.stringify(e.lngLat.lat.toString().slice(0, 6))
			});
			$('#pickup').unbind('click').bind('click', function() {
				if (me.pickopen == null || me.pickopen == false) {
					me.pickopen = true;
					$('#pickup').css({
						color: "black"
					})
				} else {
					me.pickopen = false;
					$('#pickup').css({
						color: "rgba(0,0,0,0.2)"
					})
				}
			});
			_map.on('click', function(e) {
				if (me.pickopen == true) {
					var feature = _map.queryRenderedFeatures(e.point);
					var popup = new mapboxgl.Popup({
						closeButton: true
					});
					var property = feature[0].properties;
					var layer = feature[0].layer;
					var layername = layer.id;
					var html = "";
					html += '<p class="pop-layer"><span><strong>' + "图层 " + ' </strong></span>' + '<span> ' + layer.id + '</span></p>';
					for (var keyv in property) {
						var value = property[keyv];
						if (value == "") continue;
						else html += '<div style="float: left;width: 100px;"><span class="pop-title"><strong>' + keyv + '</strong></span></div>' + '<div style="float: left"><span class="pop-value"> ' + value + '</span></div><br/>'
					}
					property = JSON.stringify(property);
					popup.setLngLat(e.lngLat).setHTML(html).addTo(_map)
				}
			});
			_map.addControl(new mapboxgl.NavigationControl());
			_map.addControl(new mapboxgl.FullscreenControl());
			_map.addControl(new mapboxgl.GeolocateControl());
			beforeMap = new mapboxgl.Map({
				container: 'before',
				center: [120.00, 30.565],
				zoom: 12
			});
			afterMap = new mapboxgl.Map({
				container: 'after',
				center: [120.00, 30.565],
				zoom: 12
			});
			$.getJSON("./components/map/Map/Dark.json", function(data) {
				beforeMap.setStyle(data)
			});
			$.getJSON("./components/map/Map/Light.json", function(data) {
				afterMap.setStyle(data)
			});
			maps = new mapboxgl.Compare(beforeMap, afterMap, {});
			$('#swipe').unbind('click').bind('click', function() {
				if ($("#map").is(":hidden")) {
					$("#map").show();
					$(".maps").hide();
					$("#info").show();
					$("#navigate").show()
				} else {
					$("#map").hide();
					$("#features").hide();
					$("#info").hide();
					$("#navigate").hide();
					$(".maps").show();
					$(".mapboxgl-compare").show()
				}
			});
			$('#tags').unbind('click').bind('click', function() {
				_map.setBearing(0);
				_map.setPitch(50);
				_map.flyTo({
					center: [119.969, 30.542],
					zoom: 17,
					speed: 0.1,
				})
			});
			$('#reset').unbind('click').bind('click', function() {
				_map.setBearing(0);
				_map.setPitch(0);
				_map.flyTo({
					center: [119.974, 30.544],
					zoom: 13,
					speed: 0.2,
				})
			});
		},
		myselfStyle: function(evt) {
			var myjson = $.parseJSON(evt);
			_map.setStyle(myjson);
			require(["./components/leftPanel/leftPanel"], function(leftPanel) {
				leftPanel.bindEvents(myjson)
			})
		},
		changeStyle: function(evt) {
			if (evt == "Basic") {
				$.getJSON("./components/map/Map/Basic.json", function(data) {
					_map.setStyle(data);
					require(["./components/leftPanel/leftPanel"], function(leftPanel) {
						if (document.getElementById('DrawingTool') != null) {
							$("#DrawingTool").hide();
							$("#symbol_panel").remove();
							$("#colorpickerHolder2").remove();
							$(".list-title").empty()
						}
						leftPanel.bindEvents(data)
					})
				})
			} else if (evt == "Streets") {
				$.getJSON("./components/map/Map/Street.json", function(data) {
					_map.setStyle(data);
					require(["./components/leftPanel/leftPanel"], function(leftPanel) {
						if (document.getElementById('DrawingTool') != null) {
							$("#DrawingTool").hide();
							$("#symbol_panel").remove();
							$("#colorpickerHolder2").remove();
							$(".list-title").empty()
						}
						leftPanel.bindEvents(data)
					})
				})
			} else if (evt == "Dark") {
				$.getJSON("./components/map/Map/Dark.json", function(data) {
					_map.setStyle(data);
					require(["./components/leftPanel/leftPanel"], function(leftPanel) {
						if (document.getElementById('DrawingTool') != null) {
							$("#DrawingTool").hide();
							$("#symbol_panel").remove();
							$("#colorpickerHolder2").remove();
							$(".list-title").empty()
						}
						leftPanel.bindEvents(data)
					})
				})
			} else if (evt == "Light") {
				$.getJSON("./components/map/Map/Light.json", function(data) {
					_map.setStyle(data);
					require(["./components/leftPanel/leftPanel"], function(leftPanel) {
						if (document.getElementById('DrawingTool') != null) {
							$("#DrawingTool").hide();
							$("#symbol_panel").remove();
							$("#colorpickerHolder2").remove();
							$(".list-title").empty()
						}
						leftPanel.bindEvents(data)
					})
				})
			} else if (evt == "Fresh") {
				$.getJSON("./components/map/Map/fresh.json", function(data) {
					_map.setStyle(data);
					require(["./components/leftPanel/leftPanel"], function(leftPanel) {
						if (document.getElementById('DrawingTool') != null) {
							$("#DrawingTool").hide();
							$("#symbol_panel").remove();
							$("#colorpickerHolder2").remove();
							$(".list-title").empty()
						}
						leftPanel.bindEvents(data)
					})
				})
			}
		},
		myselfSymbolLayer: function(evt) {
			var layer_list = _map.getStyle().layers;
			for (var i = 0; i < layer_list.length; i++) {
				if (layer_list[i].id == evt) {
					var myLayer = layer_list[i];
					require(["./components/Drawing/symbolDrawing/symbolDrawing"], function(symbolDrawing) {
						symbolDrawing.init(myLayer)
					})
				}
			}
		},
		showlayers: function(id, evt) {
			_map.setLayoutProperty(id, 'visibility', evt)
		},
		symbolColorChange: function(id, evt) {
			_map.setPaintProperty(id, 'text-color', evt)
		},
		symbolHaloColorChange: function(id, evt) {
			_map.setPaintProperty(id, 'text-halo-color', evt)
		},
		symbolHaloWidthChange: function(id, evt) {
			_map.setPaintProperty(id, 'text-halo-width', (parseInt(evt, 10)) / 10)
		},
		symbolIcon: function(id, icon) {
			_map.setLayoutProperty(id, 'icon-image', icon);
			_map.setLayoutProperty(id, 'icon-offset', [4, 0]);
			_map.setLayoutProperty(id, 'text-offset', [0.8, 0])
		},
		symbolTextfield: function(id, evt) {
			_map.setLayoutProperty(id, 'text-field', evt)
		},
		symbolTextanchor: function(id, evt) {
			_map.setLayoutProperty(id, 'text-anchor', evt)
		},
		symbolTextpadding: function(id, evt) {
			_map.setLayoutProperty(id, 'text-padding', evt)
		},
		symbolTextsize: function(id, evt) {
			var base = _map.getLayoutProperty(id, 'text-size').base;
			_map.setLayoutProperty(id, 'text-size', {
				"base": base,
				"stops": [
					[evt[0], evt[1]],
					[evt[2], evt[3]]
				]
			})
		},
		symbolTextjustify: function(id, evt) {
			_map.setLayoutProperty(id, 'text-justify', evt)
		},
		symbolTextoffset: function(id, evt) {
			_map.setLayoutProperty(id, 'text-offset', evt)
		},
		lineColorChange: function(id, evt) {
			_map.setPaintProperty(id, 'line-color', evt)
		},
		lineWidthChange: function(id, evt) {
			_map.setPaintProperty(id, 'line-width', parseInt(evt, 10))
		},
		lineOpacityChange: function(id, evt) {
			_map.setPaintProperty(id, 'line-opacity', (parseInt(evt, 10)) / 10)
		},
		lineCapChange: function(id, evt) {
			_map.setLayoutProperty(id, 'line-cap', evt)
		},
		lineJoinChange: function(id, evt) {
			_map.setLayoutProperty(id, 'line-join', evt)
		},
		fillColorChange: function(id, evt) {
			_map.setPaintProperty(id, 'fill-color', evt)
		},
		backColorChange: function(id, evt) {
			_map.setPaintProperty(id, 'background-color', evt)
		},
		fillOpacityChange: function(id, evt) {
			_map.setPaintProperty(id, 'fill-opacity', (parseInt(evt, 10)) / 10)
		}
	};
	return tool
});