import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import HorizontalChart from './HorizontalChart';
import VerticalChart from './VerticalChart';

const PREFIX = 'PowerPlay';

const classes = {
  header: `${PREFIX}-header`,
  container: `${PREFIX}-container`,
  headerImage: `${PREFIX}-headerImage`,
  smallHeader: `${PREFIX}-smallHeader`,
  chartWrapper: `${PREFIX}-chartWrapper`,
};

const BlogPaper = styled(Paper)(({theme}) => ({
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('lg')]: {
    width: '98%',
    padding: 10,
  },
  [theme.breakpoints.up('md')]: {
    width: '80%',
    padding: 20,
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
    padding: 20,
  },
}));

const StyledBlogPaper = styled(BlogPaper)(({theme}) => ({
  [`& .${classes.header}`]: {
    marginBottom: 15,
  },

  [`&.${classes.container}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  [`& .${classes.headerImage}`]: {
    maxHeight: '45%',
    maxWidth: '80%',
  },

  [`& .${classes.smallHeader}`]: {
    textDecoration: 'underline',
  },

  [`& .${classes.chartWrapper}`]: {
    margin: '0 auto',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: 10,
  },
}));

const CenteredText = styled(Typography)(({theme}) => ({
  textAlign: 'center',
}));

export default function PPEBlog() {
  return (
    <StyledBlogPaper elevation={4} className={classes.container}>
      <meta name="viewport" content="width=device-width, initial-scale=0.8, maximum-scale=1" />
      <CenteredText variant="h3">NHL Power Play Efficiency</CenteredText>
      <img
        src="ppe_preview.png"
        className={classes.headerImage}
      />
      <Typography variant="subtitle1">By Kylan Sakata</Typography>
      <Typography variant="subtitle2">Mar 10, 2023</Typography><br /><br />

      <i>The term “Power Play” is synonymous with hockey and the NHL, but what is it exactly?</i>
      <Typography variant="h4">Introduction</Typography>
      <Typography variant="body1">
        When a team commits a penalty during play, that team must send one or more of their players to the penalty
        box for a period of time, usually 2 minutes. The penalized team must play <i>shorthanded</i> (SH) until that
        penalty expires. The team with the manpower advantage is said to be on the <b>power play</b> (PP). Meanwhile,
        the shorthanded team is on the <b>penalty kill</b> (PK).<br /><br />

        Teams are allotted 6 players on the ice at once (one usually being a goaltender), so the bulk of an NHL game
        will be played five on five (“full strength”) as the goaltenders aren’t included in this count. While full
        strength metrics are popular to determine team ratings, much of the game is not played at full strength – about
        20% of the time in 2021. Any time the game is not being played at full strength, each unit can be referred to
        as having their <b>special teams</b> on the ice. This can be 5v4, 4v4, or even 3v5 (note that in the NHL, each
        team must have at least 3 skaters on the ice).
        <br /><br />
      </Typography>

      <Typography variant="h4">Performance on Power Plays</Typography>
      <Typography variant="body1">
        Power Play percentage (PP%) is the standard measure of efficiency on power plays. It is calculated by dividing
        the number of power play goals by the number of power play opportunities.<br /><br />

        While PP% is routinely maintained and referenced by the NHL, it is by no means a perfect metric. Let’s consider
        an extreme example:
        <ol>
          <li>The New York Rangers have 1 power play goal (PPG) from 2 opportunities</li>
          <ul>
            <li>The 2 power plays were 2 minutes and 5 minutes, respectively</li>
          </ul>
          <li>The Seattle Kraken have 1 PPG from 2 opportunities</li>
          <ul>
            <li>The 2 power plays were 30 seconds and 15 seconds, respectively</li>
          </ul>
        </ol>

        These two teams would have the same official PP% (50%), yet Seattle is clearly more efficient than New York.
        Thanks to a handy <a rel="noopener" href="https://medium.com/second-look/nhl-should-change-how-we-calculate-power-play-efficiency-8b8b9ea93883">article</a> by
        Chris Land from Medium, we can compare Power Play Efficiency (PPE), which looks at goals over time versus
        goals over opportunities.<br /><br />

        This inspired me to dig into play by play data and create more granular investigations, which we will go over below.
        First, let’s look at the league average PPE and PP% over the last 6 years.
        <HorizontalChart img_src='./ppe_pics/ppe_vs_ppp.png'/>

        The average difference over this time span is about 4% (PPE: 23.9%, PP%: 19.8%). The average PPE is greater
        than PP% due to short and long penalties being treated equally when calculating PP%, as mentioned earlier.
        Not only are teams’ PPE penalized for “wasting” a 15 second power play opportunity, but power play units
        that can score quickly and efficiently are treated the same as those who take 2 or even 4 minutes longer
        to do so.
      </Typography>

      <Typography variant="h5">Biggest Winners/Losers of PPE</Typography>
      <Typography variant="body1">
        Let’s define <b>residual</b> as the difference between PPE and PP%: PPE - PP%. A high residual means that a
        team’s power play was more efficient than the box score PP% indicated and a low or negative residual means
        that PP% overstated the efficiency of a team’s power play.
      </Typography>
      <VerticalChart img_src="./ppe_pics/heatmap.png"/>
      <Typography variant="body1">
        This table shows the top and bottom 10 residuals out of all team-seasons from 2016-2021. As mentioned, the
        league average residual is about 4%, with the average PPE at ~24%. What stands out is that teams at the top
        tend to have strong PP% numbers to begin with and vice-versa for the teams at the bottom. In general, PP%
        underestimates the strength of top power play units, while overestimating the weakness of poor power play
        units (yikes, Anaheim).<br /><br />

        This can be further illustrated by plotting all season-teams along with the league average PPE and PP%.<br />
      </Typography>
      <HorizontalChart img_src="./ppe_pics/season_teams_scatter.png" />
      <Typography variant="body1">
        We can see that in general, teams towards the right (stronger power play) are above the residual line and
        as the power play performance gets worse, the residual tends to decrease. The true strength of teams’
        power plays is emphasized more at the extremes by PP%.
      </Typography>

      <Typography variant="h5">Regular Season OT Power Plays</Typography>
      <Typography variant="body1">
        Overtime hockey is a thrilling watch, whether in a regular season or playoff game. In the playoffs,
        overtime is treated as a true extra period, with the default 5 on 5 hockey. In 2015, the NHL implemented
        a 5 minute, 3 on 3 overtime to shorten regular season games (among other subtle OT rules). Any goal
        during overtime wins the game immediately. This leads to much more excitement and scoring, cutting down
        on ties.<br /><br />

        Below are the scoring rates of the different even strengths possible in the NHL. <i>(Aside: I think the
        3v3 scoring rate is actually underestimated due to teams prioritizing puck possession in OT, since it
        is difficult to get the puck without relying on a goalie save. Teams often willingly leave the zone
        to get fresh bodies on the ice and are careful about giving chances the other way.)</i>
      </Typography><br />
      <HorizontalChart img_src="./ppe_pics/even_strengths.png" />

      <Typography variant="body1">
        As mentioned previously, teams must have at least 3 skaters on the ice. This means when penalties are
        taken in regular season OT, opposing teams <b>gain</b> a skater, rather than penalized teams playing
        with 1 less man (though the penalized player must still go to the box). Thus, when teams go on the
        power play in OT, they play 4v3.<br /><br />

        This must be treated differently than the traditional 5v4 power play for few reasons:<br />
        <ul>
          <li>Teams routinely practice 4v5 penalty kills with specific 4 man lineups and structures.</li>
          <li>Defending the zone with 3 as opposed to 4 leaves more open ice, which leads to more
          passing/shooting lanes.</li>
          <li>It is harder to clear the puck or gain possession with just 3 skaters without risking a
          3v2 or 4v2 opportunity (by putting yourself out of position).</li>
          <li>In overtime, it is harder to substitute defenders due to the rink orientation. Teams’ benches
          are closer to their offensive zone in OT which allows the offense to easily change. This leads to
          fresher legs on offense and long shifts/tired legs on defense.</li>
        </ul>

        Let’s take a look at the PPE of 5v4 vs 4v3 situations:
      </Typography>
      <HorizontalChart img_src="./ppe_pics/overtime_ppe.png"/>

      <Typography variant="body1">
        As we can see, for a 2 minute power play, a 4 on 3 is almost 2x likely to succeed as a traditional
        5 on 4, while also allowing shorthanded goals about 2x less often. The bottom line is penalties
        in regular season OT are disastrous and should be avoided at all costs.<br /><br />

        For the sake of argument, let’s say your team successfully kills a 4v3 PP (~60%). There is still
        about a 50% chance of winning the game afterwards at even strength. So once you take a penalty in
        OT, you give the other team a:
      </Typography>
      <HorizontalChart img_src="./ppe_pics/ot_wp.png" bordered={true}/>
      <br />

      <Typography variant="body1">
        Not Great.<br /><br />

        As strange as it sounds, if the opposing team has a breakaway in OT (a one-on-one chance with the
        goaltender), your odds are probably better off leaning on your goaltender to make a stop versus
        taking a penalty.<br /><br />

        For reference, here are the penalty shot conversion rates from the same timeframe. With an
        overall 31.28% penalty shot conversion rate, you are probably better off playing clean and
        letting it go versus killing a 2 minute 4 on 3.<br />
      </Typography>

      <VerticalChart img_src="./ppe_pics/penalty_shots.png" />
      <Typography variant="caption">(Data courtesy of Hockey Reference)</Typography>

      <Typography variant="h4">Regular Season vs Playoff PPE</Typography>
      <Typography variant="body1">
        Another curious topic for me was the difference in PPE in the playoffs vs. the regular season.
        Over our 2016-2021 time span, the percentage of time spent playing 5v5 is almost exactly the
        same: 81.51% in the regular season and 81.33% in the playoffs. Although the playoff sample
        size is about 13x smaller, there are still ~573 games to analyze, a fair amount to look at.<br /><br />

        Let’s first compare regular season PPE vs playoff PPE:<br />
      </Typography>
      <HorizontalChart img_src='./ppe_pics/reg_szn_vs_playoffs.png'/><br />

      <Typography variant="body1">
        Playoff PPE has quite a bit of variance, which is to be expected considering the sample size
        disparity. In general, there aren’t many trends that we can identify from the year-to-year data.
        Curiously, the scoring was slightly down in 2016, but there were no meaningful rule changes to suggest
        that this is anything other than noise. (Note: Scoring in the NHL has been on an upward trend )
      </Typography>

      <HorizontalChart img_src='./ppe_pics/ppe_and_shg.png'/><br />
      <Typography variant="body1">
        <i>(Comparing the total regular season and playoff PPE between 2016-2021.)</i><br /><br />

        We see that playoff PPE is slightly higher, but again the difference is so miniscule that it’s probably
        best to chalk this up to variance and a smaller sample size.<br /><br />

        Interestingly, the SHG rate is lower, about a 24% decrease from the regular season. Why is this?
        Here are a few ideas:
      </Typography>

      <ul>
        <li>Smaller sample size.</li>
        <li>Better goaltending, on average.</li>
        <li>Better power play and more discipline to prevent quality shorthanded chances.</li>
        <li>A higher propensity in the playoffs for the PK to clear the puck rather than looking for a scoring
        chance and leaving the PK unit vulnerable to an odd man rush the other way.</li>
      </ul>

      <Typography variant="h5">Playoff vs Regular Season Even Strength Scoring Rates</Typography>
      <HorizontalChart img_src="./ppe_pics/5v5_and_4v4.png" />

      <Typography variant="body1">
        While the power play efficiency remains stable from the regular season to the playoffs, we can see a
        decrease in even strength scoring (3v3 is omitted due to the extreme rarity of it in the postseason).<br /><br />

        Though the 5 on 5 scoring is only down 0.2 goals/60 mins, this translates to an overall decrease of 7.7%.
        Keep in mind that this is per-team, not per-game scoring; a 0.4 goal decrease in a game that averages ~6
        goals/game is quite meaningful.<br /><br />

        4 on 4 scoring is also down about 10%, though the sample size is significantly smaller and could be
        attributed to a focus on puck possession and defensive integrity since teams understand the volatility
        of 4v4 scoring.<br />
      </Typography>

      <Typography variant="h5">The 2022-23 Oilers</Typography>
      <Typography variant="caption">Connor McDavid and Edmonton’s Historic Power Play</Typography>
      <Typography variant="body1"><i>(As of March 7, 2023)</i></Typography>

      <Typography variant="body1">
        Connor McDavid is leading an unbelievable power play in Edmonton this year. Through 65 games, McJesus
        leads the league in goals (54), assists (70), and points (124). It is not a hot take to say that this
        is one of the greatest power play units to ever grace the ice.<br /><br />

        His right-hand man Leon Draisaitl has a blistering 26 PP goals on the season and could feasibly break
        the all-time record of 34 by Tim Kerr (‘85 PHI). No shade to linemate Ryan Nugent-Hopkins, who is also
        a stud, but there’s no secret why he is 3rd in the league in power play points (behind McDavid and
        Draisaitl): it’s McDavid’s terrifying combination of speed, vision, shot-making, and TOI (he leads
        all forwards in time on ice).<br /><br />

        Edmonton’s top line is the most exciting show in hockey now and I’m excited to see this unit in
        the postseason.
      </Typography>

      <HorizontalChart img_src="./ppe_pics/2023_ppe.png" />

      <Typography variant="h4">Miscellaneous Stats</Typography>
      <Typography variant="h5">PPE for 5 min majors</Typography>
      <Typography variant="body1">
        PPE is the scoring efficiency for 2 minute power plays, which are caused by minor penalties. Major
        penalties differ in two main ways: they last for 5 minutes, and do not expire upon scored goals.<br /><br />

        By taking our standard PPE (~24%), we can extrapolate a 5 minute PPE as 24% x (5/2) = 60%. However, since
        multiple goals can be scored in a major penalty, I claim that they can loosely be modeled by a Poisson
        distribution with average rate 0.6.<br /><br />

        By plugging this rate into a solver, we see that there is a:
      </Typography>
      <ul>
        <li>54.9% chance of killing the penalty (0 goals)</li>
        <li>32.9% chance of scoring 1 goal</li>
        <li>9.9% chance of scoring 2 goals</li>
        <li>2.3% chance of scoring more than 2 goals</li>
      </ul>

      <Typography variant="body1">
        Of course, these approximations aren’t perfect and can rely on game state. For example, a team up 3 goals
        with a few minutes left in the game will generally prioritize preventing shorthanded chances. However, I
        believe this is a close enough estimate of the scoring rate and shows the possible dangers of taking a major
        penalty. It is not uncommon to see them get killed, but a quick goal can put the PK team against the wall.
      </Typography>

      <Typography variant="h5">5v4 vs 5v3 PPE</Typography>
      <Typography variant="body1">
        This is actually the main question I wanted to answer when I started this project, inspired by an
        old <a href="http://behindthenet.ca/blog/2008/12/scoring-probability-vs-length-of-2-man.html">blog post</a>.
        I didn’t like the fact that PP% encapsulated 5v3s and 4v3s and wanted to look at the true danger of a
        5v3. Though the Behind the Net blog is probably the better way to illustrate scoring chances, I figure
        PPE is also a decent way of looking at it. This is due to the fact that:
      </Typography>
      <ul>
        <li>Full 2 minute 5 on 3s are quite rare, and</li>
        <li>The sample size of 5 on 3 opportunities is small.</li>
      </ul>

      <Typography variant="body1">
        Hopefully, looking at scoring rate (PPE) rather than length-per-opportunity suffices. Below, we compare 5v4 and 5v3 efficiencies:
      </Typography>
      <HorizontalChart img_src="./ppe_pics/5v4_and_5v3.png" />

      <Typography variant="body1">
        As expected, there is a huge advantage to a 5v3 power play, with an astounding 64.66 PPE, which is slightly
        higher than the PPE for a 5 minute 5v4 power play. 5v3 PPE and 5min major PPE cannot be compared however,
        as scoring 5 on 3 will usually expire a penalty (unmatched major penalties are quite rare, much less in a
        5v3 situation).<br /><br />

        The 5v4 PPE is slightly lower than the league average overall PPE as expected, since the 4v3 and 5v3 power
        plays–albeit rare–help boost the overall PPE.<br /><br />

        Looking at the surrendered SH goals, we can expect 1 shortie per ~30 full 2 minute power plays. On the other
        hand, 3 on 5 goals are extremely rare: there have been 3 that my scraper picked up between the 2016-2021
        seasons. They are rare for obvious reasons, but it can help to contextualize them:
      </Typography>

      <ul>
        <li>As alluded to earlier, 5 on 3 power plays are rarely the full 2 minutes, so having a fraction of that
        time to score (for either team, really) makes it difficult.</li>
        <li>Clearly, being at a 2 man disadvantage makes it hard to score, so clearing the puck out of the zone
        and burning time is by far the main priority–not scoring.</li>
        <li>Even if there is a window to have a scoring chance, not converting it leaves only 1 or 2 defenders
        back to prevent a scoring chance the other way.</li>
      </ul>

      <Typography variant="body1">
        Of course, if your team is killing a 5 on 3 and are comfortably up on the scoreboard, this is further
        reason to not overextend your penalty killers and focus on burning time and remaining defensively sound.
        <br /><br />

        Shoutout to the three 3 on 5 goals scored between the 2016-2021 seasons:
      </Typography>
      <HorizontalChart img_src="./ppe_pics/3_on_5_goals.png" />

      <Typography variant="h4">Thanks</Typography>
      <Typography variant="body1">
        Thanks for reading. Special thanks to GitHub user danmorse314 whose HockeyR library made this all possible
        by scraping the NHL’s play-by-play. Also to Hockey Reference whose awesome stats were used for the league’s
        PP% and penalty shot history.<br /><br />

        I enjoyed learning more about the NHL’s very complex penalty system and digging into the play-by-play to
        curate the data used in these analyses. I will post my scraper on GitHub soon with a writeup on how the
        large system works and also plan to look at PKE next: Penalty Kill Efficiency.
      </Typography>
    </StyledBlogPaper>
  );
}
