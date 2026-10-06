def late_fee(minutes_late):
    """Return the late fee in AED for a laptop returned minutes_late minutes late."""
    days = minutes_late // 1440
    return min(2 * days, 20)
