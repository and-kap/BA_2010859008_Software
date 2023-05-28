import os
import sys
import json

url = 'http://localhost:4200/employees'

if len(sys.argv) != 3:
    exit()

if sys.argv[1] == 'react':
    url = 'http://localhost:3000/employees'

for i in range(int(sys.argv[2])):
    os.system(f"lighthouse {url} --output json --output-path report.json --quiet --preset=desktop")

    try:
        with open('report.json', "r") as file:
            data = json.load(file)

            time = data['audits']['interactive']['numericValue']
            unit = data['audits']['interactive']['numericUnit']

            try:
                with open('tti.csv', 'a') as csv:
                    csv.write(f"{sys.argv[1]},{time},{unit}\n")
                    csv.flush()
                    print(f"{i}: {sys.argv[1]},{time},{unit}")
            except IOError:
                print('Cloud not append to file: tti.csv')
    except IOError:
        print('Cloud not open file: report.json')

content = os.listdir(os.getcwd())
for item in content:
    if item.endswith(".html") or item.endswith('.json'):
        os.remove(item)
