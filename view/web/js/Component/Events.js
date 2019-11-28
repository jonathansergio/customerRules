import axios from 'axios';

let Events = (function(){
	
	function validateState(){
		
		var state = document.querySelector('select#region_id') ? document.querySelector('select#region_id').value : document.querySelector('.billing_customer_address').value.split(',',document.querySelector('.billing_customer_address').value[document.querySelector('.billing_customer_address').value.length-1])
		var isBilling = document.querySelector('input#primary_billing').checked
		var isShipping = document.querySelector('input#primary_shipping').checked
		
		var validateAddressURL = getUrlBase('customerRules/customerRules/validateStateReg')
		axios.post(
			validateAddressURL,
			{
				state:state,
				isBilling:isBilling,
				isShipping:isShipping
			}
			).then((response)=>{
				
				if (response.data == 'billing') {

					swal("Ops...", 'O estado do endereço de cobrança deve ser o mesmo estado do endereço de entrega padrão!', "error");
				}
				if (response.data == 'shipping') {

					swal("Ops...", 'O estado do endereço de entrega deve ser o mesmo estado do endereço de cobrança padrão!', "error");
				}
				if (response.data == '1') {

					document.querySelector('#form-validate').submit()
				}
			}
		)
	}

	function validateStateOsc(){

		var billCust = document.querySelector('.billing_customer_address')
		var billArray = billCust.options[billCust.selectedIndex].text.split(',')

		if (billArray[0] == 'Novo Endereço') {

			var billCustNew = document.querySelector('#osc_field_billing_region')
			var billState = billCustNew.options[billCustNew.selectedIndex].text.replace(/\s/g, '');

		} else {
			
			var billState = billArray[billArray.length-1].replace(/\s/g, '');
		}

		var shipCust = document.querySelector('#shipping_customer_address')
		var shipArray = shipCust.options[shipCust.selectedIndex].text.split(',')

		if (shipArray[0] == 'Novo Endereço') {

			var shipCustNew = document.querySelector('#osc_field_shipping_region')
			var shipState = shipCustNew.options[shipCustNew.selectedIndex].text.replace(/\s/g, '');

		} else {
			
			var shipState = shipArray[shipArray.length-1].replace(/\s/g, '');
		}

		var validateAddressURL = getUrlBase('customerRules/customerRules/validateStateOsc')
		axios.post(
			validateAddressURL,
			{
				billState:billState,
				shipState:shipState
			}
			).then((response)=>{
				if (response.data != 1) {

					swal("Ops...", 'O estado do endereço de cobrança deve ser o mesmo estado do endereço de entrega!', "error")
					var buttonCheck = document.querySelectorAll('button.btn-checkout')

					buttonCheck.forEach((btn)=>{

						btn.disabled = true
					})	
				} else {

					document.querySelectorAll('label[for="osc_field_billing_region"]').text = ''
					document.querySelectorAll('label[for="osc_field_shipping_region"]').text = ''

					var buttonCheck = document.querySelectorAll('button.btn-checkout')

					buttonCheck.forEach((btn)=>{

						btn.disabled = false
					})
				}
			})
	}

	function init(element){

		// var form = document.querySelector('.my-account > form')
		// var form = document.querySelector('.osc-onepage-checkout > main > ')
		
		if (Array.isArray(element) || Object.keys(element).length > 1 ) {
			if (element[0].id == 'billing_address_form' || element[0].id == 'shipping_address_form') {

				element.forEach((elem)=>{
					elem.addEventListener('change',function(){
						event.preventDefault();
						validateStateOsc();
					})
				})
			}	
		}

		if (element.action != undefined) {
			var action = element.action.split('/');

			if (action[action.length-4] == 'customer' && action[action.length-3] == 'address' && action[action.length-2] == 'formPost') {

				element.addEventListener('submit',function(){
					event.preventDefault();
					validateState();
				})
			}
		}
	}
	
	function getUrlBase(url) {
		var myurl = (window.location);
		var splited_url = (myurl.toString().split("/"));
		var final_url = splited_url[0] + "//" + splited_url[2];
		if (isLocalhost(window.location.hostname)) {
			final_url = splited_url[0] + "//" + splited_url[2] + "/" + splited_url[3];
		} else {
			final_url = splited_url[0] + "//" + splited_url[2];
		}

		return final_url + "/" + url;
	}

	function isLocalhost(hostname) {
		if (hostname == 'localhost') {
			return true
		} else {
			var exploded = hostname.split('.');
			for (var k = 0; k < exploded.length; k++) {
				if (isNaN(exploded[k])) {
					return false;
				}
			}
		}

		return true;
	}

	return {
		init:init
	}
})();

export default Events;