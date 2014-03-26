<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="language" content="en" />

    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->theme->baseUrl; ?>/css/styles.css" />

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
	<?php Yii::app()->bootstrap->register(); ?>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->theme->baseUrl; ?>/views/layouts/css/custom.styles.css" />
	<link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/css/vendor/kendo.common.min.css" />
	<link rel="stylesheet" href="<?php echo Yii::app()->theme->baseUrl; ?>/css/vendor/kendo.default.min.css" />
	<script type="text/javascript" src="<?php echo Yii::app()->theme->baseUrl; ?>/js/vendor/kendo.web.min.js"></script>	
</head>

<body>
<div id="fb-root"></div>
<script>
  	window.fbAsyncInit = function() {
	    // init the FB JS SDK
	    FB.init({
	      appId      : 'YOUR_APP_ID',                        // App ID from the app dashboard
	      channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file for x-domain comms
	      status     : true,                                 // Check Facebook Login status
	      xfbml      : true                                  // Look for social plugins on the page
	    });

	    // Additional initialization code such as adding Event Listeners goes here
  	};

  	// Load the SDK asynchronously
  	(function(d, s, id){
     	var js, fjs = d.getElementsByTagName(s)[0];
     	if (d.getElementById(id)) {return;}
     	js = d.createElement(s); js.id = id;
     	//for debug only
     	js.src = "//connect.facebook.net/en_US/all/debug.js";
     	//js.src = "//connect.facebook.net/en_US/all.js";
     	fjs.parentNode.insertBefore(js, fjs);
   	}(document, 'script', 'facebook-jssdk'));
</script>	

<?php $this->widget('bootstrap.widgets.TbNavbar',array(
    'items'=>array(
        array(
            'class'=>'bootstrap.widgets.TbMenu',
            'items'=>array(
                array('label'=>'Home', 'url'=>array('/site/index')),
                array('label'=>'Design', 'url'=>array('/site/design')),
                array('label'=>'About', 'url'=>array('/site/page', 'view'=>'about')),
                array('label'=>'Contact', 'url'=>array('/site/contact')),
                array('label'=>'Login', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest, 'class'=>'Test'),
                array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
            ),
        ),
    ),
)); ?>

<div class="container" id="page">

	<?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('bootstrap.widgets.TbBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>

	<?php echo $content; ?>
	
	<div class="clear"></div>

	<div id="footer">
		Copyright &copy; <?php echo date('Y'); ?> by My Company.<br/>
		All Rights Reserved.<br/>
		<?php echo Yii::powered(); ?>
	</div><!-- footer -->

</div><!-- page -->

    <script src="<?php echo Yii::app()->theme->baseUrl; ?>/views/layouts/js/global.js" /></script>
	
</body>
</html>
