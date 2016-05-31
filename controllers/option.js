(function constructor(args) {

	var rowStyle = null,
		labelStyle = null;


	if (args.rowType == 'cancel') {

	rowStyle = $.createStyle ({classes: ['cancelRowView']});
	labelStyle = $.createStyle ({classes: ['cancelLabel']});
}
	else if (args.rowType == 'option') {

		rowStyle = $.createStyle({classes: ['optionRowView']});
	labelStyle = $.createStyle ({classes: ['optionLabel']});
	}
	else if (args.rowType == 'selected') {

		rowStyle = $.createStyle({classes: ['selectedRowView']});
	labelStyle = $.createStyle ({classes: ['selectedLabel']});
}

	$.borderView.setVisible(!!args.showBorder);

	rowStyle && $.optionView.applyProperties(rowStyle);
	labelStyle && $.optionRowLabel.applyProperties(labelStyle);

	$.optionRowLabel.setTitle(args.captionLabel);

	$.optionRowLabel.optionNumber = args.optionNumber;
	$.optionView.optionNumber = args.optionNumber;

})($.args);
