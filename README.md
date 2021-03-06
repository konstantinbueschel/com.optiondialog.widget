# com.optiondialog.widget
Alloy Slidein option dialog

## Overview
The widget shows an slide in option at the bottom
of the screen for iOS and Android.


## Features
* Darkened background
* Slide in can be delayed by settings
* Styleable via TSS


### How to

Add the widget to your *Window:

```xml
<Alloy>
	<Window>
		<Button backgroundColor="#FFFFFF" title="Dialog" onClick="doDialog" top="10dp"></Button>
		<Widget src="com.optiondialog.widget" id="optionDialog" onClick="doClickOptionDialog"></Widget>
	</Window>
</Alloy>
```

```javascript
//Show up the dialog
function doDialogOne(e){
	$.optionDialog.show();
}

//Catch event fired by clicked option dialog
function doClickOptionDialog(e){
	
	alert(e.index);
}
```

##Init the Widget in TSS file

```javascript
//Standard version
"#optionDialog" : {
	title:"Choose an Option",
	options:[
				"Option 1", 
				"Option 2",
				"Option 3"
			],
	cancel: 	"Cancel",
}
```

### Video demo

Android:

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/DusYxxbE6RU/0.jpg)](http://youtu.be/DusYxxbE6RU)

iOS:

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/ohNTD04HsSA/0.jpg)](http://youtu.be/ohNTD04HsSA)


## Testing
There is a test app in [example](https://github.com/MichelBahl/com.optiondialog.widget/tree/example) branch.
