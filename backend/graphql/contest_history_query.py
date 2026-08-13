CONTEST_HISTORY_QUERY = """
query userContestRankingHistory($username:String!){

  userContestRankingHistory(username:$username){

      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest{

          title

          startTime

      }

  }

}
"""