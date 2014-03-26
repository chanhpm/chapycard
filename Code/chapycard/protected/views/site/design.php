<?php
/* @var $this SiteController */

$this->pageTitle=Yii::app()->name;
?>
<script type="text/javascript" src="<?php echo Yii::app()->theme->baseUrl; ?>/js/app/build/chapycard.js"></script>	
	<script type="text/javascript" src="<?php echo Yii::app()->theme->baseUrl; ?>/template/setting.json"></script>	
	<script type="text/javascript">				
			var manifest = {
				app:{
					frontside:{
						selector: ".frontside"
					},
					backside:{
						selector: ".backside"
					}
				},
				tab:{
					general:{
						name: "general",
						controls: {
							width: {
								name: "width",
								selector: ".chapycard"
							},
							height: {
								name: "height",
								selector: ".chapycard"
							},
							corner: {
								name: "corner",
								selector: ".chapycard"
							}

						},
						init: true
					},
					design:{
						name: "design",
						controls:{
							border:{
								name: "border",
								selector: ".chapycard"
							}
						},
						init: false
					}
				}
				
			};				
		</script>
		<!-- for test only -->
	<div id="wrapper">
		<div id="firstColumn">
			<div id="chapycontrol"></div>			 
		</div>
		<div id="secondColumn"><iframe id="framecard" src="<?php echo Yii::app()->theme->baseUrl; ?>/template/index.html" ></iframe></div>
	</div>	
	<!-- end test -->
	<script type="text/javascript">
		$(document).ready(function(){
					chapyCardInit = function(){
						var frame = $("#framecard");
						var controls = $("#chapycontrol");
						var builder = new ChapyCard.Builder(frame, manifest, controls);
					}
				});
	</script>