<?php

// use Bis2biasjojoidaiosjdo_trait;

class BIS2BIS_CustomerRules_Events_Customer {

	// use Bis2biasjojoidaiosjdo_trait;

	public function validateState(Varien_Event_Observer $observer){
    	// print_r($this->getParams());
        // echo $dados = $this->getRequest()->getParams();
        // print_r($dados);
		
		echo "<pre>";
		$controller = $observer->getEvent()->getControllerAction();
		$params = $controller->getRequest()->getParams();

		$customer = Mage::getSingleton('customer/session')->getCustomer();
		
		echo 'Métodos: ';
		print_r(get_class_methods($customer));

		echo '<br>Addresses Collections: ';
		print_r($customer->getAddressesCollection()->getData());

		echo '<br>Novos dados: ';
		print_r($params);

		echo '<br>Estado cadastrado: '. $customer->getPrimaryBillingAddress()->getData('region'); 
		echo '<br>Estado novo: '. $params['region']; 

		/*$controller = $observer->getEvent()->getControllerAction();
		$params = $controller->getRequest()->getParams();
		
		$customer = Mage::getSingleton('customer/session')->getCustomer();
		
		echo 'Métodos: ';
		print_r(get_class_methods($customer));

		echo '<br>Addresses Collections: ';
		print_r($customer->getAddressesCollection()->getData());

		echo '<br>Novos dados: ';
		print_r($params);

		echo '<br>Estado cadastrado: '. $customer->getPrimaryBillingAddress()->getData('region'); 
		echo '<br>Estado novo: '. $params['region'];*/ 
		// default_billing, default_shipping
		/*if ( $params['default_billing'] == 1 || $params['default_shipping'] == 1 ) {

			echo '<br>É endereço de cobrança ou de entrega';
			
			if ( $customer->getPrimaryBillingAddress()->getData('region') == $params['region'] ) {
				echo '<br>Estado igual aos cadastrados';
			} else {
				echo '<br>Estado diferente dos cadastrados';
			}
		} else {
			echo '<br>Não é endereço de cobrança, nem de entrega';
		}*/


		/*if ( $params['default_billing'] == 1 ) {
			echo '<br>É endereço de cobrança';
			
			if ( $customer->getPrimaryBillingAddress()->getData('region') == $params['region'] ) {
				echo '<br>Estado igual ao estado de cobrança cadastrado';
			} else {
				echo '<br>Estado diferente ao estado de cobrança cadastrado';
			}
		} else {
			echo '<br>Não é endereço de cobrança';
		}

		if ( $params['default_shipping'] == 1 ) {
			echo '<br>É endereço de entrega';
			
			if ( $customer->getPrimaryShippingAddress()->getData('region') == $params['region'] ) {
				echo '<br>Estado igual ao estado de entrega cadastrado';
			} else {
				echo '<br>Estado diferente ao estado de entrega cadastrado';
			}
		} else {
			echo '<br>Não é endereço de entrega';
		}*/

		// se der erro adiciona mensagem erro
		// Mage::getSingleton('customer/session')->addError('You are not logged in');
		exit;
	}
}