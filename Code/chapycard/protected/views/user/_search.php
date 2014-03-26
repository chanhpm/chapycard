<?php
/* @var $this UserController */
/* @var $model User */
/* @var $form CActiveForm */
?>

<div class="wide form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'action'=>Yii::app()->createUrl($this->route),
	'method'=>'get',
)); ?>

	<div class="row">
		<?php echo $form->label($model,'UserId'); ?>
		<?php echo $form->textField($model,'UserId'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'UserName'); ?>
		<?php echo $form->textField($model,'UserName',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'FullName'); ?>
		<?php echo $form->textField($model,'FullName',array('size'=>60,'maxlength'=>100)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'ContactId'); ?>
		<?php echo $form->textField($model,'ContactId'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'EmailAddress'); ?>
		<?php echo $form->textField($model,'EmailAddress',array('size'=>50,'maxlength'=>50)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'ContactNumber'); ?>
		<?php echo $form->textField($model,'ContactNumber',array('size'=>20,'maxlength'=>20)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'Birthday'); ?>
		<?php echo $form->textField($model,'Birthday'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'AutoLogin'); ?>
		<?php echo $form->textField($model,'AutoLogin'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'LoginFailedAttempt'); ?>
		<?php echo $form->textField($model,'LoginFailedAttempt'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'Password'); ?>
		<?php echo $form->passwordField($model,'Password',array('size'=>60,'maxlength'=>128)); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'Photo'); ?>
		<?php echo $form->textField($model,'Photo'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'StatusId'); ?>
		<?php echo $form->textField($model,'StatusId'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'EffectiveFromDate'); ?>
		<?php echo $form->textField($model,'EffectiveFromDate'); ?>
	</div>

	<div class="row">
		<?php echo $form->label($model,'EffectiveToDate'); ?>
		<?php echo $form->textField($model,'EffectiveToDate'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton('Search'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->