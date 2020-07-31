## Conway's Game of Life JS

Conways’s Game Of Life is a Cellular Automation Method created by John Conway. This game was created with Biology in mind but has been applied in various fields such as Graphics, terrain generation,etc.

deployed demo: https://conway-life-game-js-git-master.ksemenza.vercel.app/

### Use on local machine

- clone fork or download repo to your local environment
- run command yarn install
- yarn start 
- Runs the app in the development mode.<br />
uses [http://localhost:3000](http://localhost:3000) address

 ### Rules:
 
1. If a cell is ON and has fewer than two neighbors that are ON, it turns OFF
2. If a cell is ON and has either two or three neighbors that are ON, it remains ON.
3. If a cell is ON and has more than three neighbors that are ON, it turns OFF.
4. If a cell is OFF and has exactly three neighbors that are ON, it turns ON.

### Approach

1. Initialize the cells in the grid.
2. At each time step in the simulation, for each 
   cell (i, j) in the grid, do the following:
   a. Update the value of cell (i, j) based on 
      its neighbors, taking into account the 
      boundary conditions.
   b. Update the display of grid values.
