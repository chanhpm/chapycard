<?php
/* @var $this UserController */
/* @var $data User */
?>

<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('UserId')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->UserId), array('view', 'id'=>$data->UserId)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('UserName')); ?>:</b>
	<?php echo CHtml::encode($data->UserName); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('FullName')); ?>:</b>
	<?php echo CHtml::encode($data->FullName); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('ContactId')); ?>:</b>
	<?php echo CHtml::encode($data->ContactId); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('EmailAddress')); ?>:</b>
	<?php echo CHtml::encode($data->EmailAddress); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('ContactNumber')); ?>:</b>
	<?php echo CHtml::encode($data->ContactNumber); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('Birthday')); ?>:</b>
	<?php echo CHtml::encode($data->Birthday); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('AutoLogin')); ?>:</b>
	<?php echo CHtml::encode($data->AutoLogin); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('LoginFailedAttempt')); ?>:</b>
	<?php echo CHtml::encode($data->LoginFailedAttempt); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('Password')); ?>:</b>
	<?php echo CHtml::encode($data->Password); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('Photo')); ?>:</b>
	<?php echo CHtml::encode($data->Photo); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('StatusId')); ?>:</b>
	<?php echo CHtml::encode($data->StatusId); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('EffectiveFromDate')); ?>:</b>
	<?php echo CHtml::encode($data->EffectiveFromDate); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('EffectiveToDate')); ?>:</b>
	<?php echo CHtml::encode($data->EffectiveToDate); ?>
	<br />

	*/ ?>

</div>