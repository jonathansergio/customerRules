
import Events from './Component/Events.js';

document.addEventListener(
	'DOMContentLoaded',
	function() {
		
		if (document.querySelector('#billing_address_form')) {

			var form = document.querySelectorAll('#billing_address_form')
			Events.init(form)
		}
		if (document.querySelector('#shipping_address_form')) {

			var form = document.querySelectorAll('#shipping_address_form')
			Events.init(form)
		}
		if (document.querySelector('body.customer-address-form')) {

			var form = document.querySelector('#form-validate')
			Events.init(form)
		}
	}
)
