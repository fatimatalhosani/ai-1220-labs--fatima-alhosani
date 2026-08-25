import unittest

from project_status.report import countDone


class reportTests(unittest.TestCase):
    def testCountDone(self):
        sample = [
            {"task": "Plan", "owner": "team", "status": "done"},
            {"task": "Build", "owner": "backend", "status": "in-progress"},
        ]
        self.assertEqual(countDone(sample), 1)


if __name__ == "__main__":
    unittest.main()
