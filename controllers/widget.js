var LTAG = '[com.optiondialog.widget]';


/**
 * self-executing function to organize otherwise inline constructor code
 * 
 * @param  {Object} args arguments passed to the controller
 * @returns void
 */
(function constructor(args) {
	
	$._optionsVisible = false;
	$._windowVisible = false;
	$._selectedOption = null;
	$._isOptionCreated = false;
	
	$._options = args.options;
		
	args.settings = args.settings || {};

	$._openDuration = args.settings.openAnimationDuration || 500;
	$._closeDuration = args.settings.closeAnimationDuration || args.settings.openDuration;
	$._delayClickEvent = args.settings.delayClickEvent || false;

// execute constructor with optional arguments passed to controller
})($.args);


function _createOptions() {

	$.args.title && $.optionTitleLabel.setText($.args.title);

	_.isArray($._options) && $._options.forEach(function(option, index, options) {

		var optionView = Widget.createController('option', {

			optionNumber: index,
																selected: false,
			showBorder: !!$.args.showBorder && index !== (options.length - 1),
			captionLabel: option,
			rowType: $._selectedOption === option ? 'selected' : 'option'
	
		}).getView();

		$.optionRowsWrapper.add(optionView);
	});
	
	if ($.args.cancel) {
		
		var optionCancelView = Widget.createController('option', {

			optionNumber: _.isArray($._options) ? ($._options.length + 1) : 1,
																	selected: false,
			captionLabel: $.args.cancel,
																	showBorder: false,
			rowType: 'cancel'
	
		}).getView();

		$.optionRowsWrapper.add(optionCancelView);
	}

	
	return;
	
} // END _createOptions()


function _toggleOptions(args) {
	
	$.optionWrapper.animate({
	
		bottom: ($._optionsVisible ? -$.optionWrapper.rect.height : 0),
		duration: ($._optionsVisible ? $._closeDuration : $._openDuration)

	}, function () {
	
		$._optionsVisible = !$._optionsVisible;
	
		_.result(args, 'onCompleteAnimation');

		return;
	});

} // END _toggleOptions()

	
function _toggleWindow(args) {

	var newOpacityValue = ($._windowVisible ? 0.0 : 1.0);

	$.optionWindow.animate({

		opacity: newOpacityValue,
		duration: ($._windowVisible ? $._closeDuration : $._openDuration)

	}, function () {

		$.optionWindow.setOpacity(newOpacityValue);

		$._windowVisible = !$._windowVisible;

		_.result(args, 'onCompleteAnimation');

		return;
	});

} // END _toggleWindow()


/**
 * Exported functions
 */
function _show() {
	
	$.optionRowsWrapper.children.forEach(function (child) {
	
		$.optionRowsWrapper.remove(child);
	});

	$._isOptionCreated || _createOptions();

	OS_IOS && $.optionWindow.open();

		$.optionWrapper.bottom = - $.optionWrapper.rect.height;
	
	OS_ANDROID && $.optionWindow.setVisible(true);

	_toggleOptions();
	_toggleWindow();

	return;
	
} // END _show()


function _setSelectedOption(option) {

	$._selectedOption = option;

	return;

} // END _setSelectedOption()


function _triggerClickEvent(e) {

	var optionsNum = Number(e.source.optionNumber);


	$.trigger('click', {
		
		index: optionsNum,
		source: e.source,
		cancel: !!($.args.cancel && optionsNum === options.length)
	});  


	return;

} // END _triggerClickEvent()


function closeDialog(event) {

	var ghostClickEvent = {

		index: -1,
		source: $.optionWindow
	};


	if ($.args.cancel) {

		ghostClickEvent.index = $._options.length;
		ghostClickEvent.source = _.last($.optionRowsWrapper.getChildren());
}

	ghostClickEvent.cancel = true;


	_toggleWindow();
	_toggleOptions({

		onCompleteAnimation: function () {

			OS_IOS && $.optionWindow.close();
			OS_ANDROID && $.optionWindow.setVisible(false);

			$._delayClickEvent && $.trigger('click', ghostClickEvent);

			return;

		} // END onCompleteAnimation()
	});


	$._delayClickEvent || $.trigger('click', ghostClickEvent);

	return;

} // END closeDialog()


/**
 * UI Eventlistener
 */
function doClickOptionDialog (e) {
	
	e.cancelBubble = true;
	e.source.options = $._options;
	 

	_toggleWindow();
	_toggleOptions({

		onCompleteAnimation: function(){
			
			OS_IOS && $.optionWindow.close();
			OS_ANDROID && $.optionWindow.setVisible(false);

			$._delayClickEvent && _triggerClickEvent(e);

			return;
		}
	});	


	$._delayClickEvent || _triggerClickEvent(e);

	return;

} // END doClickOptionDialog()


/**
 * Sets new options
 *
 * @public
 * @param {Dictionary[]} options
 * @returns {*}
 */
function _setOptions(newOptions) {

	_.isArray(newOptions) && ($._options = newOptions);

	return $._options;

} // END _setOptions()


/**
 * Get current options
 *
 * @public
 * @returns {Dictionary{}}
 */
function _getOptions() {

	return $._options;

} // END _getOptions()


// public interface
exports.setOptions = _setOptions;
exports.getOptions = _getOptions;
exports.setSelectedOption = _setSelectedOption;
exports.show = _show;
