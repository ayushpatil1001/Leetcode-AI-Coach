from datetime import datetime


class StreakService:

    @staticmethod
    def calculate(last_active=None):

        today = datetime.utcnow().date()

        if last_active is None:

            return {

                "current": 0,

                "longest": 0,

                "todaySolved": False,

                "status": "Start solving today!"

            }

        delta = (

            today -

            last_active.date()

        ).days

        if delta == 0:

            current = 1

            status = "Solved Today"

        elif delta == 1:

            current = 1

            status = "Keep your streak alive!"

        else:

            current = 0

            status = "Streak Lost"

        return {

            "current": current,

            "longest": current,

            "todaySolved": delta == 0,

            "status": status

        }