library(nflseedR)
library(DBI)
library(Rcpp)
# RSQLite also required
library(dplyr, warn.conflicts = FALSE)
library(hash)
options(digits = 3)
con <- dbConnect(RSQLite::SQLite(), "leverage.db")

res <- dbSendQuery(con, "SELECT * FROM fpi ORDER BY created_at DESC LIMIT 32;")
fpi <- as.data.frame(dbFetch(res))
fpi
# validate that all 32 teams are in fpi? and/or that there is just one created_at value
dbClearResult(res)
dbDisconnect(con)

fpiMap <- hash::hash()

fpiMapFn <- function(x) {
  fpiMap[x['team']] <- as.numeric(x['FPI'])
}

apply(fpi, 1, fpiMapFn)

fpiMap[['KC']]

calcResult <- function(homeFPI, awayFPI, n){
  homeSpread <- awayFPI - homeFPI
  # https://wizardofodds.com/games/sports-betting/nfl/
  pHomeWin <- exp(-0.14324*homeSpread)/(1+exp(-0.14324*homeSpread))
  cat(pHomeWin, "\n")
  return(sample(c(-3,3), n, prob=c(1-pHomeWin,pHomeWin), replace=TRUE))
}

calcResult(fpi[fpi['team']=='TB','FPI'], fpi[fpi['team']=='JAX','FPI'], 100)

mean(calcResult(fpiMap[["HOU"]],fpiMap[["KC"]],100))

fpi_sim_model <- function(teams, games, week_num, ...) {
  args <- list(...)
  # fixedHomeTeam <- ""
  # fixedAwayTeam <- ""
  # fixedWeek <- -1
  # fixedResult <- 0
  # fixGame <- FALSE
  # if ("fixedHomeTeam" %in% names(args)) {
  #   fixedHomeTeam <- args$fixedHomeTeam
  # }
  # 
  # if ("fixedAwayTeam" %in% names(args)) {
  #   fixedAwayTeam <- args$fixedAwayTeam
  # }
  # 
  # if ("fixedWeek" %in% names(args)) {
  #   fixedWeek <- args$fixedWeek
  # }
  # 
  # if ("fixedResult" %in% names(args)) {
  #   fixedResult <- args$fixedResult
  # }
  # 
  # if (fixedHomeTeam != "" & fixedAwayTeam != "" & fixedWeek != -1 & fixedResult != 0) {
  #   fixGame <- TRUE
  # }
  
  games <- games %>%
    dplyr::mutate(
      result = dplyr::case_when(
        !is.na(result) | week != week_num ~ result,
        # fixGame & week == fixedWeek & away_team == fixedAwayTeam & home_team == fixedHomeTeam ~ fixedResult,
        TRUE ~ calcResult(fpi[fpi['team']==home_team,'FPI'], fpi[fpi['team']==away_team,'FPI'], n())
      )
    )
  
  return(list(teams=teams, games=games))
}

kc <- fpi[fpi['team']=='KC','FPI']
tb <- fpi[fpi['team']=='HOU','FPI']
spread <- kc - tb
wp <- exp(-0.14324*spread)/(1+exp(-0.14324*spread))
mean(sample(c(-3,3), 1000, prob=c(1-wp,wp), replace=TRUE))

fpi
sims <- simulate_nfl(
  nfl_season=2020,
  process_games = fpi_sim_model,
  fresh_season = TRUE,
  simulations = 1000
)

sims$games %>%
  filter(game_type == 'REG') %>%
  group_by(week, home_team, away_team) %>%
  summarise(result = mean(result)) %>%
  arrange(result)

sims$overall %>% arrange(wins)

pi

x <- 0

for(i in 1:100){
  x <- x + sum(calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='CLE','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='BAL','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LAC','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='PHI','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='BUF','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='WAS','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='TEN','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='NYG','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='GB','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LV','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='DAL','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='DEN','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LV','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LAC','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='PIT','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='CIN','FPI'], 1),
                calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='DEN','FPI'], 1))
}

x/100
