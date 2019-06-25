export const colors = {
  SKY: '#69DFED',
  SEA: '#1263DC',
  CARROT: '#FF9A39',
  COAL: '#282425',
  CREAM: '#EEDBD4',
  FIRE: '#D95A2B',
  BLOOD: '#8C241B',
  WHITE: 'white',
  BLACK: 'black',
  GREEN: 'green',
};

const snackDefault = {
  margin: -2,
  paddingTop: 5,
  paddingBottom: 5,
  borderRadius: 0
}
const themeDefault = { colors: { accent: '#fff' } };

export const snacks = {
  SUCCESS: {
    style: Object.assign({ backgroundColor: colors.GREEN },snackDefault),
    theme: themeDefault
  },
  WARNING: {
   style: Object.assign({ backgroundColor: colors.FIRE },snackDefault),
   theme: themeDefault
  },
  DANGER: {
    style: Object.assign({ backgroundColor: colors.BLOOD },snackDefault),
    theme: themeDefault
  }
};
