<?php

class MyApi
{
	/**
	 * Object containing all incoming request params
	 * @var object
	 */
	private $request;

	public function __construct()
	{

		$this->_processRequest();

	}

	/**
	 * Routes incoming requests to the corresponding method
	 *
	 * Converts $_REQUEST to an object, then checks for the given action and
	 * calls that method. All the request parameters are stored under
	 * $this->request.
	 */
	private function _processRequest()
	{
		// prevent unauthenticated access to API
		$this->_secureBackend();

		// get the request
		if (!empty($_REQUEST)) {
			// convert to object for consistency
			$this->request = json_decode(json_encode($_REQUEST));
		} else {
			// already object
			$this->request = json_decode(file_get_contents('php://input'));
		}

		//check if an action is sent through
		if(!isset($this->request->action)){
			//if no action is provided then reply with a 400 error with message
			$this->reply("No Action Provided", 400);
			//kill script
			exit();
		}

		//check if method for the action exists
		if(!method_exists($this, $this->request->action)){
			//if method doesn't exist, send 400 code and message with reply'
			$this->reply("Action method not found",400);
			//kill script
			exit();
		}

		
		//call appropriate function for the action provided
		// $lti_id = $this->request->lti_id;
		// $user_id = $this->request->user_id;

		switch($this->request->action){
			case "hello":
				error_log("hello has been sent through");
				
				$this->hello();
				break;
			case "send_grades":
				error_log("send_grades has been sent through");

				$data = json_decode($this->request->data);
				$this->send_grades($data);

				break;
			default:
				$this->reply("action switch failed",400);
			break;
		}


	}

	/**
	 * Prevent unauthenticated access to the backend
	 */
	private function _secureBackend()
	{
		if (!$this->_isAuthenticated()) {
			header("HTTP/1.1 401 Unauthorized");
			exit();
		}
	}

	/**
	 * Check if user is authenticated
	 *
	 * This is just a placeholder. Here you would check the session or similar
	 * to see if the user is logged in and/or authorized to make API calls.
	 */
	private function _isAuthenticated()
	{
		return true;
	}

	/**
	 * Returns JSON data with HTTP status code
	 *
	 * @param  array $data - data to return
	 * @param  int $status - HTTP status code
	 * @return JSON
	 */
	private function reply($data, $status = 200){
        $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.1');
        header($protocol . ' ' . $status);
		header('Content-Type: application/json');
		echo json_encode($data);
		exit;
	}

	public function hello(){
		//error_log(json_encode($this->db));

		$this->reply('Hello from the API!');
	}

	public function send_grades($data){
	
		//$lti_id = $data->lti_id;
		error_log(json_encode($data));

		$config = array(
			"lti_keys"=>array(
				$data->lti_key => $data->lti_secret
			)
		);



		error_log("config".json_encode($config));

		foreach ($data->user_ids as $ind => $user_id) {
			$sourcedid = $data->sourcedid_prefix.":".$user_id;
			send_grade(floatval($data->grade), $config, $data->grade_url, $sourcedid, $data->lti_key);
		}

	}
//{"resource_link_id":"a","context_id":"b","grade":"0.5","lis_outcome_service_url":"c","lti_consumer_key":"d","user_ids_array":["f","g","h"],"lti_consumer_secret":"e"}


} //MyApi class end

require_once('../lib/OAuth.php');
require_once('../lib/grade.php');


$MyApi = new MyApi();
