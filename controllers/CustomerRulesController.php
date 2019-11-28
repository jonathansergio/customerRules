<?php

use Mage_Core_Controller_Front_Action  as FrontAction;
use BIS2BIS_CustomerRules_Helper_Customer_Customer as Customer;

class BIS2BIS_CustomerRules_CustomerRulesController extends FrontAction
{	
    use Customer;

    public function validateStateRegAction(){ 
		
    	$paramState = $this->getParams()['state'];
    	$paramBilling = $this->getParams()['isBilling'];
    	$paramShipping = $this->getParams()['isShipping'];
    	
        $customer = Mage::getSingleton('customer/session')->getCustomer();
        $primBilling = $customer->getPrimaryBillingAddress()->getData('region_id') ;
        $primShipping = $customer->getPrimaryShippingAddress()->getData('region_id');
        
        if ( ($paramBilling == 1 && $paramShipping == 1) || ($paramBilling == 0 && $paramShipping == 0) )  {

        	echo true;
        } else {

	        if ($paramBilling == 1) {
	        	if ($primShipping == $paramState) {

	        		echo true;
	        	} else {

	        		echo 'billing';
	        	}
	        }
	        if ($paramShipping == 1) {
	        	if ($primBilling == $paramState) {

	        		echo true;
	        	} else {

	        		echo 'shipping';
	        	}
	        }	
        }
        
		exit;
    }

    public function validateStateOscAction(){ 
		
    	$parBillState = $this->getParams()['billState'];
    	$parShipState = $this->getParams()['shipState'];

    	if ($parBillState == 'Selecioneumestado...' || $parShipState == 'Selecioneumestado...') {
    		
	    	echo true;
    	} else {

    		if ($parBillState == $parShipState) {
	    		echo true;
	    	} else {
	    		echo 'false';
	    	}
    	}

		exit;
    }
}