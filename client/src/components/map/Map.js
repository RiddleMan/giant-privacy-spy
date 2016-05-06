import React, { Component } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import CircularProgress from 'material-ui/lib/circular-progress';

const MapLoader = (props) => {
    const { children } = props;

    return (<section style={{height: '100%'}}>
        <ScriptjsLoader
            hostname={"maps.googleapis.com"}
            pathname={"/maps/api/js"}
            query={{v: `3.23.2`, libraries: 'geometry,drawing,places'}}
            loadingElement={
                <div style={{ height: '100%' }}>
                    <CircularProgress mode="indeterminate" />
                </div>
            }
            containerElement={
                <div style={{ height: '100%' }} />
            }
            googleMapElement={children} />
    </section>);
};

const BoxMarker = (props) => {
    const { _id, count, loc: {
        coordinates
    }, onClick } = props;

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
            label={'' + count}
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
