import React from 'react';
import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import {CardActionArea, CardContent, CardMedia} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {styled} from '@material-ui/core/styles';

const BlogPaper = styled(Paper)(({theme}) => ({
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
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

const MVPChart = styled('img')(({theme}) => ({
  border: '1px solid #555',
  [theme.breakpoints.down('md')]: {
    maxHeight: '60%',
    maxWidth: '50%',
  },
  [theme.breakpoints.up('md')]: {
    maxHeight: '30%',
    maxWidth: '30%',
  },
}));

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: 15,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerImage: {
    maxHeight: '45%',
    maxWidth: '80%',
  },
  smallHeader: {
    textDecoration: 'underline',
  },
  chartWrapper: {
    margin: '0 auto',
    justifyContent: 'center',
    display: 'flex',
    paddingTop: 10,
  },
}));

export default function Blogs() {
  const classes = useStyles();

  return (
    <BlogPaper elevation={4} className={classes.container}>
      <Typography variant="h2">Super Bowl LVII Preview</Typography>
      <img
        src="sb_preview.jpg"
        className={classes.headerImage}
      />
      <Typography variant="subtitle1">By Kylan Sakata</Typography>
      <Typography variant="subtitle2">Feb 9, 2023</Typography><br />

      <Typography variant="body1">
        The final game of the 2022 season is upon us. Featuring the two best teams in the league and the
        top two MVP candidates, this highly anticipated matchup should be a great 3 hours.
      </Typography><br />

      <Typography variant="h4">Eagles Preview</Typography>
      <Typography variant="body1">
        Despite facing a bottom 5 strength of schedule in their 2022 campaign, the Eagles are as good as advertised.
        With MVP candidate Jalen Hurts at the helm, Philadelphia is 16-1 this season. In these games, Hurts has
        played clean football, throwing 6 ints and fumbling 5 times (none lost). The foundation of this team starts
        on the line of scrimmage, featuring perennial All-Pros Jason Kelce and Landon Dickerson on the offensive
        side of the ball. Including the playoffs, Philly laps the league in rush efficiency, with an astounding
        0.102 EPA/p. The gap between the Eagles and the 2nd-place Ravens (0.013) was greater than that between
        the Ravens and the 21st best Seahawks (-0.073). However, if they must pass, they’re 7th in pass EPA/p
        (0.122), and 6th (0.156) on third down. A.J. Brown and 2nd year star DeVonta Smith create matchup nightmares
        for defenses, with Smith benefiting from DCs honing in on the All-Pro Brown.<br /><br />

        On the other side of the ball, the Eagles are the first team to boast 4(!) double digit sack pass rushers:
        Reddick, Graham, Sweat, and Hargrave. Playing behind this pass rush are two excellent corners, James
        Bradberry and Darius Slay, who have a symbiotic relationship with the rush; great coverage makes the QB
        hold onto the ball, and ferocious pass rush gives the corners a chance to showcase their ball skills and
        create takeaways.<br /><br />

        This surplus of talent has provided Nick Sirriani with a simple formula: get out to an early lead, run
        the ball to burn clock, and force the opposing team to try to catch up versus this unrelenting defense. A
        sneaky benefit of having 4 10+ sack rushers is that the DL rotation allows for playmakers to always be
        fresh and ready, something that Mahomes and company will have to combat for 60 minutes.
      </Typography>
      <br />
      <Typography variant="h4">Chiefs Preview</Typography>
      <Typography variant="body1">
        Patrick Mahomes has reached his 3rd Super Bowl in the last 4 years, looking to add to his laundry list
        of accomplishments through his 5th year as a starter. Despite looking shaky at multiple times this year,
        they easily achieved the first-round bye and took care of business vs their rival Cincinnati to get here.<br /><br />

        The story leading up to the AFC championship was the right ankle injury Mahomes sustained the previous
        week against the Jaguars. Leading up to the big game, public concern has significantly waned and it looks
        like he should be a lot closer to fully healthy, if not 100%. While Mahomes should be good to go, his WR
        room is banged up as Hardman, JuJu, and Toney all got hurt vs the Bengals (JuJu and Toney are on track to
        play). <br /><br />

        With several rookies playing significant snaps, DC Steve Spagnuolo will need to craft another masterful game
        plan in the Super Bowl. During both the 2022 season and Spagnuolo’s playoff tenure in KC (since 2019) the
        Chiefs defense has been average at best both on the ground and through the air (they rank exactly #16 vs. the
        run and vs. the pass this season). However, the play of superstar Chris Jones and rookie George Karlaftis has
        given Chiefs fans optimism that the defensive line can wreak enough havoc to make up for the inexperienced backend.
        Their MLB, Nick Bolton, is a fast and cerebral player who I don’t think I’ve ever seen miss a tackle.<br /><br />
      </Typography>

      <Typography variant="h4">Predictions</Typography>
      <Typography variant="body1">
        The consensus line for this game seems to have settled at Philly -1.5, with a total of 51. Odds below are courtesy
        of Circa Sports as of 2/9.
      </Typography><br />

      <Typography variant="h5" className={classes.smallHeader}>Small-spread Super Bowls</Typography>
      <Typography variant="body1">
        There have been 7 Super Bowls where the spread is inside a field goal (2.5 or less). The favorites are 5-2
        straight up.
        <ul>
          <li>The Over is 2-5 in these games.</li>
          <li>The outright winner covered the spread in all 7 contests; no underdog has covered such a small
          spread without winning outright.</li>
        </ul>
        Mahomes has only played 12 games with a spread of 2.5 or less, going 6-3 ATS in the regular season and 3-0 in the
        playoffs.
        <ul>
          <li>His excellent record as an underdog is well-documented: he is 7-1-1 ATS and 6-3 SU.</li>
        </ul>

        Due to the spread only being 1.5, I prefer ditching the spread and playing <mark>Chiefs ML EV.</mark>
        <br /><br />

        I don’t see this game ending with a difference of 1; of course a late missed XP can do the job, but I think a 2 point
        conversion in OT could happen with the new rules, so if Chiefs ML scares you, look into Chiefs +3 -148 or Game to go to
        OT +830 to hedge.
      </Typography><br />

      <Typography variant="h5" className={classes.smallHeader}>High-total Super Bowls</Typography>
      <Typography variant="body1">
        In 13 Super Bowls, the total was more than 7 touchdowns (49.5-57). In these games, the over is 4-9 and the favorites are 7-6 ATS.<br /><br />

        Looking at the same set of 13 Super Bowls, we see that reverse teaser unders are 8-5 and 5-8 for selling 6 and 10 points,
        respectively. In other words, taking the under a touchdown (6) <i>lower</i> than the total has gone an astounding <b>61.5%</b> and
        betting the under 10 points lower than the total has still gone 5-8. For these reasons, I like these plays:
        <ul>
          <li><mark>Under 51 -110</mark></li>
          <li><mark>Under 45 +191</mark> (favorite play)</li>
          <li><mark>Under 41 +321</mark></li>
        </ul>
      </Typography>

      <Typography variant="h5" className={classes.smallHeader}>Longshot MVP Look</Typography>
      <Typography variant="body1">
        Travis Kelce’s 2+ TD prop has an implied probability of 17.4% (Circa) but his MVP odds sit at 15-1. Looking at the last 21
        Super Bowls (since 2000), 13 QBs, 5 WRs, and 3 defensive players have won the award. Similar to the regular season MVP, it’s
        become a QB award, however there is potential value in a non-QB taking it home. Let’s take a look at the leading receivers of
        each Super Bowl winning team (since losing players will not win the award).
      </Typography>
      <Box className={classes.chartWrapper}>
        <MVPChart
          src="sbmvp_chart.png"
          className={classes.sbmvpChart}
        />
      </Box><br />
      <Typography variant="body1">
        From a pure box score look at these games, we can see that perhaps 2 or 3 skill players had a good enough game to win the MVP,
        but lost it to the QB. 2016 James White, 2010 Jordy Nelson, and 2003 Deion Branch. In a very general view, it appears that 8+
        catches, 120+ yards, and a touchdown or 2 will give skill players a great chance to take the MVP home. This, of course, is
        assuming the QB doesn’t go nuclear (350+ yards/4+ TDs) since it is the QB’s award to lose.<br /><br />

        The 3 defensive MVPs hailed from 3 of the greatest defenses of this century: ‘02 Bucs, ‘13 Seahawks, and ‘15 Broncos. 2 of the
        3 were blowouts, and Von won Denver the game on a strip-sack with 4 minutes left in the game. It seems that the recipe for
        defensive players is a blowout or a super-human performance combined with a high-leverage moment of the game.<br /><br />

        This is why I love <mark>Travis Kelce to win SB MVP (15-1)</mark>. Circa’s prop for Kelce to have 100+ yards/1 TD has an implied
        probability of 27.8%, and should be slightly correlated with a KC win. Of course we’ll probably need more help than just 8-100-1
        (unless it’s a close, very low scoring game) but there is likely 0 to negative value on Mahomes at +130. Using the Chiefs ML implied
        odds, Mahomes will win the MVP over 90% of the time given a Chiefs win, which makes sense given his ability, but doesn’t
        provide enough value for me to play. On the other hand, Jalen Hurts’ MVP odds reflect a 75% chance of winning the award given
        an Eagles outright win. This sits above the QB SBMVP rate provided above (13/21 ~ 61.9%), and given the surplus of talent
        surrounding him, I’d avoid this too.<br /><br />
      </Typography>
    </BlogPaper>
  );
}
