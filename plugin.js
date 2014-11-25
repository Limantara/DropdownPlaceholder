// CHANGE THESE VARIABLES WITH DESIRED VALUES
var pluginsName = 'crm_field',
    widgetsName = 'crm_widget';
//-----------------RICH COMBO SET-UP------------------
var buttonsName = 'crm_field_button',
    RCLabel = 'CRM Field',
    RCTitle = 'Insert CRM Field',
    RCToolbar = 'others';

var values = ['VCG__VAL__FIRST_NAME', 'VCG__VAL__LAST_NAME', 'VCG__VAL__ADDRESS' ],
    labels = ['FIRST NAME', 'LAST NAME', 'ADDRESS'],
    tooltips = ['Insert First Name', 'Insert Last Name', 'Insert Adress'];

//------------DEBUGGER - DO NOT CHANGE -----------------------
var length = Math.max(values.length, labels.length);
    length = Math.max(length, tooltips.length);

for (var i = 0; i < length; i++) {
	if (typeof values[i] === 'undefined') {
	alert('values[' + i + '] HAVE NOT BEEN SPECIFIED');
	} else if (typeof labels[i] === 'undefined') {
		alert('labels[' + i + '] HAVE NOT BEEN SPECIFIED');
	} else if (typeof tooltips[i] === 'undefined') {
		alert('tooltips[' + i + '] HAVE NOT BEEN SPECIFIED');
	}
}
//------------------------------------------------------------
CKEDITOR.plugins.add( pluginsName, {
	requires: 'widget',
	onLoad: function() {
		// Register styles for placeholder widget frame.
		CKEDITOR.addCss( '.' + pluginsName + '{ background-color:#ff0; border: solid black 1px; padding: 2px; }' );
	},
	init : function( editor ) {
		editor.ui.addRichCombo( buttonsName, {
			label: 		RCLabel,
			title: 		RCTitle,
			toolbar:    RCToolbar,	
			panel:
			{
				css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ]
			},
			init: function() {
				    for (var i = 0; i < length ; i++) {
				    	this.add (values[i], labels[i], tooltips[i]);
				    }
			},
			onClick: function( value ) {
				// register widget
				editor.widgets.add( widgetsName, {
					
					template: '<span class="' + pluginsName + '">[[]]</span>',

					init: function() {
						if(this.element.getText() === '[[]]') {
							this.setData( 'name', value );
						} else {
							this.setData( 'name', this.element.getText().slice( 2, -2 ));
						}
					},

					downcast: function() {
						return new CKEDITOR.htmlParser.text( '[[' + this.data.name + ']]' );
					},

					data: function( data ) {
						this.element.setText( '[[' + this.data.name + ']]' );
					}
				} );


				editor.execCommand( widgetsName );
			},
		});
	},
	afterInit: function( editor ) {
		var placeholderReplaceRegex = /\[\[([^\[\]])+\]\]/g;

		editor.dataProcessor.dataFilter.addRules( {
			text: function( text, node ) {
				var dtd = node.parent && CKEDITOR.dtd[ node.parent.name ];

				// Skip the case when placeholder is in elements like <title> or <textarea>
				// but upcast placeholder in custom elements (no DTD).
				if ( dtd && !dtd.span )
					return;

				return text.replace( placeholderReplaceRegex, function(match) {
					// Creating widget code.
					var widgetWrapper = null,
						innerElement = new CKEDITOR.htmlParser.element( 'span', {
							'class': pluginsName
						} );

					innerElement.add( new CKEDITOR.htmlParser.text(match) );
					

					widgetWrapper = editor.widgets.wrapElement( innerElement, widgetsName );

					// Return outerhtml of widget wrapper so it will be placed
					// as replacement.
					return widgetWrapper.getOuterHtml();
				} );
			}
		} );
	},
} );
