PROFILE_QUERY = """
query userProfile($username: String!) {

  matchedUser(username: $username) {

    username

    profile {

      realName
      userAvatar
      ranking
      reputation
      aboutMe
      school
      websites
      countryName
      company
      jobTitle
      skillTags
      starRating

    }

    submitStats {

      acSubmissionNum {

        difficulty
        count
        submissions

      }

    }

  }

}
"""