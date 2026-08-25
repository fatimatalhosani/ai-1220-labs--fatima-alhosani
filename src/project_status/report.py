import csv


def LoadTasks(theFile):
    rows = []
    f = open(theFile)
    reader = csv.DictReader(f)
    for row in reader:
        rows.append(row)
    return rows


def countDone(tasks=[]):
    total = 0
    for task in tasks:
        if task["status"] == "done":
            total += 1
    return total
