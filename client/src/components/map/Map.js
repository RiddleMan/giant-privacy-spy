import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import ScriptjsLoader from 'react-google-maps/lib/async/ScriptjsLoader';
import CircularProgress from 'material-ui/lib/circular-progress';

export const Map = (props) => {
    return (
        <section style={{height: '100%'}}>
            <ScriptjsLoader
                hostname={"maps.googleapis.com"}
                pathname={"/maps/api/js"}
                query={{v: `3.23.2`, libraries: 'geometry,drawing,places'}}
                loadingElement={
                    <div {...props} style={{ height: '100%' }}>
                        <CircularProgress mode="indeterminate" />
                    </div>
                }
                containerElement={
                    <div {...props} style={{ height: '100%' }} />
                }
                googleMapElement={
                    <GoogleMap
                        defaultZoom={3}
                        defaultCenter={{lat: -25.363882, lng: 131.044922}}
                        onClick={props.onMapClick}>

                        {props.markers.map((marker, index) => {
                            return (
                                <Marker
                                    {...marker}
                                    onRightclick={() => props.onMarkerRightclick(index)} />
                                );
                        })}
                    </GoogleMap>
                } />
        </section>
    );
};
