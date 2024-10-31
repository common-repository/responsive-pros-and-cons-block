<?php
/**
 * Plugin Name:       Responsive Pros and Cons Block
 * Description:       Add responsive pros and cons lists to your Block editor. This simple block plugin outputs a clean, organized pros and cons table that adapts gracefully across screen sizes.
 * Plugin URI:        https://github.com/thenahidul/responsive-pros-cons-block
 *
 * Version:           1.0.0
 * Author:            TheNahidul
 * Author URI:        https://www.linkedin.com/in/thenahidul
 *
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       responsive-pros-cons-block
 *
 * Requires at least: 6.1
 * Tested up to:      6.6.2
 * Requires PHP:      7.4
 *
 * @package           responsive-pros-cons-block
 * @since             1.0.0
 */

namespace ResponsiveProsConsBlock;

defined( 'ABSPATH' ) || exit;

define( 'RPCB_VERSION', '1.0.0' );
define( 'RPCB_PLUGIN_FILE', __FILE__ );
define( 'RPCB_PLUGIN_PATH', __DIR__ . '/' );
define( 'RPCB_PLUGIN_NAME', dirname( plugin_basename( RPCB_PLUGIN_FILE ) ) );
define( 'RPCB_TEMPLATE_PATH', untrailingslashit( RPCB_PLUGIN_PATH ) . '/templates' );
define( 'RPCB_PLUGIN_URL', plugins_url( '', RPCB_PLUGIN_FILE ) );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @return void
 */
function block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', __NAMESPACE__ . '\\block_init' );

/**
 * Add translation.
 *
 * @return void
 */
function translation() {
	load_plugin_textdomain( 'responsive-pros-cons-block', false, RPCB_PLUGIN_NAME . '/languages' );
}

add_action( 'init', __NAMESPACE__ . '\\translation' );
