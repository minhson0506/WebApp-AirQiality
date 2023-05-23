import CSS from 'csstype';

export const flexBox: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
};

export const colors = {
    lightBlue: '#F4F9FF',
    darkBlue: '#2D387A',
    darkGreen: '#58BB33',
    darkRed: '#FE0000',
    darkYellow: '#FFCC00',
    gray: '#B3B2B2',
    lightGray: '#EBEBEB',
    darkGray: '#525151',
};

export const flexBoxWithBG: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    backgroundColor: colors.lightBlue,
};

export const NormalTextStyle: CSS.Properties = {
    fontSize: '18px',
    color: 'black',
};

export const BoldTextStyle: CSS.Properties = {
    fontSize: '18px',
    color: 'black',
    fontWeight: 'bold',
};
