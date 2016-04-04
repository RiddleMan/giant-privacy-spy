import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import { compose } from 'redux';

export default compose(
  filter(['token'])
)(adapter(window.localStorage));
