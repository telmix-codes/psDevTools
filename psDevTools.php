<?php
G::LoadClass('plugin');

if (!defined('PATH_PLUGIN_PS_DEVTOOLS')) {
    define('PATH_PLUGIN_PS_DEVTOOLS', PATH_CORE . 'plugins' . PATH_SEP . 'psDevTools' . PATH_SEP);
}
class psDevToolsPlugin extends PMPlugin
{
    public function psDevToolsPlugin($sNamespace, $sFilename = null)
    {
        $res = parent::PMPlugin($sNamespace, $sFilename);
        $this->sFriendlyName = 'psDev Tools Plugin';
        $this->sDescription = 'Dev Tools - Finder - SQL Console';
        $this->sPluginFolder = 'psDevTools';
        $this->sSetupPage = 'setup';
        $this->iVersion = '1.34';  //February 01th 2021
        $this->aWorkspaces = null;
        return $res;
    }

    public function setup()
    {
        $this->registerMenu('setup', 'devToolsMenu.php');
        $this->registerPmFunction();
    }

    public function install()
    {
    }

    public function enable()
    {
        //Create permission in ProcessMaker
        $RBAC = RBAC::getSingleton();
        $RBAC->initRBAC();
        $RBAC->createPermision('PS_DEVTOOLS');
    }

    public function disable()
    {
    }
}

$oPluginRegistry = PMPluginRegistry::getSingleton();
$oPluginRegistry->registerPlugin('psDevTools', __FILE__);
