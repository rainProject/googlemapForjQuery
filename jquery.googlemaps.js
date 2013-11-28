/**
 * jQuery googleMaps
 * Copyright (c) 2013 communograph.inc - http://www.communograph.net
 * 
 * Licensed under the MIT
 * Date: 2013/11/28
 * 
 * @author communograph.inc yoshida
 * @version 0.1
 */
(function($){
	/**
	 * デフォルトの値
	 */
	var defaults = {
		addr:'',
		lat:36.668072,
		lng:137.201952,
		zoom:17,
		mapType:google.maps.MapTypeId.ROADMAP,
		showMaker:true,
		showInfoBox:true,
		useStreatView:false
	}
	
	defaults.marker = {
		markerTitle:'マーカー',
		markerDraggble:false,
		markerAnimation:google.maps.Animation.DROP
	};
	
	defaults.infoBox = {
		content:'',
		defaultOpen:true
	};
	
	var map;
	var marker;
	
	/**
	 * プラグインメイン処理
	 * @param Object options デフォルトの値の分設定が可能
	 * @todo マーカーの複数配置に対応
	 * @todo インフォウィンドウの複数配置に対応
	 * @todo インフォウィンドウのマーカー紐付け実装
	 */
	$.fn.googleMaps = function (options) {
		params = $.extend(true,defaults,options);
		
		params.render = $(this)[0];
		
		var geocoding = new google.maps.Geocoder();
		var mapOptions = {
			center: new google.maps.LatLng(params.lat,params.lng),
			zoom: params.zoom,
			mapTypeId:params.mapType,
			streetViewControl:params.useStreatView,
			zoomControl:true,
			mapTypeControl:false
		};
		
		if(params.addr){
			geocoding.geocode({"address":params.addr,"region":"jp"},function(results,status){
				if(status == google.maps.GeocoderStatus.OK){
					mapOptions.center = results[0].geometry.location;
					
					params.marker.markerLat = results[0].geometry.location.ob;
					params.marker.markerLng = results[0].geometry.location.pb;
					createMap(map,mapOptions,params);
				}
			});
		}else{
			createMap(map,mapOptions,params);				
		}		
	}
	
	/**
	 * GoogleMap 生成関数
	 * @param Object map マップオブジェクト
	 * @param Object mapOptions api指定のオプション
	 * @param Object params プラグインオプション
	 */
	function createMap(map,mapOptions,params){
		if(typeof map != 'object'){
				map = new google.maps.Map(params.render,mapOptions);
		}else{
			map.setCenter(mapOptions.center);
		}
		
		if(params.showMaker){
			if(typeof marker != 'object'){
				marker = createMarker(params.marker,map);
				marker.setPosition(mapOptions.center);
			}else{
				marker.setPosition(mapOptions.center);
			}
		}
		
		if(params.showInfoBox){
			var infowindow = createInfoWindow(params.infoBox.content);
			
			if(params.infoBox.defaultOpen == true){
				infowindow.open(map,marker);
			}
			
			google.maps.event.addListener(marker,'click',function(){
				infowindow.open(map,marker);
			});
		}
	}
	
	/**
	 * マーカー 生成関数
	 * @param Object map マップオブジェクト
	 * @param Object params プラグインオプション
	 */
	function createMarker(params,map){
		var marker = new google.maps.Marker({
			position:new google.maps.LatLng(params.markerLat,params.markerLng),
			map:map,
			animation:params.markerAnimation
		});
		
		if(params.markerTitle != ''){
			marker.setTitle(params.markerTitle);
		}
		
		return marker;
	}
	
	/**
	 * インフォウインドウ 生成関数
	 * @param String（HTML可） content インフォウィンドウのコンテンツ
	 * @return Object インフォウィンドウオブジェクト
	 */
	function createInfoWindow(content){
		var infowindow = new google.maps.InfoWindow({
			content:content
		});
		
		return infowindow
	}
})(jQuery);