import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';

import { PanelBody, PanelRow, Button, Dashicon, TextControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

const DragHandle = SortableHandle( () => (
	<Dashicon className="sortable-move responsive-pros-cons__sortable-move" icon="menu"/>
) );

const SortableItem = SortableElement( ( props ) => {
	const {
		itemKey = '',
		value,
		position,
		handleItemContent,
		handleRemoveItem,
		inputRef,
		currentIndex
	} = props;

	const title = value || `${ itemKey.charAt( 0 ).toUpperCase() + itemKey.slice( 1 ) } ${ position + 1 }`;

	return (
		<div className="sortable-item responsive-pros-cons__sortable-item">
			<PanelBody
				initialOpen={ position === currentIndex }
				className="responsive-pros-cons__panel-body"
				title={ title }
				icon={ <DragHandle /> }
			>
				<TextControl
					label=""
					placeholder={ `Enter a ${ itemKey }` }
					value={ value }
					onChange={ ( newValue ) => handleItemContent( itemKey, position, newValue ) }
					ref={ inputRef }
				/>
				<PanelRow>
					<Button isDestructive isSecondary onClick={ () => handleRemoveItem( itemKey, position ) }>
						{ __( 'Remove', 'responsive-pros-cons-block' ) }
					</Button>
				</PanelRow>
			</PanelBody>
		</div>
	);
} );

const SortableList = SortableContainer( ( props ) => {
	return (
		<div>
			{ props?.items.map( ( item, index ) => (
				<SortableItem
					{ ...props }
					key={ `item-${ index }` }
					index={ index }
					position={ index }
					value={ item }
				/>
			) ) }
		</div>
	);
} );

const Sortable = ( props ) => {
	const { items, onSortEnd, itemKey } = props;

	if ( ! Array.isArray( items ) || ! items.length || ! itemKey ) {
		return null;
	}

	// send sorted values to the parent component
	const handleSortEnd = ( { oldIndex, newIndex } ) => {
		onSortEnd( arrayMove( items, oldIndex, newIndex ), itemKey );
	};

	return (
		<SortableList
			{ ...props }
			onSortEnd={ handleSortEnd }
		/>
	)
}

export default Sortable;
