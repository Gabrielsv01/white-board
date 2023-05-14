import {atom} from 'jotai';
import {theme} from 'theme/variables';

const nodeProps = atom({
  colors: [
    {
      id: '1',
      color: theme.colors.white,
    },
  ],
});

const nodeColor = atom('');
const nodeSelectedID = atom('');
export {nodeColor, nodeProps, nodeSelectedID};
