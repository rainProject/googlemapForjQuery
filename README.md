#googleMap for jQueryPluginの使い方

## 概要
webサイト制作時にgoogleMapを埋め込む際にgoogleMapをいちいち面倒だと思い、
google map API v3をjQueryplugin化して簡単に使えるようこのpluginを作りました。  
内部でジオコーディングを使用しているので、住所を入れるだけでmapにマーカーが表示されます。緯度・経度の設定も可。

走り書きでコーディングしたので、ムダの多いソースコードですが、よければ使ってやってください。

## 使い方
googleMapAPIと当プラグインを読み込んでください。  

```HTML
<script type='text/javascript' charset='utf-8' src='http://maps.googleapis.com/maps/api/js?&sensor=false'></script><script type="text/javascript" src="js/jquery.googlemaps.js"></script>```

マップを表示したい場所に描画用のブロックを作成。

```HTML
<div id="map"></div>
```

プラグインを呼び出します。

```HTML
<script type="text/javascript">  	$(function(){
		$('#map').googleMaps(options); 	}) </script>```
## オプション一覧
options | about
--- | ---
(String)addr | 住所（最優先されます）
(int)lat,lng | 緯度、経度
(int)zoom | 初期ズーム値 初期値 17
(Object)mapType | マップタイプを選択 [GoogleMapAPI参照](https://developers.google.com/maps/documentation/javascript/reference?hl=ja#MapTypeId) 初期値 google.maps.MapTypeId.ROADMAP
(boolean)showMaker | マーカーの表示有無 初期値 true
(boolean)showInfobox | インフォボックス表示有無 初期値 false
(boolean)useStreatView | ストリートビューの使用 初期値 false
(Object)marker | マーカーオプション
(Object)infoBox | インフォボックスオプション

### markerオプション
options | about
--- | ---
(String)markerTitle | マーカーのタイトル
(boolean)markerDraggble | マーカーのドラック可否
(Object)markerAnimation | マーカーのアニメーション  [GoogleMapAPI参照](https://developers.google.com/maps/documentation/javascript/reference?hl=ja#Animation) 初期値 google.maps.Animation.DROP

### infoBoxオプション
options | about
--- | ---
(String)content | インフォボックス内コンテンツ
(boolean)defaultOpen | インフォボックス表示時に開いているか閉じているか 初期値 true

## TODO
* 複数マーカーに対応
* 複数のインフォボックスに対応
* オーバーレイ・ポリゴンに対応