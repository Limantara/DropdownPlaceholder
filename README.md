CKEditor4 dropdownPlaceholder Plugin

This plugin will add a button (RichCombo) to the editor that has some dropdown menu. When one of the menu is clicked, a placeholder is added to the textarea.

**Dependency:**

	1. This plugin requires [Widget](http://ckeditor.com/addon/widget)

**Get Started:**

	1. [Manually install the plugin](http://docs.ckeditor.com/#!/guide/dev_plugins)
	
	2. Fill out the top part of plugin.js with names and values needed
	
		- Make sure that `values`, `labels`, and `tooltips` have the same number of elements. If not, you will get an alert.
		
		- RCToolbar is set to 'others' by default. Learn more about toolbar grouping [here](http://ckeditor.com/latest/samples/plugins/toolbar/toolbar.html) to assign the button to another toolbar group.

**Screenshot:**
![Screenshot](http://i.imgur.com/tkkJTUR.png)
