RECENT_SUBMISSION_QUERY = """
query recentAc($username:String!){

  recentAcSubmissionList(username:$username){

      id
      title
      titleSlug
      timestamp

  }

}
"""