var React = require('react-native');
var { requireNativeComponent } = require('react-native');

class ColorPickerView extends React.Component {

    render() {
        return <RCTColorPicker {...this.props} />;
    }
}

ColorPickerView.propTypes = {
    /**
     * When this property is set to `true` and a valid camera is associated
     * with the map, the camera’s pitch angle is used to tilt the plane
     * of the map. When this property is set to `false`, the camera’s pitch
     * angle is ignored and the map is always displayed as if the user
     * is looking straight down onto it.
     */
    color: React.PropTypes.shape({
        hue: React.PropTypes.number.isRequired,
        saturation: React.PropTypes.number.isRequired,
        brightness: React.PropTypes.number.isRequired
    })
};

var RCTColorPicker = requireNativeComponent('RCTColorPicker', ColorPickerView);

export default RCTColorPicker;