import React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

const PREFIX = 'VerticalChart';

const classes = {
  borderedChart: `${PREFIX}-borderedChart`,
};

const Root = styled('div')({
  [`& .${classes.borderedChart}`]: {
    border: '1px solid #555',
    padding: '5px',
  },
});
const CenteredBox = styled(Box)(({themes}) => ({
  margin: '0 auto',
  justifyContent: 'center',
  display: 'flex',
  paddingTop: 10,
  paddingBottom: 10,
}));

const StyledChart = styled('img')(({theme}) => ({
  [theme.breakpoints.down('lg')]: {
    maxWidth: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '60%',
    maxWidth: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    maxHeight: '30%',
    maxWidth: '40%',
  },
}));

export default function VerticalChart(props) {
  const borderClass = props.bordered ? classes.borderedChart : '';
  return (
    <Root>
      <CenteredBox>
        <StyledChart src={props.img_src} className={borderClass}/>
      </CenteredBox>
    </Root>
  );
}
