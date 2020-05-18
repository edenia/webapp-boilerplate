import palette from './palette'

export default {
  fontFamily: ["'PT Sans', sans-serif;", "'Open Sans', sans-serif;"].join(','),
  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '35px',
    letterSpacing: '-0.24px',
    fontFamily: '"PT Sans", sans-serif;',
    lineHeight: '40px'
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '29px',
    letterSpacing: '-0.24px',
    fontFamily: '"PT Sans", sans-serif;',
    lineHeight: '32px'
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '24px',
    letterSpacing: '-0.06px',
    fontFamily: '"PT Sans", sans-serif;',
    lineHeight: '28px'
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    fontFamily: '"PT Sans", sans-serif;',
    lineHeight: '24px'
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    fontFamily: '"PT Sans", sans-serif;',
    lineHeight: '20px'
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    fontFamily: '"PT Sans", sans-serif;',
    lineHeight: '20px'
  },
  subtitle1: {
    color: palette.text.primary,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    fontFamily: '"Open Sans", sans-serif;',
    lineHeight: '25px'
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    fontFamily: '"Open Sans", sans-serif;',
    lineHeight: '21px'
  },
  body1: {
    color: palette.text.primary,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    fontFamily: '"Open Sans", sans-serif;',
    lineHeight: '21px'
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '12px',
    letterSpacing: '-0.04px',
    fontFamily: '"Open Sans", sans-serif;',
    lineHeight: '18px'
  },
  button: {
    color: palette.text.primary,
    fontFamily: '"PT Sans", sans-serif;',
    fontSize: '14px'
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '11px',
    letterSpacing: '0.33px',
    fontFamily: '"Open Sans", sans-serif;',
    lineHeight: '13px'
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    fontFamily: '"Open Sans", sans-serif;',
    textTransform: 'uppercase'
  }
}
