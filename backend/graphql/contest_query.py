CONTEST_QUERY = """
query userContestRanking($username: String!) {

  userContestRanking(username:$username){

    attendedContestsCount

    rating

    globalRanking

    totalParticipants

    topPercentage

    badge{

      name
    }

  }

}
"""