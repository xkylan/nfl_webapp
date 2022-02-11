import {React, Component} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import * as d3 from 'd3';
import './LeverageCalculator.css';

const ALL_TEAMS = [
  {'team_id': 'ARI', 'team_name': 'Arizona Cardinals'},
  {'team_id': 'ATL', 'team_name': 'Atlanta Falcons'},
  {'team_id': 'BAL', 'team_name': 'Baltimore Ravens'},
  {'team_id': 'BUF', 'team_name': 'Buffalo Bills'},
  {'team_id': 'CAR', 'team_name': 'Carolina Panthers'},
  {'team_id': 'CHI', 'team_name': 'Chicago Bears'},
  {'team_id': 'CIN', 'team_name': 'Cincinnati Bengals'},
  {'team_id': 'CLE', 'team_name': 'Cleveland Browns'},
  {'team_id': 'DAL', 'team_name': 'Dallas Cowboys'},
  {'team_id': 'DEN', 'team_name': 'Denver Broncos'},
  {'team_id': 'DET', 'team_name': 'Detroit Lions'},
  {'team_id': 'GB', 'team_name': 'Green Bay Packers'},
  {'team_id': 'HOU', 'team_name': 'Houston Texans'},
  {'team_id': 'IND', 'team_name': 'Indianapolis Colts'},
  {'team_id': 'JAX', 'team_name': 'Jacksonville Jaguars'},
  {'team_id': 'KC', 'team_name': 'Kansas City Chiefs'},
  {'team_id': 'LV', 'team_name': 'Las Vegas Raiders'},
  {'team_id': 'LAC', 'team_name': 'Los Angeles Chargers'},
  {'team_id': 'LAR', 'team_name': 'Los Angeles Rams'},
  {'team_id': 'MIA', 'team_name': 'Miami Dolphins'},
  {'team_id': 'MIN', 'team_name': 'Minnesota Vikings'},
  {'team_id': 'NE', 'team_name': 'New England Patriots'},
  {'team_id': 'NO', 'team_name': 'New Orleans Saints'},
  {'team_id': 'NYG', 'team_name': 'New York Giants'},
  {'team_id': 'NYJ', 'team_name': 'New York Jets'},
  {'team_id': 'PHI', 'team_name': 'Philadelphia Eagles'},
  {'team_id': 'PIT', 'team_name': 'Pittsburgh Steelers'},
  {'team_id': 'SF', 'team_name': 'San Francisco 49ers'},
  {'team_id': 'SEA', 'team_name': 'Seattle Seahawks'},
  {'team_id': 'TB', 'team_name': 'Tampa Bay Buccaneers'},
  {'team_id': 'TEN', 'team_name': 'Tennessee Titans'},
  {'team_id': 'WAS', 'team_name': 'Washington Football Team'},
];

class LeverageCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr_team: null,
      name_to_id: null,
      id_to_name: null,
      games: null,
    };

    this.updateCurrTeam = this.updateCurrTeam.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.toggleLeverage = this.toggleLeverage.bind(this);
    this.setCheckboxColors = this.setCheckboxColors.bind(this);
  }

  componentDidMount() {
    const team_name_to_team_id = {};
    const team_id_to_team_name = {};

    for (const team of ALL_TEAMS) {
      const team_name = team['team_name'];
      const team_id = team['team_id'];

      team_name_to_team_id[team_name] = team_id;
      team_id_to_team_name[team_id] = team_name;
    }

    // set the id/name maps and render the default leverage graph
    this.setState({
      name_to_id: team_name_to_team_id,
      id_to_name: team_id_to_team_name,
    }, () => {
      this.updateGraph('DAL');
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  // handler for the team dropdown which triggers the d3 chart to render with a new team
  updateCurrTeam(e) {
    console.log(e);
    let team_id;
    let curr_team;
    if (e.target.outerText) {
      curr_team = e.target.outerText;
      team_id = this.state.name_to_id[curr_team];
    } else if (e.keyCode === 13 && e.target.value) {
      console.log('user hit return to change team');
      curr_team = e.target.value;
      team_id = this.state.name_to_id[curr_team];
      console.log(team_id);
    } else {
      return;
    }
    this.updateGraph(team_id);
  }

  setCheckboxColors(colorFunc) {
    const leverages = ['Playoff', 'Division', 'Bye'];

    for (const leverage of leverages) {
      const checkbox_label = document.getElementById(leverage.toLowerCase() + '_label');
      checkbox_label.style.color = colorFunc(leverage);

      const checkbox_id = leverage.toLowerCase() + '_checkbox';
      document.getElementById(checkbox_id).style.color = colorFunc(leverage);
    }
  }

  toggleLeverage(event) {
    // infer the type of leverage we are toggling from the checkbox name
    let leverage_type = event.target.name.split('_')[0];
    leverage_type = leverage_type.charAt(0).toUpperCase() + leverage_type.slice(1);

    // is the element currently visible ?
    const currentOpacity = d3.selectAll('.' + leverage_type).style('opacity');

    // Change the opacity: from 0 to 1 or from 1 to 0
    d3.selectAll('.' + leverage_type).transition().style('opacity', currentOpacity == 0.6 ? 0:0.6);
  }

  // This function is called every time the user selects a new team to chart.
  // It is also called when the component mounts with a default team.
  updateGraph(team_id) {
    console.log('graph updated');
    // Define the different leverages
    const leverages = ['Playoff', 'Division', 'Bye'];

    const curr_team = this.state.id_to_name[team_id];

    const margin = {top: 10, right: 30, bottom: 50, left: 60};
    const width = 750 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Update title with selected team and logo
    document.getElementById('chart_title').innerHTML = `${curr_team} Playoff Leverage`;
    document.getElementById('team_logo').src = `/team_logos/${this.state.name_to_id[curr_team]}.png`;

    // append the svg object to the body of the page
    document.getElementById('my_dataviz').innerHTML = '';
    const svg = d3.select('#my_dataviz')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const colors = d3.scaleOrdinal()
        .domain(leverages)
        .range(d3.schemeSet1);
    this.setCheckboxColors(colors);

    // Create the leverage chart
    d3.csv('/leverage/' + team_id + '/csv',
        // When reading the csv, I must format variables:
        function(d) {
          return {
            week: parseInt(d.week, 10),
            playoff_leverage: d.playoff_leverage,
            division_leverage: d.division_leverage,
            bye_leverage: d.bye_leverage,
            opponent: d.opponent,
          };
        }).then(
        // Now I can use this dataset:
        function(data) {
          const dataReady = leverages.map( function(leverage) {
            return {
              name: leverage,
              values: data.map(function(d) {
                return {
                  week: d.week,
                  value: +d[leverage.toLowerCase() + '_leverage'],
                  opponent: d.opponent,
                  leverage_type: leverage,
                };
              }),
            };
          });
          console.log(dataReady);

          // Add X axis --> it is a date format
          const x = d3.scaleLinear()
              .domain([d3.min(data, function(d) {
                return d.week;
              }), d3.max(data, function(d) {
                return d.week;
              })])
              .range([0, width]);

          const max = d3.max(data, function(d) {
            return d.week;
          });
          console.log(max);
          console.log(data);


          svg.append('g')
              .attr('transform', 'translate(0,' + height + ')')
              .call(
                  d3.axisBottom(x)
                      .ticks(data.length - 1),
              );
          svg.selectAll('.tick').each(function(d, i) {
            console.log(d, i);
            // console.log(dataReady[i].values[d-1].opponent);
            d3.select(this)
                .append('image')
                .attr('xlink:href', '/team_logos/' + dataReady[0].values[i].opponent + '.png')
                .attr('y', 0)
                .attr('x', (x) => x)
                .attr('transform', 'translate(-20,14)')
                .attr('width', 24)
                .attr('height', 24);
          });

          svg.append('text')
              .attr('transform',
                  'translate(' + (width/2) + ' ,' + (height + margin.top + 35) + ')')
              .style('text-anchor', 'middle')
              .text('Week');

          // Add Y axis
          const y = d3.scaleLinear()
              .range([height, 0]);
          svg.append('g')
              .call(
                  d3.axisLeft(y)
                      .tickFormat(function(d) {
                        return d * 100 + '%';
                      }),
              );
          svg.append('text')
              .attr('transform', 'rotate(-90)')
              .attr('y', 0 - margin.left)
              .attr('x', 0 - (height / 2))
              .attr('dy', '1em')
              .style('text-anchor', 'middle')
              .text('Leverage Percentage');

          if (!document.getElementById('tooltip')) {
            d3.select('#my_dataviz')
                .append('div')
                .attr('id', 'tooltip')
                .attr('style', 'position: absolute; opacity: 0;');
          }

          // A function that change this tooltip when the user hover a point.
          // Its opacity is set to 1: we can now see it. Plus it set the text and
          // position of tooltip depending on the datapoint (d)
          const mouseover = function(event, d) {
          // first check if the given leverage is being displayed (if not, don't show tooltip)
            const leverage_checkbox = document.getElementById(d.leverage_type.toLowerCase() + '_checkbox');
            if (leverage_checkbox.checked) {
              d3.select('#tooltip')
                  .transition()
                  .duration(200)
                  .style('opacity', 1);

              event.target.style.opacity = '1';
            }
          };

          const mousemove = function(event, d) {
          // first check if the given leverage is being displayed (if not, don't show tooltip)
            const leverage_checkbox = document.getElementById(d.leverage_type.toLowerCase() + '_checkbox');
            if (leverage_checkbox.checked) {
              const leverage_percentage = d.value * 100;
              d3.select('#tooltip')
                  .html(`
                    Opponent: ${d.opponent}<br>
                    Week: ${d.week}<br>
                    ${d.leverage_type} leverage: ${leverage_percentage.toFixed(2)}%
                  `)
                  .style('left', (event.x + 10) + 'px')
                  .style('top', (event.y - 20) + 'px')
                  .style('font-size', '12px');
            }
          };

          // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
          const mouseleave = function(event, d) {
            d3.select('#tooltip')
                .transition()
                .duration(200)
                .style('opacity', 0);

            event.target.style.opacity = '0.6';
          };

          const leverage_checkboxes = {};
          for (const lev of leverages) {
            leverage_checkboxes[lev] = document.getElementById(lev.toLowerCase() + '_checkbox').checked;
          }

          // First we need to enter in a group
          svg.selectAll('myDots')
          // .data(dataReady.filter(function(d) { return leverage_checkboxes[d.name]}))
              .data(dataReady)
              .join('g')
              .style('fill', (d) => colors(d.name))
              .attr('class', (d) => d.name)
              .attr('opacity', 0.6)
          // Second we need to enter in the 'values' part of this group
              .selectAll('myPoints')
              .data((d) => d.values)
          // .filter(function(d) { return !leverage_checkboxes[d.leverage_type]})
              .join('circle')
              .attr('cx', (d) => x(d.week))
              .attr('cy', (d) => y(d.value))
              .attr('r', 7)
              .attr('stroke', 'white')
              .attr('opacity', 0.6)
              .on('mouseover', mouseover )
              .on('mousemove', mousemove )
              .on('mouseleave', mouseleave );

          // if user untoggled a leverage type, we maintain this as they change to a different team.
          // we render all 3 types of leverage and must set the opacity to 0 for the unchecked leverages, if any.
          for (const leverage of leverages) {
          // if checkbox disabled, make the points 0 opacity
            if (!leverage_checkboxes[leverage]) {
              const leverage_type = leverage;
              const currentOpacity = d3.selectAll('.' + leverage_type).style('opacity');
              // Change the opacity: from 0 to 1 or from 1 to 0
              d3.selectAll('.' + leverage_type).transition().style('opacity', currentOpacity == 0.6 ? 0:0.6);
            }
          }

          // Add a legend
          svg.selectAll('myLegend')
              .data(dataReady)
              .join('g')
              .append('text')
              .attr('x', 9.0/10*width)
              .attr('y', (d, i) => 10 + i*20)
              .text((d) => d.name)
              .style('fill', (d) => colors(d.name))
              .style('font-size', 15);
        },
    );
  }

  getPageTitle() {
    return (
      <Grid item className="full-width-grid">
        <Box className="parent-box-center">
          <Box className="child-box-center">
            <Typography variant="h4" style={{paddingBottom: '1px'}}>NFL Leverage Calculator</Typography>
          </Box>
        </Box>
      </Grid>
    );
  }

  // returns the mui components above the chart: the team dropdown and the leverage checkboxes.
  getDropdownAndCheckboxes() {
    return (
      <Grid item className="full-width-grid">
        <Grid
          container
          direction="row"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item xs={5}>
            <Autocomplete
              id="leverage_team_select"
              options={ALL_TEAMS}
              getOptionLabel={(option) => option.team_name}
              autoComplete
              defaultValue={ALL_TEAMS[8]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Team:"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
              onChange={this.updateCurrTeam}
              /*
              // not responding to clicks, not including team logos in the dropdown
              renderOption={(props, option) => {
                return (
                 <Fragment key={option.team_id + "_option"}>
                    <div display="inline">
                      <Typography>{option.team_name}</Typography>
                      <img
                        src={"/team_logos/" + option.team_id + ".png"}
                        style={{width: "3vh", marginLeft: "1vh"}}
                        alt={option.team_id}
                      />
                    </div>
                 </Fragment>
                )
              }} */
            />
          </Grid>

          <Grid item xs="auto">
            <FormControlLabel
              control={
                <Checkbox
                  id="playoff_checkbox"
                  name="playoff_leverage"
                  onChange={this.toggleLeverage}
                  defaultChecked
                  color="primary"
                />
              }
              label={<Typography variant="h6" id="playoff_label">Playoff</Typography>}
            />
          </Grid>
          <Grid item xs="auto">
            <FormControlLabel
              control={
                <Checkbox
                  id="division_checkbox"
                  name="division_leverage"
                  onChange={this.toggleLeverage}
                  defaultChecked
                  color="primary"
                />
              }
              label={<Typography variant="h6" id="division_label">Division</Typography>}
            />
          </Grid>
          <Grid item xs="auto">
            <FormControlLabel
              control={
                <Checkbox
                  id="bye_checkbox"
                  name="bye_leverage"
                  onChange={this.toggleLeverage}
                  defaultChecked
                  color="primary"
                />
              }
              label={<Typography variant="h6" id="bye_label">Bye</Typography>}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // returns the mui component which renders the title for the chart
  getChartTitle() {
    return (
      <Grid item className="full-width-grid">
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid item>
            <img id="team_logo" style={{width: '6vh'}} alt=""/>
          </Grid>
          <Grid item>
            <Typography variant="h6" id="chart_title"></Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // returns the mui component on the right half of the leverage view:
  // 2 dropdowns with explanations of what leverage is and how it's calculated.
  getLeverageDescriptions() {
    return (
      <Grid item xs={5}>
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="center"
        >
          <Grid item>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="subtitle"><b>What is playoff leverage?</b></Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="body1">
                  Playoff leverage is the difference between playoff probabilities given a win/loss in a given week. <br /><br />

                  For example: <br />
                  1. CLE has a 31% playoff probability given a win in week 6 <br />
                  2. CLE has a 21% playoff probability given a loss in week 6 <br />
                  3. Cleveland&apos;s week 6 playoff leverage is 31%-21% = 10%. <br />
                  <br />

                  In addition to playoff leverage, we simulate and present <b>bye</b> and <b>divisional</b> leverages for each team.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="subtitle"><b>How is playoff leverage calculated?</b></Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Typography variant="body2">
                  More formally, we can define a team <i>t&apos;</i>s playoff leverage in week <i>w</i> as PL(t, w). <br />

                  Let: <br />
                  P<sub>w</sub>(t, w) = P(<i>t</i> makes playoffs | <i>t</i> wins in week <i>w</i>) <b>(1)</b> <br />
                  P<sub>l</sub>(t, w) = P(<i>t</i> makes playoffs | <i>t</i> loses in week <i>w</i>) <b>(2)</b> <br />

                  Then PL(t, w) = P<sub>w</sub>(t, w) - P<sub>l</sub>(t, w). <b>(3)</b><br />

                  Using the publicly available <a href="https://www.espn.com/nfl/fpi" target="_blank" rel="noopener noreferrer">ESPN FPI</a>
                  as a parameter in Lee Sharpe&apos;s <a href="https://nflseedr.com/" target="_blank" rel="noopener noreferrer">nflseedR</a>,
                  we conduct simulations which directly produce <b>(1)</b> and <b>(2)</b> for each team. We aim to run weekly simulations.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div id="leverage-app">
        <Grid
          container
          direction="row"
          spacing={1}
          justifyContent="flex-start"
        >
          <Grid item xs={7}>
            <Grid
              container
              direction="column"
              spacing={2}
              alignItems="flex-start"
            >
              {this.getPageTitle()}

              {this.getDropdownAndCheckboxes()}

              {this.getChartTitle()}

              <Grid item>
                <div id="my_dataviz"></div>
              </Grid>
            </Grid>
          </Grid>

          {this.getLeverageDescriptions()}
        </Grid>
      </div>
    );
  }
}

export default LeverageCalculator;
