import equalShallow from './equalShallow';

export default function(props, state, nextProps, nextState) {
    return !(equalShallow(props, nextProps) && equalShallow(state, nextState));
}
