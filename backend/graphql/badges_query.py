BADGES_QUERY = """
query userBadges($username:String!) {

  matchedUser(username:$username){

    badges{

      id
      displayName
      icon

    }

  }

}
"""