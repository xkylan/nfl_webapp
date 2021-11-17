library(nflseedR)
library(DBI)
library(Rcpp)
# RSQLite also required
library(dplyr, warn.conflicts = FALSE)
library(hash)
options(digits = 5)
con <- dbConnect(RSQLite::SQLite(), "/Users/kylan/Downloads/nfl_website/data_pipeline/leverage.db")

res <- dbSendQuery(con, "SELECT * FROM fpi ORDER BY created_at DESC LIMIT 32;")
fpi <- as.data.frame(dbFetch(res))
fpi
# validate that all 32 teams are in fpi? and/or that there is just one created_at value
#dbClearResult(res)
#dbDisconnect(con)

fpiMap <- hash::hash()

fpiMapFn <- function(x) {
  fpiMap[x['team']] <- as.numeric(x['FPI'])
}

apply(fpi, 1, fpiMapFn)

fpi_sim_model <- function(teams, games, week_num, ...) {
  args <- list(...)

  calcResult <- function(homeFPI, awayFPI, n){
    homeSpread <- awayFPI - homeFPI
    # https://wizardofodds.com/games/sports-betting/nfl/
    pHomeWin <- exp(-0.14324*homeSpread)/(1+exp(-0.14324*homeSpread))
    #cat(pHomeWin, "\n")
    return(sample(c(-3,3), n, prob=c(1-pHomeWin,pHomeWin), replace=TRUE))
  }
  
  games <- games %>%
    dplyr::mutate(
      result = dplyr::case_when(
        !is.na(result) | week != week_num ~ result,
        TRUE ~ calcResult((values(fpiMap, keys=c(home_team))), (values(fpiMap, keys=c(away_team))), n())
        #TRUE ~ sample(c(-3, 3), n(), prob = c(0.9, 0.1), replace = TRUE)
      )
    )
  
  return(list(teams=teams, games=games))
}

sims <- simulate_nfl(
  nfl_season=2020,
  process_games = fpi_sim_model,
  fresh_season = TRUE,
  simulations = 10,
  test_week = 5,
  print_summary = TRUE
)

# sims$games %>%
#   filter(game_type == 'REG') %>%
#   group_by(week, home_team, away_team) %>%
#   summarise(result = mean(result)) %>%
#   arrange(result)

sims$overall %>% arrange(wins)

# pi
# 
# x <- 0
# 
# for(i in 1:100){
#   x <- x + sum(calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='CLE','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='BAL','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LAC','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='PHI','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='BUF','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='WAS','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='TEN','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='NYG','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='GB','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LV','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='DAL','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='DEN','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LV','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='LAC','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='PIT','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='CIN','FPI'], 1),
#                 calcResult(fpi[fpi['team']=='KC','FPI'], fpi[fpi['team']=='DEN','FPI'], 1))
# }
# 
# x/100
