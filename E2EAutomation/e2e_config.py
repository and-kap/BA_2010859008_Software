import os

apps = ['angular', 'react']
dom_sizes = [1, 10, 100, 1_000]
api_sizes = [3, 30, 300]
iterations = 500

for app in apps:
    for size in dom_sizes:
        os.system(f"python3 e2e_automation.py {app} dom {iterations} {size}")
    
    for size in api_sizes:
        os.system(f"python3 e2e_automation.py {app} api {iterations} {size}")

