import shallowCompare from 'react-addons-shallow-compare';

export default function(target) {
    const baseCompare = target.prototype.shouldComponentUpdate;
    target.prototype.shouldComponentUpdate = function(nextProps, nextState) {
        if(shallowCompare(this, nextProps, nextState)) {
            if(baseCompare) {
                return baseCompare.bind(this)(nextProps, nextState);
            }
            return true;
        }
        return false;
    };

    return target;
}
