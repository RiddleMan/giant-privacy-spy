import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';
import { filterChange, getAllTags } from '../../actions/map';
import Tag from './Tag';

class MainPageFilters extends Component {
    constructor(props) {
        super(props);

        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onSearchPhraseChange = this.onSearchPhraseChange.bind(this);
        this.onTagToggle = this.onTagToggle.bind(this);
    }

    componentDidMount() {
        this.props.getAllTags();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.pathname !== nextProps.pathname && nextProps.pathname === '/')
            this.props.getAllTags();
    }

    onTagToggle(name) {
        const filterTags = this.props.map.filters.tags;

        const idx = filterTags.indexOf(name);
        let res = filterTags.slice();

        if(idx === -1)
            res.push(name);
        else
            res.splice(idx, 1);

        this.props.filterChange({
            tags: res
        });
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
            },
            tags
        }} = this.props;

        const filters = this.props.map.filters;
        const inputStyle = {
            marginLeft: '20px',
            marginTop: '4px',
            width: 'calc(100% - 40px)'
        };

        return (
            <Paper
                zDepth={4}
                className="mainPage-filters">
                <TextField
                    style={inputStyle}
                    value={searchPhrase}
                    onChange={this.onSearchPhraseChange}
                    hintText="Search" />
                <DatePicker
                    style={inputStyle}
                    onChange={this.onStartDateChange}
                    autoOk
                    value={after && new Date(after)}
                    floatingLabelText="Date from"/>
                <DatePicker
                    style={inputStyle}
                    onChange={this.onEndDateChange}
                    autoOk
                    value={before && new Date(before)}
                    floatingLabelText="Date to"/>
                {tags.items.map((tag) =>
                    <Tag
                        key={tag}
                        name={tag}
                        onToggle={this.onTagToggle}
                        isSelected={filters.tags.indexOf(tag) !== -1} />
                )}
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    const { map, routing: {
        location: {
            pathname
        }
    } } = state;
    return {
        map,
        pathname
    };
};

export default connect(mapStateToProps, {
    filterChange,
    getAllTags
})(MainPageFilters);
