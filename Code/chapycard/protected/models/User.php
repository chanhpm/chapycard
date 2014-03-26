<?php

/**
 * This is the model class for table "tbl_user".
 *
 * The followings are the available columns in table 'tbl_user':
 * @property integer $UserId
 * @property string $UserName
 * @property string $FullName
 * @property integer $ContactId
 * @property string $EmailAddress
 * @property string $ContactNumber
 * @property string $Birthday
 * @property integer $AutoLogin
 * @property integer $LoginFailedAttempt
 * @property string $Password
 * @property string $Photo
 * @property integer $StatusId
 * @property string $EffectiveFromDate
 * @property string $EffectiveToDate
 */
class User extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_user';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('UserName, FullName, ContactId, Birthday, AutoLogin, LoginFailedAttempt, StatusId', 'required'),
			array('ContactId, AutoLogin, LoginFailedAttempt, StatusId', 'numerical', 'integerOnly'=>true),
			array('UserName, EmailAddress', 'length', 'max'=>50),
			array('FullName', 'length', 'max'=>100),
			array('ContactNumber', 'length', 'max'=>20),
			array('Password', 'length', 'max'=>128),
			array('Photo, EffectiveFromDate, EffectiveToDate', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('UserId, UserName, FullName, ContactId, EmailAddress, ContactNumber, Birthday, AutoLogin, LoginFailedAttempt, Password, Photo, StatusId, EffectiveFromDate, EffectiveToDate', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'UserId' => 'User',
			'UserName' => 'UserName',
			'FullName' => 'Full Name',
			'ContactId' => 'Contact',
			'EmailAddress' => 'Email Address',
			'ContactNumber' => 'Contact Number',
			'Birthday' => 'Birthday',
			'AutoLogin' => 'Auto Login',
			'LoginFailedAttempt' => 'Login Failed Attempt',
			'Password' => 'Password',
			'Photo' => 'Photo',
			'StatusId' => 'Status',
			'EffectiveFromDate' => 'Effective From Date',
			'EffectiveToDate' => 'Effective To Date',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('UserId',$this->UserId);
		$criteria->compare('UserName',$this->UserName,true);
		$criteria->compare('FullName',$this->FullName,true);
		$criteria->compare('ContactId',$this->ContactId);
		$criteria->compare('EmailAddress',$this->EmailAddress,true);
		$criteria->compare('ContactNumber',$this->ContactNumber,true);
		$criteria->compare('Birthday',$this->Birthday,true);
		$criteria->compare('AutoLogin',$this->AutoLogin);
		$criteria->compare('LoginFailedAttempt',$this->LoginFailedAttempt);
		$criteria->compare('Password',$this->Password,true);
		$criteria->compare('Photo',$this->Photo,true);
		$criteria->compare('StatusId',$this->StatusId);
		$criteria->compare('EffectiveFromDate',$this->EffectiveFromDate,true);
		$criteria->compare('EffectiveToDate',$this->EffectiveToDate,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return User the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function validatePassword($password)
	{
		return CPasswordHelper::verifyPassword($password, $this->password);
	}

	public function hashPassword($password)
	{
		return CPasswordHelper::hashPassword($password);
	}
}
