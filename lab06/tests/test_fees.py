import unittest

from fees import late_fee


class LateFeeTests(unittest.TestCase):
    def test_on_time_return_is_free(self):
        self.assertEqual(late_fee(0), 0)

    def test_one_minute_late_costs_two_dirhams(self):
        self.assertEqual(late_fee(1), 2)

    def test_one_day_late_costs_two_dirhams(self):
        self.assertEqual(late_fee(1440), 2)

    def test_more_than_one_day_late_costs_four_dirhams(self):
        self.assertEqual(late_fee(1441), 4)

    def test_thirty_days_late_is_capped_at_twenty_dirhams(self):
        self.assertEqual(late_fee(43200), 20)


if __name__ == "__main__":
    unittest.main()
