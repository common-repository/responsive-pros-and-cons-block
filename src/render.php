<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

/**
 * @type array $attributes Block attributes.
 * @type array $content Block content.
 * @type array $block Block instance.
 */

defined( 'ABSPATH' ) || exit;

$is_edit = filter_input( INPUT_GET, 'edit', FILTER_SANITIZE_NUMBER_INT );

$items = (array) ( $attributes[ 'items' ] ?? [] );
if ( empty( $items ) || ! is_array( $items ) ) {
	return;
}

if ( empty( $items['pros'] ) && empty( $items['cons'] ) ) {
	echo $is_edit ? '<div class="components-placeholder is-large">' . esc_html__( 'Please Add Pros and Cons from the "Responsive Pros and Cons" Block Sidebar.', 'responsive-pros-cons-block' ) . '</div>' : '';
	return;
}

$settings      = (array) ( $attributes['settings'] ?? [] );
$design        = $settings['design'] ?? 'one';
$settings_pros = $settings['pros'] ?? [];
$settings_cons = $settings['cons'] ?? [];

$title_pros = $settings_pros['title'] ?? esc_html__( 'Pros', 'responsive-pros-cons-block' );
$title_cons = $settings_cons['title'] ?? esc_html__( 'Cons', 'responsive-pros-cons-block' );

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'responsive-pros-cons responsive-pros-cons--design-' . $design,
) );
?>
<div <?php echo wp_kses_post( $wrapper_attributes ); ?>>
	<div class="flex jcsb responsive-pros-cons__inner">
		<?php
		$design_file = RPCB_TEMPLATE_PATH . '/' . $design  . '.php';
		if ( file_exists( $design_file ) ) {
			include $design_file;
		}
		?>
	</div>
</div>
