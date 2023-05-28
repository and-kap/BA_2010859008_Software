import os
import sys
import json

def init_cypress(app, mode, iterations, size):
    config = {
        "angular": "http://localhost:4200/employees",
        "react": "http://localhost:3000/employees",
        "iterations": iterations,
        "domSize": size if mode == 'dom' else 0,
        "apiSize": size if mode == 'api' else 0,
        "app": app
    }

    json_object = json.dumps(config, indent = 4)
 
    try:
        with open("cypress.env.json", "w") as config_file:
            config_file.write(json_object)
    except IOError:
        print('Cloud not write cypress.env.json')

def init_docker():
    os.system("docker rm -f log_server")
    os.chdir('..')
    os.system("docker-compose up --build --detach log")
    os.chdir('E2EAutomation')

if len(sys.argv) != 5:
    exit()

if sys.argv[2] in ['dom', 'api']:
    e2e_test = f"cypress/e2e/company_manager_{sys.argv[2]}.cy.js"
else:
    exit()

app = sys.argv[1]
mode = sys.argv[2]
iterations = int(sys.argv[3])
size = int(sys.argv[4])

init_docker()
init_cypress(app, mode, iterations, size)

for browser in ['chrome', 'firefox']:
    os.system(f"npx cypress run --spec '{e2e_test}' -b {browser}")

root, current = os.path.split(os.getcwd())
container = os.popen("docker ps -aqf 'name=log'").read().strip()
os.system(f"docker cp {container}:/usr/src/app/log.csv {root}/resources/logs/temp_log_{app}_{mode}_{size}.csv")


