import React, { Component } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import CircularProgress from 'material-ui/CircularProgress';

export const MapLoader = (props) => {
    const { children, style } = props;

    const sectionStyle = {
        flex: 1,
        display: 'flex',
        ...style
    };

    return (<section style={sectionStyle}>
        <ScriptjsLoader
            hostname={"maps.googleapis.com"}
            pathname={"/maps/api/js"}
            query={{
                v: `3.23.2`,
                libraries: 'geometry,drawing,places',
                key: 'AIzaSyBdVtYB52VVT08H46qGtQw-xvK6AKT_MEk'
            }}
            loadingElement={
                <div style={{ height: '100%' }}>
                    <CircularProgress mode="indeterminate" />
                </div>
            }
            containerElement={
                <div style={{ flex: 1 }} />
            }
            googleMapElement={children} />
    </section>);
};

const BoxMarker = (props) => {
    const { _id, count, loc: {
        coordinates
    }, onClick } = props;

    const image = count > 9 ? '9+' : count;

    return (
        <Marker
            {...props}
            onClick={() => onClick({
                _id,
                center: {
                    lng: coordinates[0],
                    lat: coordinates[1]
                }
            })}
            icon={require(`./icons/${image}.png`)}
            position={{
                lng: coordinates[0],
                lat: coordinates[1]
            }}
            defaultAnimation={2}
            key={_id}
            />
    );
};

export class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultCenter: {
                lat: -25.363882,
                lng: 131.044922
            }
        };

        this.onCenterChangeInternal = this.onCenterChangeInternal.bind(this);
    }

    onCenterChangeInternal() {
        const { onCenterChange } = this.props;
        const bounds = this.map.props.map.getBounds();

        onCenterChange({
            ne: bounds.getNorthEast().toJSON(),
            sw: bounds.getSouthWest().toJSON(),
            center: bounds.getCenter().toJSON()
        });
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.map.props.map.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }

    render() {
        const { onMarkerClick } = this.props;
        const { defaultCenter } = this.state;
        return (
            <MapLoader>
                <GoogleMap
                    ref={(x) => this.map = x}
                    onCenterChanged={this.onCenterChangeInternal}
                    defaultZoom={3}
                    defaultCenter={defaultCenter}>

                    {this.props.boxes.map((box) =>
                        <BoxMarker
                            onClick={onMarkerClick}
                            key={box._id}
                            {...box} />
                    )}
                </GoogleMap>
            </MapLoader>
        );
    }
}
