import React from 'react';
import { AppBar } from 'material-ui';


class MainView extends React.Component {
    render() {
        return (
            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more" />
            </div>
        );
    }
}

export default MainView;
