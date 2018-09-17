define(["text!./leftPanel.html"], function(leftPanel) {
	var tool = {
		init: function() {
			$('.container').append(leftPanel);
			var me = this;
			me.bindEvents()
		},
		bindEvents: function(evt) {
			$('.leftPanel-btn.data').unbind('click').bind('click', function() {
				require(["./components/inputData/inputData"], function(inputData) {
					inputData.init()
				})
			});
			$('.leftPanel-btn.mapStyle').unbind('click').bind('click', function() {
				require(["./components/mapStyle/mapStyle"], function(mapStyle) {
					mapStyle.init()
				})
			});
			$('.leftPanel-btn.edit').unbind('click').bind('click', function() {
				require(["./components/DrawingTool/DrawingTool"], function(DrawingTool) {
					var layers;
					if (evt != undefined) {
						layers = evt.layers
					} else {
						layers = _map.getStyle().layers
					}
					DrawingTool.init(layers);
					$('.leftPanel-btn.edit').addClass("leftPanel-btn_style").siblings().removeClass("leftPanel-btn_style")
				})
			});
			$('.leftPanel-btn.save').unbind('click').bind('click', function() {
				var content = _map.getStyle();
				content = JSON.stringify(content);
				var blob = new Blob([content], {
					type: "text/plain;charset=utf-8"
				});
				saveAs(blob, "style.json");
			})
		}
	};
	return tool
});