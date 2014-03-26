<?php
/* @var $this UserController */
/* @var $model User */
/* @var $form CActiveForm */
?>

<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'user-form',
	// Please note: When you enable ajax validation, make sure the corresponding
	// controller action is handling ajax validation correctly.
	// There is a call to performAjaxValidation() commented in generated controller code.
	// See class documentation of CActiveForm for details on this.
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'UserName'); ?>
		<?php echo $form->textField($model,'UserName',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'UserName'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'FullName'); ?>
		<?php echo $form->textField($model,'FullName',array('size'=>60,'maxlength'=>100)); ?>
		<?php echo $form->error($model,'FullName'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'ContactId'); ?>
		<?php echo $form->textField($model,'ContactId'); ?>
		<?php echo $form->error($model,'ContactId'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'EmailAddress'); ?>
		<?php echo $form->textField($model,'EmailAddress',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'EmailAddress'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'ContactNumber'); ?>
		<?php echo $form->textField($model,'ContactNumber',array('size'=>20,'maxlength'=>20)); ?>
		<?php echo $form->error($model,'ContactNumber'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'Birthday'); ?>
		<?php echo $form->textField($model,'Birthday'); ?>
		<?php echo $form->error($model,'Birthday'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'AutoLogin'); ?>
		<?php echo $form->textField($model,'AutoLogin'); ?>
		<?php echo $form->error($model,'AutoLogin'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'LoginFailedAttempt'); ?>
		<?php echo $form->textField($model,'LoginFailedAttempt'); ?>
		<?php echo $form->error($model,'LoginFailedAttempt'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'Password'); ?>
		<?php echo $form->passwordField($model,'Password',array('size'=>60,'maxlength'=>128)); ?>
		<?php echo $form->error($model,'Password'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'Photo'); ?>
		<?php echo $form->textField($model,'Photo'); ?>
		<?php echo $form->error($model,'Photo'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'StatusId'); ?>
		<?php echo $form->textField($model,'StatusId'); ?>
		<?php echo $form->error($model,'StatusId'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'EffectiveFromDate'); ?>
		<?php echo $form->textField($model,'EffectiveFromDate'); ?>
		<?php echo $form->error($model,'EffectiveFromDate'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'EffectiveToDate'); ?>
		<?php echo $form->textField($model,'EffectiveToDate'); ?>
		<?php echo $form->error($model,'EffectiveToDate'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->