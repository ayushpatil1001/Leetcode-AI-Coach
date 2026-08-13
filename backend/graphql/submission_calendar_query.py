SUBMISSION_CALENDAR_QUERY = """
query userProfileCalendar($username:String!){

  matchedUser(username:$username){

      userCalendar{

          activeYears

          streak

          totalActiveDays

          submissionCalendar

      }

  }

}
"""