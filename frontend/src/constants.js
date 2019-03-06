import PropTypes from 'prop-types';

export const devicePropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    port: PropTypes.number.isRequired,
    state: PropTypes.oneOf(['On', 'Off'])
});

export const groupPropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['On', 'Off'])
});
