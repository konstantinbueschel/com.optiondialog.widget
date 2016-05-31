(function constructor(args) {

	$.borderView.applyProperties(_.omit(args, 'id', '__parentSymbol', '__itemTemplate', '$model'));

})($.args);


// public interface
exports.setVisible = function(visible) {

	$.borderView.setVisible(!!visible);
};
