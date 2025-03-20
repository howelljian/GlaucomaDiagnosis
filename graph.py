import matplotlib.pyplot as plt
import numpy as np

def convert_coordinate(coord):
    letter = coord[0].upper() 
    number = coord[1:]
    x = ord(letter) - ord('A') + 1 
    y = int(number)  
    return (x, y)

user_input = input("Please enter the coordinates (comma-separated): ")
coords = user_input.split(',')

grid_size = 20
data = np.ones((grid_size, grid_size))

for coord in coords:
    x, y = convert_coordinate(coord.strip())
    if x <= grid_size and y <= grid_size:
        data[y-1, x-1] = 0

plt.imshow(data, cmap="grey_r")
plt.show()

