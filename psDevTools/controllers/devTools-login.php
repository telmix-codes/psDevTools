<?php
G::LoadClass('pmFunctions');
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/json-rpc/json-rpc.php';
require_once PATH_PLUGIN_PS_DEVTOOLS . 'classes/env.php';

if (function_exists('xdebug_disable')) {
    xdebug_disable();
}

class devToolsLogin
{
    public static $authenticate_documentation = 'login to the server';

    public function authenticate($password)
    {
        global $configEnv;
        if (strcmp($password, $configEnv['password']) == 0) {
            $_SESSION['devTools_Authenticated'] = true;
            return true;
        } else {
            unset($_SESSION['devTools_Authenticated']);
            return false;
        }
    }

    public static $info_documentation = 'Info about de Server';

    public function info($a)
    {
        return ['Your User Agent' => $_SERVER['HTTP_USER_AGENT'],
            'Your IP' => $_SERVER['REMOTE_ADDR'],
            'You Acces this from' => $_SERVER['HTTP_REFERER'],
            'Date' => date('d-m-Y')
        ];
    }
}

handle_json_rpc(new devToolsLogin());
