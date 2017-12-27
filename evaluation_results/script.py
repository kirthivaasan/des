logs = open("log1.log", "r").readlines()
block_sizes = [int(logs[i].strip()) for i in range(len(logs)) if i % 2 == 0]
runtimes = [float(logs[i].strip()) for i in range(len(logs)) if i % 2 != 0]

N = 128*2
block_file = open("block_sizes", "w")
block_sizes = block_sizes[0:N]
block_file.write(str(block_sizes))

runtime_file = open("runtimes", "w")
runtimes = runtimes[0:N]
runtime_file.write(str(runtimes))
