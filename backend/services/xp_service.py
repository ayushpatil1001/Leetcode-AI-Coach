class XPService:

    @staticmethod
    def calculate(stats: dict):

        easy = stats.get("easySolved", 0)
        medium = stats.get("mediumSolved", 0)
        hard = stats.get("hardSolved", 0)

        xp = (
            easy * 5 +
            medium * 15 +
            hard * 40
        )

        level = (xp // 1000) + 1

        current_level_xp = xp % 1000

        next_level_xp = 1000

        progress = round(
            (current_level_xp / next_level_xp) * 100
        )

        return {

            "xp": xp,

            "level": level,

            "currentLevelXP": current_level_xp,

            "nextLevelXP": next_level_xp,

            "progress": progress

        }