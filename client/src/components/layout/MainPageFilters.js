import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import { filterChange } from '../../actions/map';

class MainPageFilters extends Component {
    constructor(props) {
        super(props);

        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSearchPhraseChange = this.onSearchPhraseChange.bind(this);
    }

    onEndDateChange(e, date) {
        this.props.filterChange({
            before: date.toISOString()
        });
    }

    onSearchPhraseChange(e) {
        this.props.filterChange({
            searchPhrase: e.target.value
        });
    }

    onStartDateChange(e, date) {
        this.props.filterChange({
            after: date.toISOString()
        });
    }


    render() {
        const { map: {
            filters: {
                after, before,
                searchPhrase
            }
        }} = this.props;

        return (
            <Paper
                zDepth={4}
                className="mainPage-filters">
                <TextField
                    style={{
                        marginLeft: '20px',
                        marginTop: '4px'
                    }}
                    value={searchPhrase}
                    onChange={this.onSearchPhraseChange}
                    hintText="Search" />
                <DatePicker
                    onChange={this.onStartDateChange}
                    autoOk
                    value={after && new Date(after)}
                    floatingLabelText="Date from"/>
                <DatePicker
                    onChange={this.onEndDateChange}
                    autoOk
                    value={before && new Date(before)}
                    floatingLabelText="Date to"/>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    const { map } = state;
    return {
        map
    };
};

export default connect(mapStateToProps, {
    filterChange
})(MainPageFilters);
