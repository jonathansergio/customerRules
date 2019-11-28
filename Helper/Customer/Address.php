<?php


trait BIS2BIS_CustomerRules_Helper_Customer_Address 
{

	public function validateStateAction()
	{


	}

	private function getParams()
    {
        
        return (array) json_decode(file_get_contents('php://input'), true);
    }
	
}
