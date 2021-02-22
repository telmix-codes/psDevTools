<?php
/**
 * class.psDevTools.php
 *  
 */

  class psDevToolsClass extends PMPlugin {
    function __construct() {
      set_include_path(
        PATH_PLUGINS . 'psDevTools' . PATH_SEPARATOR .
        get_include_path()
      );
    }

    function setup()
    {
    }

    function getFieldsForPageSetup()
    {
    }

    function updateFieldsForPageSetup()
    {
    }

  }
?>