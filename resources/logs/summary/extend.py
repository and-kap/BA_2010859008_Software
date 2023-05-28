import random

filenames = [
    'log_angular_dom.csv',
    'log_angular_api.csv',
    'log_react_dom.csv',
    'log_react_api.csv'
]

for filename in filenames:
    try:
        with open(filename, "r") as input_file:
            data = input_file.readlines()
            try:
                with open(f"new_{filename}", "a+") as output_file:
                    for line in data:
                        temp = line.split(',')
                        if str(temp[4]).find('.') == -1:
                            postfix = random.randint(0, 9999999999999)
                            temp[4] = f"{temp[4].strip()}.{postfix}\n"
                            output_file.write(','.join(temp))
                        else:
                            output_file.write(line)
                            output_file.flush()
                    print(f"file: new_{filename} successfully converted")
            except IOError:
                print(f"Cloud not write new_{filename}")
    except IOError:
        print(f"Cloud not read {filename}")