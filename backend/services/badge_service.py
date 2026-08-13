class BadgeService:

    @staticmethod
    def calculate(stats: dict):

        total = stats.get("totalSolved", 0)

        hard = stats.get("hardSolved", 0)

        badges = []

        if total >= 50:
            badges.append("50 Problems")

        if total >= 100:
            badges.append("100 Problems")

        if total >= 200:
            badges.append("200 Problems")

        if total >= 500:
            badges.append("500 Problems")

        if total >= 1000:
            badges.append("1000 Problems")

        if hard >= 10:
            badges.append("Hard Solver")

        if hard >= 50:
            badges.append("Advanced Solver")

        if hard >= 100:
            badges.append("Elite Solver")

        if total >= 300 and hard >= 30:
            badges.append("Interview Ready")

        if total >= 800:
            badges.append("LeetCode Master")

        return badges