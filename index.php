<?php


/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

require_once ("autoload.inc.php");
require_once ('access.inc.php');

$bodyPath = "/apps/order-margins";
$title = "Open Order Margins";
$description = "";

$ui = new WebUI($bodyPath, $title, $description, true, 5);
$ui->bodyClassName = 'container-fluid';
$ui->AddCSS("public/styles.css", true);
$ui->addManifest('public/js/manifest.json');
$ui->Send();
/**
 * Changelog:
 */


