<?php
/**
 * @var array $items
 * @var string $title_pros
 * @var string $title_cons
 */

defined( 'ABSPATH' ) || exit;
?>
<div style="display: none;">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="icon-mark-pros">
		<path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"/>
	</svg>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="icon-mark-cons">
		<path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm3.71,13.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0L12,13.41l-2.29,2.3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L10.59,12,8.29,9.71A1,1,0,0,1,9.71,8.29L12,10.59l2.29-2.3a1,1,0,0,1,1.42,1.42L13.41,12Z"/>
	</svg>
</div>
<?php

foreach ( $items as $key => $item ) :
	// Only show pros & cons
	if ( $key !== 'pros' && $key !== 'cons' ) {
		continue;
	}

	// If not a single Pros or Cons is added, don't show the corresponding box.
	if ( empty( $item ) ) {
		continue;
	}

	$title = $key === 'pros' ? $title_pros : $title_cons;
	?>
	<div class="responsive-pros-cons__item responsive-pros-cons__item-<?php echo esc_attr( $key ); ?>">
		<?php if ( trim( $title ) ) : ?>
			<div class="responsive-pros-cons__header responsive-pros-cons__header-<?php echo esc_attr( $key ); ?>">
				<div class="responsive-pros-cons__title"><?php echo esc_html( $title ); ?></div>
			</div>
		<?php endif; ?>

		<div class="responsive-pros-cons__content">
			<ul class="flex fdc responsive-pros-cons__list responsive-pros-cons__list-<?php echo esc_attr( $key ); ?>">
				<?php foreach ( $item as $content ) : ?>
					<?php
					if ( ! trim( $content ) ) {
						continue;
					}
					?>
					<li class="flex">
						<svg width="22" height="22" fill="<?php echo esc_attr( $key === 'pros' ? '#4CAF50' : '#EF0856' ); ?>"><use xlink:href="#icon-mark-<?php echo esc_attr( $key ); ?>"></use></svg>
						<?php echo esc_html( $content ); ?>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>
	</div>
<?php endforeach;
