import React from 'react';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';

const PREFIX = 'HorizontalChart';

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
  // border: '1px solid #555',
  [theme.breakpoints.down('lg')]: {
    maxHeight: '60%',
    maxWidth: '70%',
  },
  [theme.breakpoints.down('sm')]: {
    maxHeight: '70%',
    maxWidth: '90%',
  },
  [theme.breakpoints.up('md')]: {
    maxHeight: '30%',
    maxWidth: '65%',
  },
}));

export default function HorizontalChart(props) {
  const borderClass = props.bordered ? classes.borderedChart : '';
  return (
    <Root>
      <CenteredBox>
        <StyledChart src={props.img_src} className={borderClass}/>
      </CenteredBox>
    </Root>
  );
}
