# eqresults
Python module for reading and visualization eQUEST files for both tabular (.SIM) and Hourly (.hsr) results.

Sifting through eQUEST output files to find specific reports can be a daunting and time-intensive task. By querying the HSR and SIM files directly, it becomes much simpler to quickly obtain results and integrate into a Python workflow.

This module provides a Python api to achieve this goal and relies heavily on Pandas DataFrames as well as Plotly's Python api for visualization.




## setup
Note: In order to use this module, the .SIM and .hsr files must be located in the same folder and the simulation must be complete.


Download or Clone from GitHub and place in a folder labeled 'eqresults'
```
import sys
eqresults_location = 'c:/eqresults'
sys.path.append(eqresults_location)

import eqresults as ep

simfile = 'C:/simfiles/eplusout/Proposed Design - Baseline Design' # do not include extensions
mysim = eq.LoadSim(pathtosim)
```






## Output Tables
There are a few helper functions that export commonly-used reports into .csv files for integration into an Excel spreadsheet:


```
mysim.annual_summaries() # exports beps, bepu, and cost by end-use (using virtual rates for each meter). Default is to export to csv in the same location as the SIM files.
mysim.leed_enduses() # exports ps-f reports for each meter, pivoted by demand and consumption in a format that is easily translated into LEED Enduse documentation.
mysim.sim_print(['ES-D', 'BEPS', 'BEPU']) # returns a new SIM file with only the reports requested. Readable by D2SimViewer and helpful for printing output reports
```

In addition to these functions there are a number of reports (but not all) that are accessible and return DataFrames:
```
mysim.sim.beps() 
mysim.sim.lvd()
mysim.sim.psf() 
#etc. 
```

## Hourly / Timestep Reports

eqresults also parses '.hsr' (Hourly Simulation Results) files, which can be very helpful for debugging:

hsr_df = mysim.hsr.df # returns a DataFrame, with units, of all requested reports.

## Plotting Hourly Data:

eqresults includes a convenience module called 'dfplot', which provides access to Plotly Multiline, Scatter, Heatmap, Surface, and other plots. These can be used inside a Jupyter Notebook or any other interface that supports Plotly. To use this, call 'ep.dfplot.charttype()':

```
hsr_df = mysim.hsr.df

ep.dfplot.line(hsr_df)
ep.dfplot.heatmap(hsr_df, 1) # '1' is the column index for the desired series.
```

There are a number of ways to customize these Plots; calling help(ep.dfplot.heatmap), for example, will show customizable options.







