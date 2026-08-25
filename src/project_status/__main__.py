from project_status.report import LoadTasks, countDone

DATAFILE = "data/tasks.csv"


def run_report():
    things = LoadTasks(DATAFILE)
    print("Project status")
    print(str(countDone(things)) + " of " + str(len(things)) + " tasks complete")
    for x in things:
        print("- " + x["task"] + " [" + x["status"] + "] (" + x["owner"] + ")")


if __name__ == "__main__":
    run_report()
