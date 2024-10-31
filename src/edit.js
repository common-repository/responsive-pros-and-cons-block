import { useState, useEffect, useRef } from 'react';
import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Panel,
	TabPanel,
	PanelBody,
	SelectControl,
	TextControl,
	Button,
} from '@wordpress/components';

import Sortable from './sortable';
import metadata from './block.json';

const Edit = ( props ) => {
	const {
		attributes: {
			items,
			settings,
		},
		attributes,
		setAttributes,
	} = props;

	const [ currentIndex, setCurrentIndex ] = useState( 0 );
	const [ isAdded, setIsAdded ] = useState( false );

	const inputRef = useRef( null );

	// Get pros or cons by key
	const getProsOrCons = ( key ) => {
		return ( ! key || ! items || ! items[ key ] ) ? [] : items[ key ];
	}

	// Add
	const handleAddItem = ( key ) => {
		const prosOrCons = getProsOrCons( key );
		if ( ! prosOrCons ) {
			return;
		}

		const newItem = [ ...prosOrCons, '' ];

		setAttributes( {
			items: {
				...items,
				[ key ]: newItem,
			},
		} );

		setIsAdded( true );

		setCurrentIndex( newItem.length - 1 );
	}

	// Delete
	const handleRemoveItem = ( key, index ) => {
		const prosOrCons = getProsOrCons( key );
		if ( ! prosOrCons ) {
			return;
		}

		// Remove a item
		prosOrCons.splice( index, 1 );

		// Update items with new items
		setAttributes( {
			items: {
				...items,
				[ key ] : prosOrCons,
			}
		} );
	}

	// Update content in each item
	const handleItemContent = ( key, index, value ) => {
		const prosOrCons = getProsOrCons( key );
		if ( ! prosOrCons ) {
			return;
		}

		// change content
		prosOrCons[ index ] = value;

		setAttributes( {
			items: {
				...items,
				[ key ] : prosOrCons,
			}
		} );
	}

	// Drag & Sort item
	const updateItems = ( sortedValues, key ) => {
		const prosOrCons = getProsOrCons( key );
		if ( ! prosOrCons ) {
			return;
		}

		setAttributes( {
			items: {
				...items,
				[ key ] : sortedValues,
			}
		} );
	}

	// Update Settings
	const handleSettings = ( setting, value, key, isStyles = false ) => {
		let updatedSettings;

		if ( setting === 'design' ) {
			updatedSettings = {
				...settings,
				[ setting ]: value, // design: value
			};
		} else {
			updatedSettings = {
				...settings,
				[ key ]: { // pros/cons: {}
					...settings[ key ],
					[ setting ]: value, // title/etc: value
				}
			};
		}

		setAttributes( {
			settings: updatedSettings
		} );
	}

	// Update the block when an item is updated
	useEffect( () => {
		setAttributes( { updatedAt: Date.now() } );
	}, [ items ] );

	// Make input focused
	useEffect( () => {
		// When an item is added
		if ( isAdded && inputRef?.current ) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [ inputRef?.current, isAdded ] );

	return (
		<>
			<InspectorControls>
				<Panel header={ __( 'Add Pros and Cons', 'responsive-pros-cons-block' ) }>
					<TabPanel
						className='responsive-pros-cons__tab-panel'
						activeClass='is-active'
						onSelect={ () => {} }
						tabs={ [
							{
								name: 'pros',
								title: __( 'Pros', 'responsive-pros-cons-block' ),
								className: 'responsive-pros-cons__tab',
								component: () => (
									<>
										<Sortable
											items={ items?.pros }
											itemKey='pros'
											onSortEnd={ updateItems }
											handleItemContent={ handleItemContent }
											handleRemoveItem={ handleRemoveItem }
											inputRef={ inputRef }
											currentIndex={ currentIndex }
										/>
										<Button isPrimary onClick={ () => handleAddItem( 'pros' ) }>
											{ __( 'Add Pros', 'responsive-pros-cons-block' ) }
										</Button>
									</>
								)
							},
							{
								name: 'cons',
								title: __( 'Cons', 'responsive-pros-cons-block' ),
								className: 'responsive-pros-cons__tab',
								component: () => (
									<>
										<Sortable
											items={ items?.cons }
											itemKey='cons'
											onSortEnd={ updateItems }
											handleItemContent={ handleItemContent }
											handleRemoveItem={ handleRemoveItem }
											inputRef={ inputRef }
											currentIndex={ currentIndex }
										/>
										<Button isPrimary onClick={ () => handleAddItem( 'cons' ) }>
											{ __( 'Add Cons', 'responsive-pros-cons-block' ) }
										</Button>
									</>
								)
							},
							{
								name: 'settings',
								title: __( 'Settings', 'responsive-pros-cons-block' ),
								className: 'responsive-pros-cons__tab',
								component: () => (
									<>
										<SelectControl
											label={ __( 'Design', 'responsive-pros-cons-block' ) }
											value={ settings?.design }
											options={ [
												{ label: 'One', value: 'one' },
												{ label: 'Two', value: 'two' },
												{ label: 'Three', value: 'three' },
												{ label: 'Four', value: 'four' },
											] }
											onChange={ ( value ) => handleSettings( 'design', value ) }
										/>

										{ Object.keys( items ).map( ( prosOrConsKey ) => {
											const { title } = settings[ prosOrConsKey ] || {};
											return (
												<PanelBody className="responsive-pros-cons__panel-body--settings" initialOpen={ false } title={ prosOrConsKey }>
													<TextControl
														label={ __( 'Title', 'responsive-pros-cons-block' ) }
														value={ title }
														onChange={ ( value ) => handleSettings( 'title', value, prosOrConsKey ) }
													/>
												</PanelBody>
											)
										} ) }
									</>
								)
							},
						] }
					>
						{ ( tab ) => <div className='responsive-pros-cons__tab-content'>{ tab.component() }</div> }
					</TabPanel>
				</Panel>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<ServerSideRender
					httpMethod="POST"
					block={ metadata.name }
					attributes={ { ...attributes } }
					urlQueryArgs={ { edit: 1 } }
				/>
			</div>
		</>
	);
}

export default Edit;
