class AnalyticsService:

    @staticmethod
    def calculate(stats: dict):

        total = stats.get("totalSolved", 0)

        easy = stats.get("easySolved", 0)

        medium = stats.get("mediumSolved", 0)

        hard = stats.get("hardSolved", 0)

        acceptance = stats.get("acceptanceRate", 0)

        # -----------------------------------
        # Determine Level
        # -----------------------------------

        if total < 100:
            level = "Beginner"

        elif total < 300:
            level = "Intermediate"

        elif total < 600:
            level = "Advanced"

        elif total < 1200:
            level = "Expert"

        else:
            level = "Master"

        # -----------------------------------
        # Interview Readiness
        # -----------------------------------

        interview_ready = min(

            100,

            round(
                (
                    (total / 600) * 60
                    +
                    (acceptance / 100) * 40
                )
            )

        )

        # -----------------------------------
        # Weekly Goal
        # -----------------------------------

        if total < 100:

            weekly_goal = 15

        elif total < 300:

            weekly_goal = 12

        elif total < 600:

            weekly_goal = 10

        else:

            weekly_goal = 7

        # -----------------------------------
        # Difficulty Distribution
        # -----------------------------------

        solved = max(total, 1)

        easy_percent = round((easy / solved) * 100)

        medium_percent = round((medium / solved) * 100)

        hard_percent = round((hard / solved) * 100)

        # -----------------------------------
        # Strength Score
        # -----------------------------------

        strength = round(

            (
                acceptance * 0.5
                +
                interview_ready * 0.5
            ),

            1

        )

        # -----------------------------------
        # Return Analytics
        # -----------------------------------

        return {

            "level": level,

            "accuracy": acceptance,

            "strength": strength,

            "interviewReady": interview_ready,

            "weeklyGoal": weekly_goal,

            "difficulty": {

                "easyPercent": easy_percent,

                "mediumPercent": medium_percent,

                "hardPercent": hard_percent

            }

        }