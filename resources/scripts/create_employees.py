from datetime import datetime
import random

file = open("03_company_extend_dml.sql", "w")

now = datetime.now()

size = 7_000

file.write("INSERT INTO emp (id,    lastname,   job,        manager_id,   hiredate,      salary,   commission,   department_id)\n")
for i in range(size):
    id = "%d," % (i + 1)
    text = "'dummy',"
    manager_id = "%d," % (i) if i > 0 else "NULL,"
    hiredate = "'%s'," % now.strftime("%Y-%m-%d")
    salary = "'%d'," % random.randint(1_000, 5_000)
    commission = "'%d'," % random.randint(0, 1_000)
    dept = "%s" % ['10', '20', '30', 'NULL'][random.randint(0, 3)]
    str = "(%-5s %-11s %-12s %-12s %-15s %-9s %-13s %-2s)" % (id, text, text, manager_id, hiredate, salary, commission, dept)

    line = "       VALUES   %s%s\n" if i == 0 else "                %s%s\n"
        
    file.write(line % (str, ',' if i < (size - 1) else ';'))
file.close()