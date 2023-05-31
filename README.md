# A Comprehensive Analysis of Student Academics Correlation with Retention and Graduation Rates
## Team 10 Members: Francis Crawford, Mufasa Naeem, Isabelle Roetcisoender, Isabel Sy

The purpose of this project is to showcase knowledge reflective of course materials including data and delivery, back end knowledge, and visualizations. This project will cover the correlation between student academics or test scores (SAT and ACT scores), student retention rates, and student graduation rates. The information for this project is sourced from the United States Department of Education's [CollegeScoreCard website](https://collegescorecard.ed.gov/data/documentation/). This website is an online tool with data on college costs, graduation, and post-college earnings. The following components are covered in this project: 

## Topic:
We wanted to look at the corelation between College Tests and Graduation Rates.

## Data Processing:
The College Score Card Website has a free API including information regarding over 6000 different Schools. We were able to call the API and retrieve data for only the information we needed. We looked at multiple different things including the following:
- Demographics
- Gender
- Income
- Academics
- Fafsa Information
- Depedency

For each one of the above groups, we called multiple calls to collect as much information as we could to graph and statistically analyze our data. Hence, we seperated the calls into groups which we then placed in Data Frames and CSVs. A major issue we had with using the Data from the API was that not all of the fields had valid values. Multiple columns contained Nan values, or were privacy surpressed. To narrow down from 6000 Schools, we chose to group by just the Schools that had SAT information in them. This also helped our Topic since we were only concentrating on College Tests and Grad Rates. 
A for loop was created to get all the information from different pages of the API. Once we had pulled the 6 sets of API Calls, we put them into 6 individual Data Frames so we could start the cleaning process. Some processing was DataSet specific, however most of the DataFrames needed the following changes:
- Changing values to Percents %
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/14e4033b-0275-43b0-bb95-88433ba110cf)
- Renaming columns with shorter/more readable names
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/796ccee7-54ea-4911-8707-2f443e1d6427)
- Restricting all Double values to 2 decimal places
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/8fa573bf-daa8-4c6c-a9df-54fad9f464ea)
- Setting the index to the School Name 
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/045bae79-2660-42b0-a393-0c1699b808f0)
- Changing all NaN values to 0
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/60b86f10-10f0-4be8-be48-bed5387ec371)
- Dropping all Schools that had a 0 for the SAT Average Overall
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/ace41250-6561-4548-8e6c-ebf5f2a53001)
- Saving the DataFrames into CSVs and JSONs for SQL & JavaScript implementations
 ![image](https://github.com/Mufasa98/Project-3/assets/123531242/c8983754-23dd-46a5-90ca-2f2a6c403fae)
 
 
- The next part of the Data Processing was plotting graphs using Matplotlib. We retrieved multiple different columns from different DataFrames that we had created to grapgh Scatter Plots to help   visualize any trends and corelations. We also displayed R Values to analyze the strength of the corelations:
![image](https://github.com/Mufasa98/Project-3/assets/123531242/9a694045-2674-488b-aba6-28cf128d4b07)
![image](https://github.com/Mufasa98/Project-3/assets/123531242/390d8c51-e0e3-4b48-b06c-f1752039276b)
![image](https://github.com/Mufasa98/Project-3/assets/123531242/0af74ffc-3d01-4e0b-9000-2088aadc6a23)





## Data Storage
After processing and cleaning the Data, we used PostGress to store the 6 individual DataFrames into SQL Schemas. We created the Tables in SQL and then imported our previously created CSVs files into the Schemas. We set constraints for all the tables to our main linked value = 'School Name'. Once the tables were made and values were imported, we ran a few queries to check if the values had pulled that was succesful.
![image](https://github.com/Mufasa98/Project-3/assets/123531242/e016a6dc-9872-47d0-9614-ba9078e54735)
![image](https://github.com/Mufasa98/Project-3/assets/123531242/84726321-1a50-45b8-88e0-0330f3343ef7)
![image](https://github.com/Mufasa98/Project-3/assets/123531242/b26d0a69-1d15-4290-bbc5-705228fceab5)

The actual queries for creating the tables and setting contraints is in the Schema.txt file


## Visualizations 
A githubpage (https://mufasa98.github.io/Project-3/) was initialized to showcase an overall summary of the study. 
Utilizing HTML, (minor) CSS, and javascript's D3 library a json consisting of the compiled dataset was parsed, creating a dynamic webpage that changes as the user selects a university from the dropdown menu. 

![image](https://github.com/Mufasa98/Project-3/blob/isy/images/js.png?raw=true)

Again, the data was cleaned to fit the study's need, not all universities are included in the dropdown. 

![image](https://github.com/Mufasa98/Project-3/blob/isy/images/demographics.png?raw=true)
![image](https://github.com/Mufasa98/Project-3/blob/isy/images/visuals.png?raw=true)

